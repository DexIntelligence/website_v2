import { createClient } from '@supabase/supabase-js';

// NOTE: Environment variables are currently loaded from .env.production file
// due to Netlify not properly injecting VITE_* variables during build.
// See CLAUDE.md for details on this issue and how to fix it properly.
// TODO: Remove .env.production workaround once Netlify env vars are working
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const authService = {
  async login(email, password) {
    if (!supabase) {
      throw new Error('Authentication service not configured');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async logout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    if (!supabase) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async getUser() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback) {
    if (!supabase) return () => {};
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription?.unsubscribe();
  },

  async generateAppToken(user) {
    if (!user) throw new Error('User required to generate token');
    
    // Get current Supabase session for authentication
    const session = await this.getSession();
    if (!session) {
      throw new Error('No active session');
    }
    
    // Call the new Market Mapper specific token endpoint
    const response = await fetch('/.netlify/functions/generate-market-mapper-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to generate Market Mapper token');
    }
    
    const { token } = await response.json();
    return token;
  },

  buildAppUrl(token) {
    const appDomain = import.meta.env.VITE_APP_DOMAIN || 'app.dexintelligence.ai';
    return `https://${appDomain}?token=${encodeURIComponent(token)}`;
  },
};

export default authService;