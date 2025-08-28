const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recentRequests = userRequests.filter(t => now - t < WINDOW_MS);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false; // Rate limited
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true; // Allowed
}

// Retrieve and delete state (one-time use)
async function getAndDeleteState(stateId) {
  if (!supabase) {
    console.error('Supabase not configured');
    return null;
  }
  
  try {
    // First, retrieve the state
    const { data: states, error: fetchError } = await supabase
      .from('auth_states')
      .select('*')
      .eq('state_id', stateId)
      .single();
    
    if (fetchError || !states) {
      console.error('State not found:', fetchError);
      return null;
    }
    
    // Check if expired
    const expiresAt = new Date(states.expires_at).getTime();
    if (Date.now() > expiresAt) {
      // Delete expired state
      await supabase
        .from('auth_states')
        .delete()
        .eq('state_id', stateId);
      
      console.log('State expired:', stateId);
      return null;
    }
    
    // Delete the state (one-time use)
    const { error: deleteError } = await supabase
      .from('auth_states')
      .delete()
      .eq('state_id', stateId);
    
    if (deleteError) {
      console.error('Failed to delete state:', deleteError);
      // Continue anyway - state was found
    }
    
    return {
      token: states.token,
      userId: states.user_id,
      createdAt: new Date(states.created_at).getTime()
    };
  } catch (error) {
    console.error('Failed to retrieve state:', error);
    return null;
  }
}

// Clean up expired states periodically
async function cleanupExpiredStates() {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('auth_states')
      .delete()
      .lt('expires_at', new Date().toISOString());
    
    if (error) {
      console.error('Failed to clean up expired states:', error);
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredStates, 300000);

const headers = {
  'Access-Control-Allow-Origin': 'https://app.dexintelligence.ai',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json',
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
  
  // Get client IP for rate limiting
  const clientIP = event.headers['x-forwarded-for'] || 
                   event.headers['X-Forwarded-For'] || 
                   event.headers['x-real-ip'] ||
                   'unknown';
  
  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ 
        error: 'Too many requests. Please try again later.' 
      }),
    };
  }

  try {
    // Parse request body
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body' }),
      };
    }
    
    const { stateId } = body;
    
    if (!stateId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'State ID required' }),
      };
    }
    
    // Validate state ID format (should be a UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(stateId)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid state ID format' }),
      };
    }
    
    // Retrieve and delete state (one-time use)
    const stored = await getAndDeleteState(stateId);
    
    if (!stored) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired state' }),
      };
    }
    
    // Check if state is too old (additional safety check)
    const age = Date.now() - stored.createdAt;
    if (age > 300000) { // 5 minutes
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'State expired' }),
      };
    }
    
    // Log successful exchange for audit
    console.log(`State ${stateId} exchanged for user ${stored.userId}`);
    
    // Return the token
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        token: stored.token
      }),
    };
  } catch (error) {
    console.error('State exchange error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to exchange state' }),
    };
  }
};