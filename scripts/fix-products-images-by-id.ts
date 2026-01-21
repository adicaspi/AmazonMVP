// scripts/fix-products-images-by-id.ts
// Script to update specific products by ID with correct images
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Map of product IDs to their correct images (products 2-12)
// Based on the order you specified - products ordered by created_at
// Product 2 = index 1, Product 3 = index 2, etc.
const productImageMap: { [key: string]: string } = {
  // Product 2 (index 1 in sorted by created_at)
  "asin-b08yz5yf7m-v1": "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg",
  // Product 3 (index 2) - currently showing image 4, needs image 3
  "asin-b08yz5yf7m-v2": "https://m.media-amazon.com/images/I/81yj+PUYVxL._AC_SL1500_.jpg",
  // Product 4 (index 3) - currently showing image 5, needs image 4
  "asin-b07gjx5qyr-v3": "https://m.media-amazon.com/images/I/71TKkjJC2JL._AC_SL1500_.jpg",
  // Product 5 (index 4) - currently showing image 7, needs image 5
  "asin-b07h8qmzpv-v2": "https://m.media-amazon.com/images/I/71mDTOYtDSL._AC_SL1500_.jpg",
  // Product 6 (index 5) - currently showing image 8, needs image 6
  "asin-b07h8qmzpv-v1": "https://m.media-amazon.com/images/I/71U7SEX345L._AC_SL1500_.jpg",
  // Product 7 (index 6) - currently showing image 3, needs image 7
  "asin-b08n5wrwnw-v1": "https://m.media-amazon.com/images/I/81vcpoC1YwL._AC_SL1500_.jpg",
  // Product 8 (index 7) - currently showing image 10, needs image 8
  "asin-b08n5wrwnw-v2": "https://m.media-amazon.com/images/I/61+heXD7SeL._AC_SL1500_.jpg",
  // Product 9 (index 8) - currently showing image 9, needs image 9
  "asin-b08n5wrwnw-v1": "https://m.media-amazon.com/images/I/71A1QQMJjgL._AC_SL1500_.jpg",
  // Product 10 (index 9) - currently showing image 11, needs image 10
  "asin-b07gjx5qyr-v1": "https://m.media-amazon.com/images/I/61AnB4vPuAL._AC_SL1500_.jpg",
  // Product 11 (index 10) - currently showing image 6, needs image 11
  "asin-b07gjx5qyr-v2": "https://m.media-amazon.com/images/I/71eiII6MS-L._AC_SL1500_.jpg",
  // Product 12 (index 11)
  "asin-b07h8qmzpv-v3": "https://m.media-amazon.com/images/I/61hEtbJv3YL._AC_SL1500_.jpg",
};

async function main() {
  console.log("🔄 Updating products 2-12 with correct images by ID...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available. Please set up Supabase first.");
    process.exit(1);
  }

  try {
    let successCount = 0;
    let errorCount = 0;

    // Update each product by ID
    for (const [productId, imageUrl] of Object.entries(productImageMap)) {
      console.log(`🔄 Updating ${productId}...`);

      // Get current product info
      const { data: current, error: fetchError } = await supabase
        .from("products")
        .select("name, hero_image")
        .eq("id", productId)
        .single();

      if (fetchError || !current) {
        console.error(`❌ Product ${productId} not found`);
        errorCount++;
        continue;
      }

      console.log(`   Current: ${current.hero_image || "NO IMAGE"}`);
      console.log(`   New: ${imageUrl}`);

      // Update the product
      const { error: updateError } = await supabase
        .from("products")
        .update({
          hero_image: imageUrl,
        })
        .eq("id", productId);

      if (updateError) {
        console.error(`❌ Error updating ${productId}:`, updateError);
        errorCount++;
      } else {
        // Verify the update
        const { data: updated, error: verifyError } = await supabase
          .from("products")
          .select("hero_image")
          .eq("id", productId)
          .single();

        if (verifyError) {
          console.error(`⚠️  Could not verify update for ${productId}:`, verifyError);
          errorCount++;
        } else {
          const isCorrect = updated.hero_image === imageUrl;
          if (isCorrect) {
            console.log(`✅ Updated: ${current.name}`);
            successCount++;
          } else {
            console.error(`❌ Update failed! Expected: ${imageUrl}`);
            console.error(`   Got: ${updated.hero_image}`);
            errorCount++;
          }
        }
      }
      console.log("");
    }

    console.log(`\n✅ Updated ${successCount} products successfully`);
    if (errorCount > 0) {
      console.log(`❌ ${errorCount} products failed to update`);
    }

    // Show final verification
    console.log("\n📋 Final verification:");
    const { data: products } = await supabase
      .from("products")
      .select("id, name, hero_image")
      .in("id", Object.keys(productImageMap))
      .order("created_at", { ascending: true });

    if (products) {
      products.forEach((p) => {
        const expectedImage = productImageMap[p.id];
        const isCorrect = p.hero_image === expectedImage;
        const status = isCorrect ? "✅" : "❌";
        console.log(`${status} ${p.name} (${p.id})`);
        if (!isCorrect) {
          console.log(`   Expected: ${expectedImage}`);
          console.log(`   Got: ${p.hero_image}`);
        }
      });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
