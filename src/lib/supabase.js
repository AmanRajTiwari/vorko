import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// Using environment variables that start with VITE_ (Vite convention)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation: Ensure environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined.",
  );
}

// Create and export Supabase client (singleton pattern)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Utility function to check the current authentication session
 * @returns {Promise<Object>} Current session data or null
 */
export const checkAuthSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
};

export default supabase;
