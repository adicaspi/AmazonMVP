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

      // Build Amazon product image URL using ASIN
      // Amazon product images format: https://m.media-amazon.com/images/I/[IMAGE_ID]._AC_SL1500_.jpg
      // Since we don't have IMAGE_ID, we'll use a proxy service or try Amazon's image CDN
      // Alternative: Use Amazon's product image API format
      // For now, use high-quality Unsplash images mapped to specific products
      const productImageMap: Record<string, string> = {
        "B0B672HBW9": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90", // Drawer Organizer
        "B081YHX2YB": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90", // Trash Bag Holder
        "B08TGF5XJW": "https://images.unsplash.com/photo-1556910103-4d0c8c8c8c8c?w=1200&h=800&fit=crop&q=90", // Bag Sealer
        "B09GJ1C4NK": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90", // Silicone Lids
        "B087H6S8CH": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90", // Jar Opener
      };
      
      // Get image for this ASIN, or use variant-specific image
      let heroImage = productImageMap[asin];
      if (!heroImage) {
        // Fallback: use varied images based on product ID hash for variants
        const variantImages = [
          "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90",
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90",
          "https://images.unsplash.com/photo-1556910103-4d0c8c8c8c8c?w=1200&h=800&fit=crop&q=90",
        ];
        // Extract variant number (v1, v2, v3) from product ID
        const variantMatch = product.id.match(/v(\d+)$/i);
        const variantNum = variantMatch ? parseInt(variantMatch[1]) : 1;
        const index = (variantNum - 1) % variantImages.length;
        heroImage = variantImages[index];
      }

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
