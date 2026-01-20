// scripts/clear-products.ts
// Script to clear all products from the database
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("🗑️  Clearing all products from database...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    process.exit(1);
  }

  try {
    // Delete all products
    const { error } = await supabase.from("products").delete().neq("id", "dummy");

    if (error) {
      console.error("❌ Error deleting products:", error);
      process.exit(1);
    }

    console.log("✅ All products deleted successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Prepare ai/raw_candidates.json with real products");
    console.log("2. Run: npm run ai:select");
    console.log("3. Run: npm run ai:pipeline");
    console.log("4. Run: npm run ai:creatives");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
