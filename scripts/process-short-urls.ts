// scripts/process-short-urls.ts
// Process short Amazon URLs (amzn.to) - guide user to get ASINs
import fs from "fs/promises";
import path from "path";

type UrlMapping = {
  shortUrl: string;
  asin?: string;
};

/**
 * Guide user to extract ASINs from short URLs
 */
async function processShortUrls(urls: string[]) {
  console.log(`\n📋 Processing ${urls.length} short Amazon URLs...\n`);
  console.log(`⚠️  Short URLs (amzn.to) need to be opened to get the ASIN.\n`);

  const mappings: UrlMapping[] = urls.map(url => ({ shortUrl: url }));

  console.log(`📝 Instructions:\n`);
  console.log(`1. Open each URL below in your browser`);
  console.log(`2. Wait for the Amazon product page to load`);
  console.log(`3. Look at the URL - it will be like:`);
  console.log(`   https://www.amazon.com/dp/B09V5G395G`);
  console.log(`                              ^^^^^^^^^^`);
  console.log(`                              This is the ASIN\n`);
  console.log(`4. Copy the ASIN (10 characters) and add it next to each URL\n`);

  console.log(`📋 Your URLs:\n`);
  mappings.forEach((mapping, i) => {
    console.log(`${i + 1}. ${mapping.shortUrl}`);
    console.log(`   ASIN: ___________ (copy from Amazon page)`);
    console.log(``);
  });

  console.log(`\n💡 After you get all ASINs:`);
  console.log(`   1. Create a file: products-asins.txt`);
  console.log(`   2. Put one ASIN per line:`);
  console.log(`      B09V5G395G`);
  console.log(`      B08YZ5YF7M`);
  console.log(`      ...`);
  console.log(`   3. Run: npm run replace:asins $(cat products-asins.txt | tr '\\n' ' ')`);
  console.log(`\n   OR send me the ASINs here and I'll update everything!`);
}

// Get URLs from command line
const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.log("Usage: npm run process:urls <url1> <url2> ...");
  console.log("\nExample:");
  console.log('  npm run process:urls "https://amzn.to/49OAnv4" "https://amzn.to/4qB2Hs3" ...');
  process.exit(1);
}

processShortUrls(urls).catch(console.error);
