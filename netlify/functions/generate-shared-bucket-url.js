const { createClient } = require('@supabase/supabase-js');

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 10; // Allow more for bucket access operations

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

// Verify Supabase session token
async function verifySupabaseToken(token) {
  if (!token || !token.startsWith('eyJ')) {
    return null;
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
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
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
  
  const clientIP = event.headers['x-forwarded-for'] || 'unknown';
  
  if (!checkRateLimit(clientIP)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    };
  }

  try {
    const authHeader = event.headers.authorization || event.headers.Authorization || '';
    
    if (!authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization required' }),
      };
    }
    
    const supabaseToken = authHeader.substring(7);
    const user = await verifySupabaseToken(supabaseToken);
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired session' }),
      };
    }
    
    // Get deployment ID from request body
    const requestBody = event.body ? JSON.parse(event.body) : {};
    const deploymentId = requestBody.deploymentId || null;
    
    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get deployment configuration directly from database
    let deploymentQuery = supabase
      .from('deployments')
      .select('env_config, name, cloud_run_url')
      .eq('is_active', true)
      .contains('authorized_emails', [user.email]);
    
    if (deploymentId) {
      deploymentQuery = deploymentQuery.eq('id', deploymentId);
    }
    
    const { data: deployments, error } = await deploymentQuery.limit(1);
    
    if (error || !deployments || deployments.length === 0) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'No authorized deployments found for user' }),
      };
    }
    
    const deployment = deployments[0];
    const envConfig = deployment.env_config || {};
    
    // Extract GCS configuration from deployment
    const sharedBucket = envConfig.SHARED_FILES_BUCKET;
    const iapAudience = envConfig.IAP_AUDIENCE;
    const serviceAccountKey = envConfig.GCS_SERVICE_ACCOUNT_KEY;
    
    if (!sharedBucket || !serviceAccountKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'GCS configuration not found for deployment' }),
      };
    }
    
    // Extract project ID from service account key
    let projectId;
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      projectId = serviceAccount.project_id;
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Invalid GCS service account configuration' }),
      };
    }
    
    if (!projectId) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Project ID not found in service account' }),
      };
    }
    
    // Generate GCS Console URL with IAP authentication
    let consoleUrl;
    if (iapAudience) {
      // Use IAP-protected URL for enhanced security
      consoleUrl = `https://console.cloud.google.com/storage/browser/${sharedBucket}?project=${projectId}&authuser=${encodeURIComponent(user.email)}`;
    } else {
      // Standard GCS Console URL
      consoleUrl = `https://console.cloud.google.com/storage/browser/${sharedBucket}?project=${projectId}`;
    }
    
    console.log(`Shared bucket URL generated for user ${user.userId} (${user.email}) from IP ${clientIP}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: consoleUrl,
        bucketName: sharedBucket,
        projectId: projectId,
        deployment: deployment.name,
        bucketInfo: 'Team collaboration shared bucket with organized folders',
        accessType: 'shared-data',
        expiresIn: 3600, // Console session valid for 1 hour typically
      }),
    };
  } catch (error) {
    console.error('Shared bucket URL generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate shared bucket access URL' }),
    };
  }
};