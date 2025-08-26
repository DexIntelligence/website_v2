import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url' 
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
    
    const payload = {
      userId: user.id,
      email: user.email,
      exp: Date.now() + 3600000, // 1 hour expiry
      iat: Date.now(),
    };
    
    // In production, this would use a server-side function with proper HMAC signing
    // For now, we'll call a Netlify function to generate the token
    const response = await fetch('/.netlify/functions/generate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate app token');
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