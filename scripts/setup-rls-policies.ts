// scripts/setup-rls-policies.ts
// Script to automatically set up RLS policies in Supabase
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const RLS_POLICIES_SQL = `
-- Enable RLS on all tables
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
  FOR SELECT USING (true);
`;

async function main() {
  console.log("🔧 Setting up RLS policies in Supabase...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please check your Supabase credentials.");
    process.exit(1);
  }

  try {
    // Execute the SQL using Supabase RPC or direct SQL execution
    // Note: Supabase JS client doesn't support direct SQL execution
    // We need to use the REST API or RPC functions
    
    // For now, let's use the REST API approach
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Supabase credentials not found in .env.local");
      console.log("\n📋 Please run this SQL manually in Supabase SQL Editor:");
      console.log("\n" + RLS_POLICIES_SQL);
      process.exit(1);
    }

    // Use fetch to execute SQL via Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ sql: RLS_POLICIES_SQL }),
    });

    if (!response.ok) {
      // If RPC doesn't exist, provide manual instructions
      console.log("⚠️  Cannot execute SQL automatically via API.");
      console.log("\n📋 Please run this SQL manually in Supabase SQL Editor:");
      console.log("\n" + RLS_POLICIES_SQL);
      console.log("\n🔗 Go to: https://supabase.com/dashboard/project/uoydxjnbqbifcaigeexg/sql/new");
      process.exit(1);
    }

    console.log("✅ RLS policies set up successfully!");
    
    // Verify by checking if we can read products
    const { data, error } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("❌ Error reading products:", error.message);
      console.log("\n📋 Please run this SQL manually in Supabase SQL Editor:");
      console.log("\n" + RLS_POLICIES_SQL);
    } else {
      console.log(`✅ Verified: Can read ${data?.length || 0} products from database`);
    }
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    console.log("\n📋 Please run this SQL manually in Supabase SQL Editor:");
    console.log("\n" + RLS_POLICIES_SQL);
    console.log("\n🔗 Go to: https://supabase.com/dashboard/project/uoydxjnbqbifcaigeexg/sql/new");
    process.exit(1);
  }
}

main();
