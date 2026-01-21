// scripts/fix-all-products-images-final.ts
// Final script to update all products 2-12 with correct images
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Exact mapping based on product order by created_at
const productImageMap: { [key: string]: string } = {
  // Product 2
  "asin-b08yz5yf7m-v1": "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg",
  // Product 3
  "asin-b08n5wrwnw-v3": "https://m.media-amazon.com/images/I/81yj+PUYVxL._AC_SL1500_.jpg",
  // Product 4
  "asin-b08yz5yf7m-v2": "https://m.media-amazon.com/images/I/71TKkjJC2JL._AC_SL1500_.jpg",
  // Product 5
  "asin-b07gjx5qyr-v3": "https://m.media-amazon.com/images/I/71mDTOYtDSL._AC_SL1500_.jpg",
  // Product 6
  "asin-b07gjx5qyr-v2": "https://m.media-amazon.com/images/I/71U7SEX345L._AC_SL1500_.jpg",
  // Product 7
  "asin-b07h8qmzpv-v2": "https://m.media-amazon.com/images/I/81vcpoC1YwL._AC_SL1500_.jpg",
  // Product 8
  "asin-b07h8qmzpv-v1": "https://m.media-amazon.com/images/I/61+heXD7SeL._AC_SL1500_.jpg",
  // Product 9
  "asin-b08n5wrwnw-v1": "https://m.media-amazon.com/images/I/71A1QQMJjgL._AC_SL1500_.jpg",
  // Product 10
  "asin-b08n5wrwnw-v2": "https://m.media-amazon.com/images/I/61AnB4vPuAL._AC_SL1500_.jpg",
  // Product 11
  "asin-b07gjx5qyr-v1": "https://m.media-amazon.com/images/I/71eiII6MS-L._AC_SL1500_.jpg",
  // Product 12
  "asin-b07h8qmzpv-v3": "https://m.media-amazon.com/images/I/61hEtbJv3YL._AC_SL1500_.jpg",
};

async function main() {
  console.log("🔄 Final update: Setting correct images for products 2-12...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available.");
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const [productId, imageUrl] of Object.entries(productImageMap)) {
    const { error } = await supabase
      .from("products")
      .update({ hero_image: imageUrl })
      .eq("id", productId);

    if (error) {
      console.error(`❌ Error updating ${productId}:`, error);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\n✅ Updated ${successCount} products`);
  if (errorCount > 0) {
    console.log(`❌ ${errorCount} errors`);
  }

  // Verify
  console.log("\n📋 Verification:");
  const { data: products } = await supabase
    .from("products")
    .select("id, name, hero_image")
    .in("id", Object.keys(productImageMap))
    .order("created_at", { ascending: true });

  if (products) {
    const expectedImages = [
      "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg", // 2
      "https://m.media-amazon.com/images/I/81yj+PUYVxL._AC_SL1500_.jpg", // 3
      "https://m.media-amazon.com/images/I/71TKkjJC2JL._AC_SL1500_.jpg", // 4
      "https://m.media-amazon.com/images/I/71mDTOYtDSL._AC_SL1500_.jpg", // 5
      "https://m.media-amazon.com/images/I/71U7SEX345L._AC_SL1500_.jpg", // 6
      "https://m.media-amazon.com/images/I/81vcpoC1YwL._AC_SL1500_.jpg", // 7
      "https://m.media-amazon.com/images/I/61+heXD7SeL._AC_SL1500_.jpg", // 8
      "https://m.media-amazon.com/images/I/71A1QQMJjgL._AC_SL1500_.jpg", // 9
      "https://m.media-amazon.com/images/I/61AnB4vPuAL._AC_SL1500_.jpg", // 10
      "https://m.media-amazon.com/images/I/71eiII6MS-L._AC_SL1500_.jpg", // 11
      "https://m.media-amazon.com/images/I/61hEtbJv3YL._AC_SL1500_.jpg", // 12
    ];

    products.forEach((p, i) => {
      const productNumber = i + 2;
      const expected = expectedImages[i];
      const isCorrect = p.hero_image === expected;
      console.log(`${isCorrect ? "✅" : "❌"} Product ${productNumber}: ${p.name}`);
      if (!isCorrect) {
        console.log(`   Expected: ${expected}`);
        console.log(`   Got: ${p.hero_image}`);
      }
    });
  }
}

main();
