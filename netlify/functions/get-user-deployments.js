const { createClient } = require('@supabase/supabase-js');

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 30; // Allow frequent fetching for dashboard updates

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

// Clean up old rate limit records periodically
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, requests] of rateLimit.entries()) {
    const recentRequests = requests.filter(t => now - t < WINDOW_MS);
    if (recentRequests.length === 0) {
      rateLimit.delete(ip);
    } else {
      rateLimit.set(ip, recentRequests);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimits, 300000);

// Verify Supabase session token
async function verifySupabaseToken(token) {
  if (!token || !token.startsWith('eyJ')) {
    return null;
  }
  
  try {
    // Decode JWT payload (without verification for now)
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }
    
    return {
      userId: payload.sub,
      email: payload.email,
    };
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' 
    : 'https://dexintelligence.ai',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  if (event.httpMethod !== 'GET') {
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
    // Verify authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization || '';
    
    if (!authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization required' }),
      };
    }
    
    const supabaseToken = authHeader.substring(7);
    
    // Verify Supabase session
    const user = await verifySupabaseToken(supabaseToken);
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired session' }),
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch deployments the user has access to (email-based)
    // Note: env_config is excluded from user-facing API for security
    const { data: deployments, error } = await supabase
      .from('deployments')
      .select(`
        id,
        name,
        description,
        cloud_run_url,
        gcs_bucket,
        project_id,
        region,
        created_at,
        authorized_emails
      `)
      .eq('is_active', true)
      .contains('authorized_emails', [user.email])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database query error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch deployments' }),
      };
    }

    // Transform data for frontend consumption
    const userDeployments = deployments.map(deployment => ({
      id: deployment.id,
      name: deployment.name,
      description: deployment.description,
      cloudRunUrl: deployment.cloud_run_url,
      gcsBucket: deployment.gcs_bucket,
      projectId: deployment.project_id,
      region: deployment.region,
      authorizedEmails: deployment.authorized_emails,
    }));

    // Log successful fetch for audit
    console.log(`Deployments fetched for user ${user.userId} (${user.email}): ${userDeployments.length} deployments`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        deployments: userDeployments,
        count: userDeployments.length,
        user: {
          id: user.userId,
          email: user.email
        }
      }),
    };

  } catch (error) {
    console.error('Get user deployments error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch user deployments' }),
    };
  }
};