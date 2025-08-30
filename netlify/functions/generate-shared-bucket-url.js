const crypto = require('crypto');
const { Storage } = require('@google-cloud/storage');
const { getDeploymentConfigByUser, getEnvVar } = require('./utils/deployment-config');

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
  // In production, you would verify this token with Supabase
  // For now, we'll do basic validation
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

// Generate signed URL for shared bucket access
async function generateSignedBucketUrl(userId, email, deploymentId = null) {
  try {
    let serviceAccountKey, projectId, bucketName;
    
    if (deploymentId) {
      // Get deployment-specific configuration
      const { getDeploymentConfig } = require('./utils/deployment-config');
      const deploymentConfig = await getDeploymentConfig(deploymentId);
      serviceAccountKey = getEnvVar(deploymentConfig.envConfig, 'GCS_SERVICE_ACCOUNT_KEY');
      projectId = deploymentConfig.projectId;
      bucketName = getEnvVar(deploymentConfig.envConfig, 'SHARED_FILES_BUCKET') || deploymentConfig.gcsBucket;
    } else {
      // Fallback: Get user's first deployment configuration
      const userDeployments = await getDeploymentConfigByUser(email);
      if (userDeployments.length === 0) {
        throw new Error('No deployments found for user');
      }
      
      const firstDeployment = userDeployments[0];
      serviceAccountKey = getEnvVar(firstDeployment.envConfig, 'GCS_SERVICE_ACCOUNT_KEY');
      projectId = firstDeployment.projectId;
      bucketName = getEnvVar(firstDeployment.envConfig, 'SHARED_FILES_BUCKET') || firstDeployment.gcsBucket;
    }
    
    if (!serviceAccountKey) {
      throw new Error('GCS service account key not configured');
    }
    
    // Parse service account key
    const credentials = JSON.parse(serviceAccountKey);
    
    // Create storage client with service account
    const storage = new Storage({
      projectId: projectId,
      credentials: credentials,
    });
    
    const bucket = storage.bucket(bucketName);
    
    // Generate signed URL for bucket browsing (1 hour expiration)
    const [url] = await bucket.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000, // 1 hour from now
      extensionHeaders: {
        'x-goog-content-type': 'application/octet-stream'
      }
    });
    
    // For bucket browsing, we need to redirect to GCS Console with auth
    const consoleUrl = `https://console.cloud.google.com/storage/browser/${bucketName}?project=${projectId}`;
    
    return {
      signedUrl: url,
      consoleUrl: consoleUrl,
      bucketName: bucketName
    };
    
  } catch (error) {
    console.error('Error generating signed URL:', error);
    // Fallback to console URL if signed URL generation fails
    const bucketName = process.env.GCS_SHARED_BUCKET_NAME || 'market-mapper-v1-1-shared';
    const projectId = process.env.GCS_PROJECT_ID || 'market-mapper-v1-1';
    const consoleUrl = `https://console.cloud.google.com/storage/browser/${bucketName}?project=${projectId}`;
    
    return {
      consoleUrl: consoleUrl,
      bucketName: bucketName,
      fallback: true
    };
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
    
    // Get deployment ID from request body if provided
    const requestBody = event.body ? JSON.parse(event.body) : {};
    const deploymentId = requestBody.deploymentId || null;
    
    // Generate signed URL for shared bucket access
    const urlData = await generateSignedBucketUrl(user.userId, user.email, deploymentId);
    
    // Log URL generation for audit
    console.log(`Shared bucket URL generated for user ${user.userId} (${user.email}) from IP ${clientIP}${urlData.fallback ? ' (fallback)' : ''}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: urlData.consoleUrl, // Use console URL for now as it's more reliable for UI access
        signedUrl: urlData.signedUrl, // Include signed URL for future use
        bucketName: urlData.bucketName,
        bucketInfo: 'Team collaboration shared bucket with organized folders',
        accessType: 'shared-data',
        folders: ['general/', 'antitrust-team/', 'consulting-team/'],
        expiresIn: 3600, // URL valid for 1 hour
        hasSigned: !urlData.fallback,
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