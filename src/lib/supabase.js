// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Use environment variables with Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ffbjvrwkvnwocuyapajo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ufEz20LhJXOkvNUBfWT-GQ_ZK-e75fo';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables are missing. Using fallback values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Log connection status (remove in production)
console.log('🔗 Supabase connected to:', supabaseUrl);