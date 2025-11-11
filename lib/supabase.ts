import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Missing Supabase environment variables! Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
  console.warn("📖 See SUPABASE_SETUP.md for setup instructions");
}

// Validate URL format
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  console.error("❌ Invalid NEXT_PUBLIC_SUPABASE_URL format. Must start with http:// or https://");
}

// Create client with session persistence disabled for incognito-like behavior
// This prevents caching issues while maintaining auth functionality
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: true, // Keep sessions but only in sessionStorage (clears on browser close)
      storage: typeof window !== 'undefined' ? window.sessionStorage : undefined, // Use sessionStorage instead of localStorage
      storageKey: 'closednote-auth',
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    global: {
      headers: {
        'x-client-info': 'closednote@0.1.0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    },
    db: {
      schema: 'public',
    },
  }
);
