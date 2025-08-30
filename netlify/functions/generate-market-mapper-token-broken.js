const crypto = require('crypto');
const { getDeploymentConfigByUser, getEnvVar } = require('./utils/deployment-config');

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 3; // Very strict limit for Market Mapper tokens

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
    
    // Get deployment-specific JWT secret
    let secret;
    let targetDeployment = null;
    
    if (deploymentId) {
      const { getDeploymentConfig } = require('./utils/deployment-config');
      const deploymentConfig = await getDeploymentConfig(deploymentId);
      secret = getEnvVar(deploymentConfig.envConfig, 'JWT_SECRET');
      targetDeployment = deploymentConfig;
    } else {
      // Fallback: Get user's first deployment configuration
      const userDeployments = await getDeploymentConfigByUser(user.email);
      if (userDeployments.length === 0) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'No deployments found for user' }),
        };
      }
      
      const firstDeployment = userDeployments[0];
      secret = getEnvVar(firstDeployment.envConfig, 'JWT_SECRET');
      targetDeployment = firstDeployment;
    }
    
    if (!secret) {
      console.error('JWT_SECRET not configured for deployment');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'JWT secret not configured for deployment' }),
      };
    }
    
    // Create short-lived token for Market Mapper (2 minutes)
    const now = Date.now();
    const expiry = now + 120000; // 2 minutes
    
    // Create JWT payload with nonce for replay protection
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    
    const payload = {
      sub: user.userId,
      email: user.email,
      purpose: 'market-mapper-access',
      exp: Math.floor(expiry / 1000), // Convert to seconds
      iat: Math.floor(now / 1000),
      iss: 'dexintelligence.ai',
      aud: 'app.dexintelligence.ai',
      nonce: crypto.randomBytes(16).toString('hex'), // Prevent replay attacks
      jti: crypto.randomBytes(16).toString('hex'), // Unique token ID
    };
    
    // Encode header and payload
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    // Create signature
    const signatureBase = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(signatureBase)
      .digest('base64url');
    
    // Combine to create JWT
    const token = `${signatureBase}.${signature}`;
    
    // Log token generation for audit
    console.log(`Market Mapper token generated for user ${user.userId} (${user.email}) from IP ${clientIP}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        token,
        expiresIn: 120, // seconds (2 minutes)
        expiresAt: expiry, // timestamp
      }),
    };
  } catch (error) {
    console.error('Token generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate token' }),
    };
  }
};