// scripts/fix-products-images-order.ts
// Script to update products 2-12 with images in the correct order
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Images in the exact order you specified
const imageMap: { [key: number]: string } = {
  2: "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg",
  3: "https://m.media-amazon.com/images/I/81yj+PUYVxL._AC_SL1500_.jpg",
  4: "https://m.media-amazon.com/images/I/71TKkjJC2JL._AC_SL1500_.jpg",
  5: "https://m.media-amazon.com/images/I/71mDTOYtDSL._AC_SL1500_.jpg",
  6: "https://m.media-amazon.com/images/I/71U7SEX345L._AC_SL1500_.jpg",
  7: "https://m.media-amazon.com/images/I/81vcpoC1YwL._AC_SL1500_.jpg",
  8: "https://m.media-amazon.com/images/I/61+heXD7SeL._AC_SL1500_.jpg",
  9: "https://m.media-amazon.com/images/I/71A1QQMJjgL._AC_SL1500_.jpg",
  10: "https://m.media-amazon.com/images/I/61AnB4vPuAL._AC_SL1500_.jpg",
  11: "https://m.media-amazon.com/images/I/71eiII6MS-L._AC_SL1500_.jpg",
  12: "https://m.media-amazon.com/images/I/61hEtbJv3YL._AC_SL1500_.jpg",
};

async function main() {
  console.log("🔄 Fixing product images order (products 2-12)...\n");

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

    if (products.length < 12) {
      console.error(`❌ Need at least 12 products, found only ${products.length}`);
      return;
    }

    console.log(`📦 Found ${products.length} products in database.\n`);

    // Update products 2-12 (indices 1-11)
    const productsToUpdate = products.slice(1, 12);

    console.log("🔄 Updating products with correct images...\n");

    // Update each product with the correct image
    for (let i = 0; i < productsToUpdate.length; i++) {
      const product = productsToUpdate[i];
      const productNumber = i + 2; // Product 2, 3, 4, etc.
      const imageUrl = imageMap[productNumber];

      if (!imageUrl) {
        console.error(`❌ No image specified for product ${productNumber}`);
        continue;
      }

      console.log(`🔄 Updating product ${productNumber} (${product.id})...`);
      console.log(`   Current: ${product.hero_image || "NO IMAGE"}`);
      console.log(`   New: ${imageUrl}`);

      const { error: updateError } = await supabase
        .from("products")
        .update({
          hero_image: imageUrl,
        })
        .eq("id", product.id);

      if (updateError) {
        console.error(`❌ Error updating product ${productNumber} (${product.id}):`, updateError);
      } else {
        // Verify the update
        const { data: updated, error: verifyError } = await supabase
          .from("products")
          .select("hero_image")
          .eq("id", product.id)
          .single();

        if (verifyError) {
          console.error(`⚠️  Could not verify update for ${product.id}:`, verifyError);
        } else {
          const isCorrect = updated.hero_image === imageUrl;
          if (isCorrect) {
            console.log(`✅ Updated product ${productNumber}: ${product.name}`);
          } else {
            console.error(`❌ Update failed! Expected: ${imageUrl}`);
            console.error(`   Got: ${updated.hero_image}`);
          }
        }
      }
      console.log("");
    }

    console.log("✅ All products updated!");
    
    // Show final state
    console.log("\n📋 Final state:");
    const { data: finalProducts } = await supabase
      .from("products")
      .select("id, name, hero_image")
      .order("created_at", { ascending: true });

    if (finalProducts) {
      finalProducts.slice(1, 12).forEach((p, i) => {
        const productNumber = i + 2;
        const expectedImage = imageMap[productNumber];
        const isCorrect = p.hero_image === expectedImage;
        const status = isCorrect ? "✅" : "❌";
        console.log(`${status} Product ${productNumber}: ${p.name}`);
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
