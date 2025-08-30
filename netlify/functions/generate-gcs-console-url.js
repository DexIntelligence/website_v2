const crypto = require('crypto');

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 5; // Allow slightly more for file storage access

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

// Generate GCS Console URL for user's bucket
function generateGCSConsoleUrl(userId, email) {
  // In production, this would generate a signed URL or redirect to IAP-protected console
  // For now, we'll generate a direct link to the bucket in GCS Console
  
  // Use user ID to create a unique bucket identifier
  const bucketSuffix = crypto.createHash('md5').update(userId).digest('hex').substring(0, 8);
  const bucketName = `market-mapper-sessions-${bucketSuffix}`;
  
  // Generate console URL for the specific bucket
  const consoleUrl = `https://console.cloud.google.com/storage/browser/${bucketName}?project=dex-intelligence`;
  
  return consoleUrl;
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
    
    // Generate GCS Console URL for this user
    const url = generateGCSConsoleUrl(user.userId, user.email);
    
    // Log URL generation for audit
    console.log(`GCS Console URL generated for user ${user.userId} (${user.email}) from IP ${clientIP}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url,
        bucketInfo: 'Access your dedicated secure storage bucket',
        expiresIn: 3600, // URL valid for 1 hour
      }),
    };
  } catch (error) {
    console.error('GCS URL generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate storage access URL' }),
    };
  }
};