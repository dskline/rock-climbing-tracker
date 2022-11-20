import { createClient } from '@supabase/supabase-js'

export default function initSupabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_PUBLIC_KEY) {
    throw new Error('Missing the .env.local file?');
  }

  // Create a single supabase client for interacting with your database
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_PUBLIC_KEY
  );
}
