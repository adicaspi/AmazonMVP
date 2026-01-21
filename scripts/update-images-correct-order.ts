// scripts/update-images-correct-order.ts
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("🔄 Updating products 2-12 with images in correct order...\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    console.error("❌ Database not available.");
    process.exit(1);
  }

  // Get products ordered by created_at
  const { data: products } = await supabase
    .from("products")
    .select("id, name")
    .order("created_at", { ascending: true });

  if (!products || products.length < 12) {
    console.error("❌ Need at least 12 products");
    return;
  }

  // Images in the exact order you specified
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

  const productsToUpdate = products.slice(1, 12);

  console.log("Updating products:\n");
  for (let i = 0; i < productsToUpdate.length; i++) {
    const product = productsToUpdate[i];
    const imageUrl = images[i];
    const productNumber = i + 2;

    console.log(`Product ${productNumber}: ${product.name} (${product.id})`);
    console.log(`  → ${imageUrl}`);

    const { error } = await supabase
      .from("products")
      .update({ hero_image: imageUrl })
      .eq("id", product.id);

    if (error) {
      console.error(`  ❌ Error: ${error.message}`);
    } else {
      console.log(`  ✅ Updated`);
    }
    console.log("");
  }

  console.log("✅ All products updated!");
}

main();
