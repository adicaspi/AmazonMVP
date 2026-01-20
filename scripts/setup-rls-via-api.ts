// scripts/setup-rls-via-api.ts
// Alternative approach using Supabase Management API
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function setupRLS() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("❌ Supabase credentials not found");
    return;
  }

  console.log("🔧 Setting up RLS policies via Supabase API...\n");

  // Supabase doesn't have a direct SQL execution API
  // But we can use the REST API to check and potentially modify policies
  // However, the easiest way is to use the Supabase client with service role key
  
  // Let's try using pg directly or provide clear instructions
  console.log("⚠️  Supabase doesn't allow direct SQL execution via API for security reasons.");
  console.log("\n📋 You need to run this SQL manually in Supabase SQL Editor:");
  console.log("\n" + getRLSSQL());
  console.log("\n🔗 Direct link to your SQL Editor:");
  console.log("   https://supabase.com/dashboard/project/uoydxjnbqbifcaigeexg/sql/new");
  console.log("\n💡 Copy the SQL above, paste it in the editor, and click 'Run'");
}

function getRLSSQL(): string {
  return `-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Public insert access" ON events;
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Public read access" ON creatives;

-- Products: Allow public read access
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

-- Events: Allow public insert (for tracking)
CREATE POLICY "Public insert access" ON events
  FOR INSERT WITH CHECK (true);

-- Events: Allow public read access
CREATE POLICY "Public read access" ON events
  FOR SELECT USING (true);

-- Creatives: Allow public read access
CREATE POLICY "Public read access" ON creatives
  FOR SELECT USING (true);`;
}

setupRLS();
