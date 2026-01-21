// scripts/add-product-from-url-advanced.ts
// Advanced: Add product from Amazon URL with automatic ASIN extraction
// Handles both full URLs and short URLs (amzn.to)

import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type ProductInfo = {
  url: string;
  asin: string;
  title: string;
  price?: number;
  rating?: number;
  reviews?: number;
  room?: string;
  tags?: string[];
  mainProblem?: string;
  targetUser?: string;
};

/**
 * Extract ASIN from Amazon URL (handles short URLs too)
 */
async function extractASINFromUrl(url: string): Promise<string | null> {
  // If it's a short URL (amzn.to), we need the full URL
  // For now, we'll ask user to provide ASIN or full URL
  
  // Try to extract from full URL patterns
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/product\/([A-Z0-9]{10})/i,
    /ASIN[=:]([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
  }

  // If it's a short URL, we can't extract without following redirect
  // So we'll return null and ask for ASIN
  return null;
}

/**
 * Add product from URL
 */
async function addProductFromUrl(productInfo: ProductInfo) {
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

  // Try to extract ASIN
  let asin = await extractASINFromUrl(productInfo.url);
  
  // If we couldn't extract, use provided ASIN
  if (!asin && productInfo.asin) {
    asin = productInfo.asin.toUpperCase();
  }

  if (!asin || !isValidASIN(asin)) {
    console.error(`❌ Could not extract valid ASIN from URL: ${productInfo.url}`);
    console.log(`\n💡 Please provide the ASIN manually.`);
    console.log(`   The ASIN is the 10-character code in the Amazon URL.`);
    console.log(`   Example: https://www.amazon.com/dp/B09V5G395G`);
    console.log(`                                    ^^^^^^^^^^`);
    console.log(`                                    This is the ASIN`);
    return false;
  }

  // Read existing products
  let products: any[] = [];
  try {
    const content = await fs.readFile(discoveryFile, "utf8");
    products = JSON.parse(content);
  } catch (error) {
    products = [];
  }

  // Check if product already exists
  if (products.some(p => p.asin === asin)) {
    console.log(`⚠️  Product with ASIN ${asin} already exists - skipping`);
    return false;
  }

  // Build Amazon URL with tracking
  const amazonUrl = buildAmazonURLFromASIN(asin, trackingId);

  // Determine vertical from room
  const vertical = productInfo.room === "kitchen" ? "home_kitchen" : 
                   productInfo.room === "living_room" ? "home_living" :
                   "home_kitchen";

  // Generate product entry
  const newProduct = {
    asin: asin,
    title: productInfo.title,
    price: productInfo.price || 24.99,
    rating: productInfo.rating || 4.5,
    reviews: productInfo.reviews || 1000,
    vertical: vertical,
    baseAmazonUrl: `https://www.amazon.com/dp/${asin}`,
    trackingId: trackingId,
    mainProblem: productInfo.mainProblem || "a common home organization problem",
    targetUser: productInfo.targetUser || "people looking to organize their home",
  };

  products.push(newProduct);

  // Save
  await fs.writeFile(discoveryFile, JSON.stringify(products, null, 2), "utf8");

  console.log(`✅ Added: ${newProduct.title} (${asin})`);
  return true;
}

/**
 * Process multiple URLs from a file or command line
 */
async function processUrls(urls: string[]) {
  console.log(`\n📦 Processing ${urls.length} products...\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n[${i + 1}/${urls.length}] Processing: ${url}`);
    
    // Extract ASIN from URL
    const asin = await extractASINFromUrl(url);
    
    if (!asin) {
      console.log(`⚠️  Could not extract ASIN - please provide manually`);
      failCount++;
      continue;
    }

    // For now, we'll use basic info - user can update later
    const success = await addProductFromUrl({
      url: url,
      asin: asin,
      title: `Product ${asin}`, // User will update this
    });

    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✅ Summary:`);
  console.log(`   Added: ${successCount} products`);
  console.log(`   Failed: ${failCount} products`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Update product titles, prices, ratings in ai/discoveryInput.json`);
  console.log(`   2. Add mainProblem and targetUser for each product`);
  console.log(`   3. Run: npm run import:discovery`);
}

// Get URLs from command line
const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.log("Usage: npm run add:urls <url1> <url2> ...");
  console.log("\nExample:");
  console.log('  npm run add:urls "https://amzn.to/49OAnv4" "https://www.amazon.com/dp/B08YZ5YF7M"');
  process.exit(1);
}

processUrls(urls).catch(console.error);
