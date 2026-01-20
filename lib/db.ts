// lib/db.ts
import dotenv from "dotenv";
import path from "path";

// Load .env.local if running in Node.js (not in Next.js)
if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(process.cwd(), ".env.local") });
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️  Supabase credentials not found. Using fallback mode (JSON files)."
  );
}

// Client for server-side operations (uses service role key for full access)
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Check if database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("products").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}
