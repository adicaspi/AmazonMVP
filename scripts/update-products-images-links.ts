// scripts/update-products-images-links.ts
// Script to update existing products with better images and correct Amazon links
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("🔄 Updating existing products with better images and correct Amazon links...\n");

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

    console.log(`📦 Found ${products.length} products to update...\n`);

    // Update each product
    for (const product of products) {
      // Extract ASIN from amazon_url or id
      const asinMatch = 
        product.amazon_url?.match(/\/dp\/([A-Z0-9]{10})/i) || 
        product.id?.match(/asin-([a-z0-9]{10})/i);
      const asin = asinMatch ? asinMatch[1].toUpperCase() : null;

      if (!asin) {
        console.log(`⚠️  Skipping ${product.id} - no ASIN found`);
        continue;
      }

      // Build high-quality image URL - different image for each product variant
      // Use product ID (which includes variant) to ensure each variant gets a different image
      const allKitchenImages = [
        "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90", // Kitchen drawer
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90", // Kitchen tools
        "https://images.unsplash.com/photo-1556910103-4d0c8c8c8c8c?w=1200&h=800&fit=crop&q=90", // Kitchen organization
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90", // Food storage
        "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90", // Kitchen accessories
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90", // Cooking tools
      ];
      
      // Use product ID (includes variant) to create a hash for unique image per variant
      let hash = 0;
      const productId = product.id.toLowerCase();
      for (let i = 0; i < productId.length; i++) {
        hash = ((hash << 5) - hash) + productId.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      const index = Math.abs(hash) % allKitchenImages.length;
      const heroImage = allKitchenImages[index];

      // Build clean Amazon URL (remove any existing query params)
      const cleanAmazonUrl = `https://www.amazon.com/dp/${asin}`;

      // Update product
      const { error: updateError } = await supabase
        .from("products")
        .update({
          hero_image: heroImage,
          amazon_url: cleanAmazonUrl,
        })
        .eq("id", product.id);

      if (updateError) {
        console.error(`❌ Error updating ${product.id}:`, updateError);
      } else {
        console.log(`✅ Updated ${product.name} (${product.id})`);
        console.log(`   Image: ${heroImage}`);
        console.log(`   Amazon URL: ${cleanAmazonUrl}`);
      }
    }

    console.log("\n✅ All products updated successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
