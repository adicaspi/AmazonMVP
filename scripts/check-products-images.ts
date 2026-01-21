// scripts/check-products-images.ts
// Script to check current product images
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("🔍 Checking current product images...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    process.exit(1);
  }

  try {
    // Get all products ordered by creation date
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (fetchError) {
      console.error("❌ Error fetching products:", fetchError);
      process.exit(1);
    }

    if (!products || products.length === 0) {
      console.log("ℹ️  No products found in database.");
      return;
    }

    console.log(`📦 Found ${products.length} products:\n`);

    products.forEach((product, index) => {
      const productNumber = index + 1;
      console.log(`Product ${productNumber}: ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Image: ${product.hero_image || "NO IMAGE"}`);
      console.log(`   Created: ${product.created_at}`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
