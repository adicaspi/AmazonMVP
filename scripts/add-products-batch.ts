// scripts/add-products-batch.ts
// Add multiple products from Amazon URLs in batch
// Extracts ASINs, gets product info, and updates the site

import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type ProductInput = {
  url: string;
  asin?: string; // Optional - will try to extract from URL
  title?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  room?: string;
  tags?: string[];
  mainProblem?: string;
  targetUser?: string;
};

/**
 * Extract ASIN from Amazon URL
 */
function extractASIN(url: string): string | null {
  // Handle various URL formats
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/product\/([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i,
    /ASIN[=:]([A-Z0-9]{10})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
  }

  // If URL itself is just ASIN
  if (/^[A-Z0-9]{10}$/i.test(url.trim())) {
    return url.trim().toUpperCase();
  }

  return null;
}

/**
 * Process and add products
 */
async function addProductsBatch(products: ProductInput[]) {
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

  // Read existing products
  let existingProducts: any[] = [];
  try {
    const content = await fs.readFile(discoveryFile, "utf8");
    existingProducts = JSON.parse(content);
  } catch (error) {
    existingProducts = [];
  }

  const newProducts: any[] = [];
  const errors: string[] = [];

  console.log(`\n📦 Processing ${products.length} products...\n`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Processing: ${product.url}`);

    // Extract ASIN
    let asin = product.asin ? product.asin.toUpperCase() : extractASIN(product.url);

    if (!asin) {
      errors.push(`Could not extract ASIN from: ${product.url}`);
      console.log(`  ❌ Could not extract ASIN`);
      continue;
    }

    if (!isValidASIN(asin)) {
      errors.push(`Invalid ASIN format: ${asin} from ${product.url}`);
      console.log(`  ❌ Invalid ASIN: ${asin}`);
      continue;
    }

    // Check if already exists
    if (existingProducts.some(p => p.asin === asin)) {
      console.log(`  ⚠️  Already exists - skipping`);
      continue;
    }

    // Determine vertical
    const vertical = product.room === "kitchen" ? "home_kitchen" : 
                     product.room === "living_room" ? "home_living" :
                     "home_kitchen";

    // Create product entry
    const newProduct = {
      asin: asin,
      title: product.title || `Product ${asin}`,
      price: product.price || 24.99,
      rating: product.rating || 4.5,
      reviews: product.reviews || 1000,
      vertical: vertical,
      baseAmazonUrl: `https://www.amazon.com/dp/${asin}`,
      trackingId: trackingId,
      mainProblem: product.mainProblem || "a common home organization problem",
      targetUser: product.targetUser || "people looking to organize their home",
    };

    newProducts.push(newProduct);
    existingProducts.push(newProduct);
    
    console.log(`  ✅ Added: ${newProduct.title} (${asin})`);
  }

  // Save all products
  await fs.writeFile(discoveryFile, JSON.stringify(existingProducts, null, 2), "utf8");

  console.log(`\n✅ Summary:`);
  console.log(`   Added: ${newProducts.length} products`);
  if (errors.length > 0) {
    console.log(`   Errors: ${errors.length}`);
    errors.forEach(err => console.log(`     - ${err}`));
  }

  console.log(`\n📝 Updated: ai/discoveryInput.json`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Review products in ai/discoveryInput.json`);
  console.log(`   2. Update titles, prices, ratings if needed`);
  console.log(`   3. Add mainProblem and targetUser for each product`);
  console.log(`   4. Run: npm run import:discovery`);
}

// Read products from JSON file or command line
async function main() {
  const inputFile = process.argv[2];

  if (inputFile && inputFile.endsWith('.json')) {
    // Read from JSON file
    const content = await fs.readFile(inputFile, "utf8");
    const products: ProductInput[] = JSON.parse(content);
    await addProductsBatch(products);
  } else {
    // Read from command line (space-separated URLs)
    const urls = process.argv.slice(2);
    
    if (urls.length === 0) {
      console.log("Usage:");
      console.log("  npm run add:batch <url1> <url2> ...");
      console.log("  OR");
      console.log("  npm run add:batch products.json");
      console.log("\nExample:");
      console.log('  npm run add:batch "https://amzn.to/49OAnv4" "https://www.amazon.com/dp/B08YZ5YF7M"');
      process.exit(1);
    }

    const products: ProductInput[] = urls.map(url => ({ url }));
    await addProductsBatch(products);
  }
}

main().catch(console.error);
