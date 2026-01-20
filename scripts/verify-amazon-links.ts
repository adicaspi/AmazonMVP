// scripts/verify-amazon-links.ts
// Script to verify Amazon links and ASINs are correct
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("🔍 Verifying Amazon links and ASINs...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    process.exit(1);
  }

  try {
    // Get all products
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("*");

    if (fetchError) {
      console.error("❌ Error fetching products:", fetchError);
      process.exit(1);
    }

    if (!products || products.length === 0) {
      console.log("ℹ️  No products found in database.");
      return;
    }

    console.log(`📦 Found ${products.length} products to verify...\n`);

    // Verify each product
    for (const product of products) {
      // Extract ASIN from amazon_url or id
      const asinMatch = 
        product.amazon_url?.match(/\/dp\/([A-Z0-9]{10})/i) || 
        product.id?.match(/asin-([a-z0-9]{10})/i);
      const asin = asinMatch ? asinMatch[1].toUpperCase() : null;

      console.log(`\n📦 Product: ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Current Amazon URL: ${product.amazon_url}`);
      console.log(`   Extracted ASIN: ${asin || "NOT FOUND"}`);
      
      if (asin) {
        const correctUrl = `https://www.amazon.com/dp/${asin}`;
        console.log(`   ✅ Correct URL should be: ${correctUrl}`);
        
        if (product.amazon_url !== correctUrl) {
          console.log(`   ⚠️  URL mismatch! Need to update.`);
        }
      } else {
        console.log(`   ❌ Could not extract ASIN!`);
      }
    }

    console.log("\n✅ Verification complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
