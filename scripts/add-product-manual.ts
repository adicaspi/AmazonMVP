// scripts/add-product-manual.ts
// Manual product entry tool with validation
import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type ManualProduct = {
  asin: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  room: string;
  tags: string[];
  problem: string;
  user: string;
  image?: string;
};

async function addProductManually() {
  const args = process.argv.slice(2);
  
  if (args.length < 7) {
    console.log("Usage: npm run add:product <asin> <title> <price> <rating> <reviews> <room> <tags> <problem> <user> [image]");
    console.log("\nExample:");
    console.log('  npm run add:product B08YZ5YF7M "Bamboo Drawer Organizer" 24.99 4.5 8500 kitchen "organization,storage,bamboo" "messy drawers" "busy people"');
    process.exit(1);
  }

  const [asin, title, priceStr, ratingStr, reviewsStr, room, tagsStr, problem, user, image] = args;

  // Validate ASIN
  if (!isValidASIN(asin)) {
    console.error(`❌ Invalid ASIN: ${asin}. ASIN must be 10 alphanumeric characters.`);
    process.exit(1);
  }

  const price = parseFloat(priceStr);
  const rating = parseFloat(ratingStr);
  const reviews = parseInt(reviewsStr);
  const tags = tagsStr.split(",").map(t => t.trim());

  if (isNaN(price) || isNaN(rating) || isNaN(reviews)) {
    console.error("❌ Invalid price, rating, or reviews. Must be numbers.");
    process.exit(1);
  }

  const product: ManualProduct = {
    asin: asin.toUpperCase(),
    title,
    price,
    rating,
    reviews,
    room,
    tags,
    problem,
    user,
    image,
  };

  // Read discoveryInput.json
  const discoveryFile = path.join(process.cwd(), "ai/discoveryInput.json");
  let products: any[] = [];

  try {
    const content = await fs.readFile(discoveryFile, "utf8");
    products = JSON.parse(content);
  } catch (error) {
    // File doesn't exist, start fresh
    products = [];
  }

  // Check if ASIN already exists
  if (products.some(p => p.asin === product.asin)) {
    console.error(`❌ Product with ASIN ${product.asin} already exists!`);
    process.exit(1);
  }

  // Add product
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";
  const newProduct = {
    asin: product.asin,
    title: product.title,
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
    vertical: product.room === "kitchen" ? "home_kitchen" : "home_living",
    baseAmazonUrl: `https://www.amazon.com/dp/${product.asin}`,
    trackingId,
    mainProblem: product.problem,
    targetUser: product.user,
  };

  products.push(newProduct);

  // Save
  await fs.writeFile(discoveryFile, JSON.stringify(products, null, 2), "utf8");

  console.log(`✅ Added product: ${product.title} (${product.asin})`);
  console.log(`📝 Updated: ai/discoveryInput.json`);
  console.log(`\n💡 Next step: Run 'npm run import:discovery' to add to site`);
}

addProductManually().catch(console.error);
