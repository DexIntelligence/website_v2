const { createClient } = require('@supabase/supabase-js');
const { verifySupabaseJWT, extractToken } = require('./utils/verify-jwt');

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

// Verify Supabase session token using proper JWT verification
async function verifySupabaseToken(token) {
  const decoded = await verifySupabaseJWT(token);
  if (!decoded) return null;

  return {
    userId: decoded.sub,
    email: decoded.email,
  };
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
  console.log('get-user-deployments: Function invoked');

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
    console.log('get-user-deployments: Extracting token');

    // Extract and verify token
    const supabaseToken = extractToken(event.headers);

    if (!supabaseToken) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization required' }),
      };
    }
    
    console.log('get-user-deployments: Verifying token');

    // Verify Supabase session
    const user = await verifySupabaseToken(supabaseToken);

    console.log('get-user-deployments: User verified:', user?.email);
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired session' }),
      };
    }

    console.log('get-user-deployments: Initializing deployments database');

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    console.log('get-user-deployments: DB URL exists:', !!supabaseUrl);
    console.log('get-user-deployments: DB Key exists:', !!supabaseServiceKey);
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('get-user-deployments: Querying deployments for user:', user.email);

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
      console.error('get-user-deployments: Database query error:', error);
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
    console.error('get-user-deployments: Caught error:', error.message);
    console.error('get-user-deployments: Stack trace:', error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch user deployments' }),
    };
  }
};