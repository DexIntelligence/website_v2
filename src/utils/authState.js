// Auth State Management - Client-side utilities for state exchange
import { supabase } from './auth';
import crypto from 'crypto';

/**
 * Create an authentication state directly from the client
 * This uses Supabase directly instead of going through Netlify functions
 */
export async function createAuthState(useSecureToken = false) {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Generate JWT token for Market Mapper
    // Use secure token generation if specified, otherwise use simple client-side token
    const token = useSecureToken 
      ? await generateSecureToken(user)
      : generateMarketMapperToken(user);

    // Store state in Supabase (exactly as app team expects)
    const { data, error } = await supabase
      .from('auth_states')
      .insert({
        user_id: user.id,
        token: token
      })
      .select('state_id')
      .single();

    if (error) {
      console.error('Failed to create auth state:', error);
      throw new Error('Failed to create authentication state');
    }

    return {
      stateId: data.state_id,
      expiresIn: 300 // 5 minutes
    };
  } catch (error) {
    console.error('Error creating auth state:', error);
    throw error;
  }
}

/**
 * Exchange state for token using Supabase RPC function
 * This can be called from the Market Mapper app
 */
export async function exchangeAuthState(stateId) {
  try {
    // Use the RPC function for atomic exchange
    const { data, error } = await supabase
      .rpc('exchange_auth_state', {
        state_id_param: stateId
      });

    if (error) {
      console.error('Failed to exchange state:', error);
      throw new Error('Invalid or expired state');
    }

    if (!data || data.length === 0) {
      throw new Error('State not found or already used');
    }

    return {
      token: data[0].token,
      userId: data[0].user_id
    };
  } catch (error) {
    console.error('Error exchanging state:', error);
    throw error;
  }
}

/**
 * Generate a JWT token for Market Mapper
 * Simple client-side generation for direct Supabase approach
 */
function generateMarketMapperToken(user) {
  // Create a simple token payload
  // Note: In production, you might want to use a more secure method
  const payload = {
    sub: user.id,
    email: user.email,
    iat: Date.now(),
    exp: Date.now() + 3600000, // 1 hour expiry
    iss: 'dexintelligence.ai',
    aud: 'app.dexintelligence.ai',
    purpose: 'market-mapper-access'
  };
  
  // For client-side, we'll create a simple base64 encoded token
  // The Market Mapper app will validate this against the user session
  const token = btoa(JSON.stringify(payload));
  
  return token;
}

/**
 * Alternative: Use Netlify function for secure token generation
 */
async function generateSecureToken(user) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error('No active session');
  }

  const response = await fetch('/.netlify/functions/generate-market-mapper-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.data.session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to generate token');
  }

  const { token } = await response.json();
  return token;
}

/**
 * Clean up expired states (can be called periodically)
 */
export async function cleanupExpiredStates() {
  try {
    const { error } = await supabase.rpc('cleanup_expired_auth_states');
    
    if (error) {
      console.error('Failed to cleanup expired states:', error);
    }
  } catch (error) {
    console.error('Error cleaning up states:', error);
  }
}

/**
 * Store state in multiple places for redundancy
 */
export function storeStateLocally(stateId, expiresIn = 300) {
  // Store in localStorage
  localStorage.setItem('market_mapper_state', stateId);
  
  // Store expiration time
  localStorage.setItem('market_mapper_state_expires', Date.now() + (expiresIn * 1000));
  
  // Also set as cookie for same-domain access
  document.cookie = `market_mapper_state=${stateId}; max-age=${expiresIn}; domain=.dexintelligence.ai; secure; samesite=lax; path=/`;
}

/**
 * Retrieve state from local storage
 */
export function getStoredState() {
  // Check localStorage first
  const stateId = localStorage.getItem('market_mapper_state');
  const expires = localStorage.getItem('market_mapper_state_expires');
  
  if (stateId && expires) {
    // Check if expired
    if (Date.now() < parseInt(expires)) {
      return stateId;
    } else {
      // Clean up expired state
      localStorage.removeItem('market_mapper_state');
      localStorage.removeItem('market_mapper_state_expires');
    }
  }
  
  // Fall back to cookie
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'market_mapper_state') {
      return value;
    }
  }
  
  return null;
}

/**
 * Clear stored state (after successful exchange)
 */
export function clearStoredState() {
  localStorage.removeItem('market_mapper_state');
  localStorage.removeItem('market_mapper_state_expires');
  
  // Clear cookie
  document.cookie = 'market_mapper_state=; max-age=0; domain=.dexintelligence.ai; path=/';
}

/**
 * Complete launch flow for Market Mapper
 */
export async function launchMarketMapperWithState() {
  try {
    // Create auth state
    const { stateId, expiresIn } = await createAuthState();
    
    // Store locally for app to retrieve
    storeStateLocally(stateId, expiresIn);
    
    // Get app domain from environment or use default
    const appDomain = import.meta.env.VITE_APP_DOMAIN || 'app.dexintelligence.ai';
    
    // Redirect to Market Mapper
    window.location.href = `https://${appDomain}`;
    
  } catch (error) {
    console.error('Failed to launch Market Mapper:', error);
    throw error;
  }
}

// Export all functions
export default {
  createAuthState,
  exchangeAuthState,
  cleanupExpiredStates,
  storeStateLocally,
  getStoredState,
  clearStoredState,
  launchMarketMapperWithState
};