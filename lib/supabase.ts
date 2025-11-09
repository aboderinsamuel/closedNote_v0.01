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

// Create client with better error handling and timeout settings
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      storageKey: 'closednote-auth',
    },
    global: {
      headers: {
        'x-client-info': 'closednote@0.1.0',
      },
    },
    db: {
      schema: 'public',
    },
  }
);
