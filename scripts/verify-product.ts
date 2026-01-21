// scripts/verify-product.ts
// Verify if an Amazon product ASIN is real and working
import { isValidASIN } from "../lib/amazon-links";

async function verifyProduct(asin: string) {
  if (!isValidASIN(asin)) {
    console.error(`❌ Invalid ASIN format: ${asin}`);
    console.log("ASIN must be 10 alphanumeric characters");
    process.exit(1);
  }

  const amazonUrl = `https://www.amazon.com/dp/${asin}`;
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";
  const affiliateUrl = `${amazonUrl}?tag=${trackingId}`;

  console.log(`\n🔍 Verifying product: ${asin}`);
  console.log(`\n📋 Product Information:`);
  console.log(`   ASIN: ${asin}`);
  console.log(`   Amazon URL: ${amazonUrl}`);
  console.log(`   Affiliate URL: ${affiliateUrl}`);
  
  console.log(`\n✅ ASIN format is valid (10 characters)`);
  
  console.log(`\n⚠️  IMPORTANT: Manual Verification Required`);
  console.log(`\nTo verify this product is real:`);
  console.log(`1. Open this URL in your browser:`);
  console.log(`   ${amazonUrl}`);
  console.log(`\n2. Check if:`);
  console.log(`   ✅ The product page loads (not "Page Not Found")`);
  console.log(`   ✅ The product matches the description`);
  console.log(`   ✅ The price, rating, and reviews are correct`);
  console.log(`   ✅ The product is available for purchase`);
  
  console.log(`\n💡 Tip: Copy the ASIN and search on Amazon:`);
  console.log(`   https://www.amazon.com/s?k=${asin}`);
  
  console.log(`\n📝 If the product is real:`);
  console.log(`   Add it to ai/discoveryInput.json`);
  console.log(`   Then run: npm run import:discovery`);
  
  console.log(`\n❌ If the product doesn't exist:`);
  console.log(`   Don't add it to your site`);
  console.log(`   Try another product from the recommendations`);
}

const asin = process.argv[2];

if (!asin) {
  console.log("Usage: npm run verify:product <ASIN>");
  console.log("\nExample:");
  console.log("  npm run verify:product B08YZ5YF7M");
  process.exit(1);
}

verifyProduct(asin).catch(console.error);
