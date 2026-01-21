// scripts/update-products-images-from-list.ts
// Script to update products 2-12 with specific image URLs
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const images = [
  "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg", // Product 2
  "https://m.media-amazon.com/images/I/81yj+PUYVxL._AC_SL1500_.jpg", // Product 3
  "https://m.media-amazon.com/images/I/71TKkjJC2JL._AC_SL1500_.jpg", // Product 4
  "https://m.media-amazon.com/images/I/71mDTOYtDSL._AC_SL1500_.jpg", // Product 5
  "https://m.media-amazon.com/images/I/71U7SEX345L._AC_SL1500_.jpg", // Product 6
  "https://m.media-amazon.com/images/I/81vcpoC1YwL._AC_SL1500_.jpg", // Product 7
  "https://m.media-amazon.com/images/I/61+heXD7SeL._AC_SL1500_.jpg", // Product 8
  "https://m.media-amazon.com/images/I/71A1QQMJjgL._AC_SL1500_.jpg", // Product 9
  "https://m.media-amazon.com/images/I/61AnB4vPuAL._AC_SL1500_.jpg", // Product 10
  "https://m.media-amazon.com/images/I/71eiII6MS-L._AC_SL1500_.jpg", // Product 11
  "https://m.media-amazon.com/images/I/61hEtbJv3YL._AC_SL1500_.jpg", // Product 12
];

async function main() {
  console.log("🔄 Updating products 2-12 with new images...\n");

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

    console.log(`📦 Found ${products.length} products in database.\n`);

    // Update products 2-12 (indices 1-11)
    const productsToUpdate = products.slice(1, 12); // Skip first product (index 0), take next 11

    if (productsToUpdate.length === 0) {
      console.log("ℹ️  No products to update (need at least 2 products).");
      return;
    }

    if (productsToUpdate.length > images.length) {
      console.log(`⚠️  Warning: Only ${images.length} images provided, but ${productsToUpdate.length} products need updating.`);
    }

    console.log(`🔄 Updating ${productsToUpdate.length} products...\n`);

    // Update each product
    for (let i = 0; i < productsToUpdate.length && i < images.length; i++) {
      const product = productsToUpdate[i];
      const imageUrl = images[i];
      const productNumber = i + 2; // Product 2, 3, 4, etc.

      const { error: updateError } = await supabase
        .from("products")
        .update({
          hero_image: imageUrl,
        })
        .eq("id", product.id);

      if (updateError) {
        console.error(`❌ Error updating product ${productNumber} (${product.id}):`, updateError);
      } else {
        console.log(`✅ Updated product ${productNumber}: ${product.name}`);
        console.log(`   Image: ${imageUrl}`);
      }
    }

    console.log("\n✅ All products updated successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
