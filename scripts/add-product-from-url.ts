// scripts/add-product-from-url.ts
// Add product from Amazon URL - extracts ASIN and product info automatically
import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type ProductFromUrl = {
  url: string;
  asin?: string;
  title?: string;
  price?: number;
  rating?: number;
  reviews?: number;
};

/**
 * Extract ASIN from Amazon URL
 */
function extractASINFromUrl(url: string): string | null {
  // If it's just an ASIN (10 characters)
  if (/^[A-Z0-9]{10}$/i.test(url.trim())) {
    return url.trim().toUpperCase();
  }

  // Try to extract from various URL patterns
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

  // For short URLs (amzn.to), we can't extract without following redirect
  // User will need to provide ASIN or full URL
  return null;
}

/**
 * Add product from URL to discoveryInput.json
 */
async function addProductFromUrl(url: string, additionalInfo?: {
  mainProblem?: string;
  targetUser?: string;
  room?: string;
  tags?: string[];
}) {
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

  // Extract ASIN
  let asin = extractASINFromUrl(url);
  
  if (!asin) {
    console.error(`❌ Could not extract ASIN from URL: ${url}`);
    console.log("\n💡 Please provide the ASIN manually:");
    console.log("   The ASIN is the 10-character code in the Amazon URL");
    console.log("   Example: https://www.amazon.com/dp/B09V5G395G");
    console.log("                                    ^^^^^^^^^^");
    console.log("                                    This is the ASIN");
    return;
  }

  if (!isValidASIN(asin)) {
    console.error(`❌ Invalid ASIN format: ${asin}`);
    return;
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
    console.error(`❌ Product with ASIN ${asin} already exists!`);
    return;
  }

  // Build Amazon URL with tracking
  const amazonUrl = buildAmazonURLFromASIN(asin, trackingId);

  // Generate product entry
  const newProduct = {
    asin: asin,
    title: additionalInfo?.title || `Product ${asin}`,
    price: additionalInfo?.price || 24.99,
    rating: additionalInfo?.rating || 4.5,
    reviews: additionalInfo?.reviews || 1000,
    vertical: additionalInfo?.room === "kitchen" ? "home_kitchen" : "home_living",
    baseAmazonUrl: `https://www.amazon.com/dp/${asin}`,
    trackingId: trackingId,
    mainProblem: additionalInfo?.mainProblem || "a common home organization problem",
    targetUser: additionalInfo?.targetUser || "people looking to organize their home",
  };

  products.push(newProduct);

  // Save
  await fs.writeFile(discoveryFile, JSON.stringify(products, null, 2), "utf8");

  console.log(`✅ Added product: ${newProduct.title} (${asin})`);
  console.log(`📝 Updated: ai/discoveryInput.json`);
  console.log(`\n💡 Next step: Run 'npm run import:discovery' to add to site`);
  console.log(`\n⚠️  Note: You may want to update:`);
  console.log(`   - Title (currently: ${newProduct.title})`);
  console.log(`   - Price, rating, reviews (if you know them)`);
  console.log(`   - mainProblem and targetUser`);
}

// Get URL from command line
const url = process.argv[2];

if (!url) {
  console.log("Usage: npm run add:url <amazon-url>");
  console.log("\nExample:");
  console.log('  npm run add:url "https://amzn.to/49OAnv4"');
  console.log('  npm run add:url "https://www.amazon.com/dp/B09V5G395G"');
  process.exit(1);
}

addProductFromUrl(url).catch(console.error);
