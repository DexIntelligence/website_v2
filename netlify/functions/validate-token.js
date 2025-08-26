const crypto = require('crypto');

const headers = {
  'Access-Control-Allow-Origin': '*', // Allow from any origin for the Cloud Run app
  'Access-Control-Allow-Headers': 'Content-Type',
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
    const secret = process.env.JWT_SECRET;
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

    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
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

    // Log validation for monitoring (optional)
    console.log(`Token validated for user ${payload.userId} from IP ${ip}`);

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