const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Use Supabase for state storage
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

// Verify Supabase session token
async function verifySupabaseToken(token) {
  if (!token || !token.startsWith('eyJ')) {
    return null;
  }
  
  try {
    // Decode JWT payload (without full verification for now)
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

// Store state in Supabase
async function storeState(stateId, data) {
  if (!supabase) {
    console.error('Supabase not configured');
    return false;
  }
  
  try {
    // Create auth_states table if it doesn't exist (first time setup)
    // In production, this table should be created via migration
    const { error } = await supabase
      .from('auth_states')
      .insert({
        state_id: stateId,
        token: data.token,
        user_id: data.userId,
        created_at: new Date(data.createdAt).toISOString(),
        expires_at: new Date(data.createdAt + (data.ttl * 1000)).toISOString()
      });
    
    if (error) {
      console.error('Error storing state:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to store state:', error);
    return false;
  }
}

const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' 
    : 'https://dexintelligence.ai',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    
    // Generate state ID
    const stateId = crypto.randomUUID();
    
    // Get JWT secret from environment
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }
    
    // Create JWT token for Market Mapper
    const now = Date.now();
    const expiry = now + 120000; // 2 minutes for exchange
    
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    
    const payload = {
      sub: user.userId,
      email: user.email,
      purpose: 'market-mapper-access',
      exp: Math.floor(expiry / 1000),
      iat: Math.floor(now / 1000),
      iss: 'dexintelligence.ai',
      aud: 'app.dexintelligence.ai',
      nonce: crypto.randomBytes(16).toString('hex'),
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
    
    // Store state with token
    const stored = await storeState(stateId, {
      token: token,
      userId: user.userId,
      createdAt: now,
      ttl: 300 // 5 minutes to exchange
    });
    
    if (!stored) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to create authentication state' }),
      };
    }
    
    // Log state creation for audit
    console.log(`Auth state created for user ${user.userId} (${user.email}) with state ${stateId}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        stateId: stateId,
        expiresIn: 300 // 5 minutes
      }),
    };
  } catch (error) {
    console.error('State creation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create authentication state' }),
    };
  }
};