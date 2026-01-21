// scripts/update-product-asin.ts
// Helper script to update a product's ASIN and Amazon URL
// Usage: tsx scripts/update-product-asin.ts <product-slug> <new-asin>

import fs from "fs/promises";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "lib/products-data.ts");

async function updateProductASIN(slug: string, newASIN: string) {
  try {
    const content = await fs.readFile(PRODUCTS_FILE, "utf8");
    
    // Validate ASIN format
    if (!/^[A-Z0-9]{10}$/i.test(newASIN)) {
      throw new Error(`Invalid ASIN format: ${newASIN}. ASIN must be 10 alphanumeric characters.`);
    }

    const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";
    const newUrl = `https://www.amazon.com/dp/${newASIN}?tag=${trackingId}`;

    // Replace ASIN
    const asinPattern = new RegExp(`(asin:\\s*")([^"]+)(".*?slug:\\s*"${slug}")`, "s");
    if (!asinPattern.test(content)) {
      throw new Error(`Product with slug "${slug}" not found`);
    }
    let updated = content.replace(asinPattern, `$1${newASIN}$3`);

    // Replace amazonUrl
    const urlPattern = new RegExp(`(amazonUrl:\\s*"https://www\\.amazon\\.com/dp/)([^"?]+)([^"]*"\\s*.*?slug:\\s*"${slug}")`, "s");
    updated = updated.replace(urlPattern, `$1${newASIN}?tag=${trackingId}$3`);

    await fs.writeFile(PRODUCTS_FILE, updated, "utf8");
    console.log(`✅ Updated product "${slug}":`);
    console.log(`   ASIN: ${newASIN}`);
    console.log(`   URL: ${newUrl}`);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    process.exit(1);
  }
}

const [slug, asin] = process.argv.slice(2);

if (!slug || !asin) {
  console.log("Usage: tsx scripts/update-product-asin.ts <product-slug> <new-asin>");
  console.log("\nExample:");
  console.log('  tsx scripts/update-product-asin.ts bamboo-drawer-organizer B0B672HBW9');
  process.exit(1);
}

updateProductASIN(slug, asin.toUpperCase());
