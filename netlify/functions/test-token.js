// Simple test function to verify token generation works
const crypto = require('crypto');

exports.handler = async (event, context) => {
  try {
    // Test basic JWT creation without database dependencies
    const secret = 'test-secret';
    const now = Date.now();
    const expiry = now + 120000; // 2 minutes
    
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { 
      sub: 'test-user',
      email: 'test@example.com',
      iat: Math.floor(now / 1000),
      exp: Math.floor(expiry / 1000)
    };
    
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signatureBase = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(signatureBase)
      .digest('base64url');
    
    const token = `${signatureBase}.${signature}`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: true,
        token: token.substring(0, 20) + '...', // Preview only
        message: 'Basic token generation works'
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: false,
        error: error.message,
        stack: error.stack
      }),
    };
  }
};