import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

/**
 * Verify a Supabase JWT token using the JWT secret
 * @param {string} token - The JWT token to verify
 * @returns {Promise<object|null>} - Returns the decoded token payload or null if invalid
 */
async function verifySupabaseJWT(token) {
  if (!token || !token.startsWith('eyJ')) {
    return null;
  }

  const jwtSecret = process.env.SUPABASE_JWT_SECRET;
  if (!jwtSecret) {
    console.error('SUPABASE_JWT_SECRET not configured');
    return null;
  }

  try {
    // Verify the token with the secret
    const decoded = jwt.verify(token, jwtSecret);

    // Check if token is expired
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.log('Token expired');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
}

/**
 * Verify a Supabase session using the service role key
 * This provides an additional layer of verification
 * @param {string} token - The access token to verify
 * @returns {Promise<object|null>} - Returns the user object or null if invalid
 */
async function verifySupabaseSession(token) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase configuration missing');
    return null;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from the token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Failed to verify session:', error?.message);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Session verification error:', error.message);
    return null;
  }
}

/**
 * Extract token from Authorization header
 * @param {object} headers - Request headers
 * @returns {string|null} - Returns the token or null
 */
function extractToken(headers) {
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1];
}

export {
  verifySupabaseJWT,
  verifySupabaseSession,
  extractToken
};