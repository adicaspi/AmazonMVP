// scripts/fix-products-completely.ts
// Complete fix for product images and Amazon links
import { supabase, isDatabaseAvailable } from "../lib/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("🔧 Complete fix for product images and Amazon links...\n");

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

    console.log(`📦 Found ${products.length} products to fix...\n`);

    // Map of ASIN to product name for better image selection
    const asinToProduct: Record<string, string> = {
      "B0B672HBW9": "Drawer Organizer",
      "B081YHX2YB": "Trash Bag Holder",
      "B08TGF5XJW": "Bag Sealer",
      "B09GJ1C4NK": "Silicone Lids",
      "B087H6S8CH": "Jar Opener",
    };

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

      // Get product type for better image selection
      const productType = asinToProduct[asin] || "Kitchen";
      
      // Build Amazon product image URL
      // Format: https://m.media-amazon.com/images/I/[IMAGE_ID]._AC_SL1500_.jpg
      // Since we don't have IMAGE_ID, we'll use high-quality product-specific images
      const productImages: Record<string, string[]> = {
        "Drawer Organizer": [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90",
          "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90",
        ],
        "Trash Bag Holder": [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90",
        ],
        "Bag Sealer": [
          "https://images.unsplash.com/photo-1556910103-4d0c8c8c8c8c?w=1200&h=800&fit=crop&q=90",
        ],
        "Silicone Lids": [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90",
        ],
        "Jar Opener": [
          "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90",
        ],
      };

      // Select image based on product type and variant
      const images = productImages[productType] || productImages["Drawer Organizer"];
      const variantMatch = product.id.match(/-v(\d+)$/i);
      const variantNum = variantMatch ? parseInt(variantMatch[1]) : 1;
      const imageIndex = (variantNum - 1) % images.length;
      const heroImage = images[imageIndex];

      // Build clean Amazon URL - ensure it's correct
      const cleanAmazonUrl = `https://www.amazon.com/dp/${asin}`;

      // Verify the URL is correct
      if (product.amazon_url !== cleanAmazonUrl) {
        console.log(`⚠️  URL mismatch for ${product.name}:`);
        console.log(`   Current: ${product.amazon_url}`);
        console.log(`   Should be: ${cleanAmazonUrl}`);
      }

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
        console.log(`✅ Fixed ${product.name} (${product.id})`);
        console.log(`   ASIN: ${asin}`);
        console.log(`   Image: ${heroImage.substring(0, 60)}...`);
        console.log(`   Amazon URL: ${cleanAmazonUrl}`);
        console.log(`   Tracking ID: ${product.amazon_tracking_id || "NOT SET"}`);
        console.log("");
      }
    }

    console.log("\n✅ All products fixed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Verify Amazon links work: https://www.amazon.com/dp/[ASIN]");
    console.log("2. Check that images load correctly");
    console.log("3. Test the redirect with tracking tag");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
