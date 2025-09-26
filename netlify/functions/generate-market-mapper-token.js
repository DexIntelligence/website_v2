import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

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

export const handler = async (event, context) => {
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
      .select('env_config, name')
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
    const jwtSecret = deployment.env_config?.JWT_SECRET;
    
    if (!jwtSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'JWT secret not configured for deployment' }),
      };
    }
    
    // Create short-lived token for Market Mapper (2 minutes)
    const now = Date.now();
    const expiry = now + 120000; // 2 minutes
    
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      sub: user.userId,
      email: user.email,
      iat: Math.floor(now / 1000),
      exp: Math.floor(expiry / 1000),
      deployment: deployment.name,
      nonce: crypto.randomUUID()
    };
    
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signatureBase = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac('sha256', jwtSecret)
      .update(signatureBase)
      .digest('base64url');
    
    const token = `${signatureBase}.${signature}`;
    
    console.log(`Market Mapper token generated for user ${user.userId} (${user.email}) from IP ${clientIP}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        token,
        expiresIn: 120,
        expiresAt: expiry,
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