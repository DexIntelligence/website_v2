const crypto = require('crypto');

// Allowed origins for CORS
const allowedOrigins = [
  'https://app.dexintelligence.ai',
  'https://market-mapper-xuixlullgq-uc.a.run.app',
  'https://dexintelligence.ai',
  process.env.NODE_ENV === 'development' ? 'http://localhost:8501' : null,
  process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : null
].filter(Boolean);

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 10;

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

exports.handler = async (event, context) => {
  // Get origin from request headers
  const origin = event.headers.origin || event.headers.Origin || '';
  
  // Check if origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin);
  
  // Build response headers
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
  
  // Only set CORS origin if it's allowed
  if (isAllowedOrigin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    if (!isAllowedOrigin) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Origin not allowed' }),
      };
    }
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
  
  // Check origin for non-OPTIONS requests
  if (!isAllowedOrigin) {
    return {
      statusCode: 403,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        valid: false,
        error: 'Origin not allowed' 
      }),
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
        valid: false,
        error: 'Too many requests. Please try again later.' 
      }),
    };
  }

  try {
    const { token, ip } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          error: 'Token required' 
        }),
      };
    }

    // Get secret from environment
    // Fallback due to Netlify env var issues
    const secret = process.env.JWT_SECRET || '967711c2583c4e01b0b662921bfdbcb57d192444fbcae8a92ae296c6d8c9d10a';
    if (!secret) {
      console.error('JWT_SECRET not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          error: 'Server configuration error' 
        }),
      };
    }

    // Parse JWT
    const parts = token.split('.');
    if (parts.length !== 3) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          error: 'Invalid token format' 
        }),
      };
    }

    const [encodedHeader, encodedPayload, signature] = parts;

    // Verify signature
    const signatureBase = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signatureBase)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          error: 'Invalid signature' 
        }),
      };
    }

    // Decode payload
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());

    // Check expiration (exp is in seconds, Date.now() is in milliseconds)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          error: 'Token expired' 
        }),
      };
    }

    // Verify issuer and audience
    if (payload.iss !== 'dexintelligence.ai' || payload.aud !== 'app.dexintelligence.ai') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          valid: false, 
          error: 'Invalid token claims' 
        }),
      };
    }

    // Log validation for monitoring (include actual IP from headers)
    console.log(`Token validated for user ${payload.userId} from IP ${ip || clientIP}`);

    // Return validation result
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        valid: true,
        userId: payload.userId,
        email: payload.email,
        expires: payload.exp,
      }),
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        valid: false, 
        error: 'Token validation failed' 
      }),
    };
  }
};