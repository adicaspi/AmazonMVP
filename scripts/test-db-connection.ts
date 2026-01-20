// scripts/test-db-connection.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { supabase, isDatabaseAvailable } from "../lib/db";

async function testConnection() {
  console.log("🔍 Testing Supabase connection...\n");

  if (!supabase) {
    console.error("❌ Supabase client not initialized. Check your .env.local file.");
    return;
  }

  console.log("✅ Supabase client initialized");

  const isAvailable = await isDatabaseAvailable();
  if (isAvailable) {
    console.log("✅ Database is available!");
    
    // Try to list tables
    const { data, error } = await supabase.from("products").select("id").limit(1);
    if (error) {
      console.error("❌ Error accessing products table:", error.message);
      console.log("\n💡 Make sure you've run the schema.sql in Supabase SQL Editor!");
    } else {
      console.log("✅ Products table exists and is accessible");
    }
  } else {
    console.error("❌ Database is not available");
    console.log("\n💡 Steps to fix:");
    console.log("1. Go to Supabase Dashboard → SQL Editor");
    console.log("2. Copy the content from supabase/schema.sql");
    console.log("3. Run it in SQL Editor");
    console.log("4. Then run this test again");
  }
}

testConnection().catch(console.error);
