// scripts/replace-products-with-asins.ts
// Replace all products using ASINs directly (faster than URLs)
import fs from "fs/promises";
import path from "path";
import { buildAmazonURLFromASIN, isValidASIN } from "../lib/amazon-links";

type ProductInfo = {
  asin: string;
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
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

/**
 * Generate tags from title and room
 */
function generateTags(title: string, room: string): string[] {
  const tags = new Set<string>();
  const text = `${title} ${room}`.toLowerCase();
  
  if (text.includes("organizer") || text.includes("organize")) tags.add("organization");
  if (text.includes("storage")) tags.add("storage");
  if (text.includes("bamboo")) tags.add("bamboo");
  if (text.includes("silicone")) tags.add("silicone");
  if (text.includes("kitchen")) tags.add("kitchen-essentials");
  if (text.includes("drawer")) tags.add("drawer-organization");
  if (text.includes("food")) tags.add("food-storage");
  if (text.includes("eco") || text.includes("reusable")) tags.add("eco-friendly");
  if (text.includes("basket")) tags.add("baskets");
  if (text.includes("shelf")) tags.add("wall-mounted");
  
  return Array.from(tags).slice(0, 4);
}

/**
 * Replace all products with new ones from ASINs
 */
async function replaceAllProducts(products: ProductInfo[]) {
  const productsFile = path.join(process.cwd(), "lib/products-data.ts");
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

  console.log(`\n🔄 Replacing all products with ${products.length} real products...\n`);

  const newProducts: any[] = [];
  const errors: string[] = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const asin = product.asin.toUpperCase();

    console.log(`[${i + 1}/${products.length}] Processing: ${asin}`);

    if (!isValidASIN(asin)) {
      errors.push(`Invalid ASIN: ${asin}`);
      console.log(`  ❌ Invalid ASIN: ${asin}`);
      continue;
    }

    const title = product.title || `Product ${asin}`;
    const slug = generateSlug(title);
    const room = product.room || "kitchen";
    const tags = product.tags || generateTags(title, room);
    const amazonUrl = buildAmazonURLFromASIN(asin, trackingId);

    const newProduct = {
      id: asin,
      slug: slug,
      title: title,
      benefitTitle: title,
      room: room,
      tags: tags,
      shortDescription: `${title} solves a common home organization problem.`,
      whyWePickedIt: `We selected this because it solves a common problem for ${product.targetUser || "people looking to organize their home"}. With ${product.rating || 4.5} stars and ${product.reviews || 1000}+ reviews, it's a proven solution that delivers real value.`,
      image: `https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format`,
      amazonUrl: amazonUrl,
      asin: asin,
      price: product.price || 24.99,
      highlights: [
        `High customer satisfaction (${product.rating || 4.5} stars)`,
        `${product.reviews || 1000}+ verified reviews`,
        `Solves ${product.mainProblem || "a common home organization problem"}`
      ],
      pros: [
        `Proven solution with ${product.reviews || 1000}+ reviews`,
        `High rating (${product.rating || 4.5} stars)`,
        `Addresses ${product.mainProblem || "a common home organization problem"}`
      ],
      cons: [
        "May not fit all use cases",
        "Check dimensions before purchasing"
      ],
      specs: {
        "Rating": `${product.rating || 4.5} stars`,
        "Reviews": `${product.reviews || 1000}+`,
        "Price": `$${product.price || 24.99}`,
        "Target User": product.targetUser || "people looking to organize their home"
      },
      status: "published",
      featured: i < 3, // First 3 are featured
      dateAdded: new Date().toISOString().split('T')[0]
    };

    newProducts.push(newProduct);
    console.log(`  ✅ Added: ${title} (${asin})`);
  }

  if (newProducts.length === 0) {
    console.log(`\n❌ No products could be added.`);
    return;
  }

  // Read current products file
  let content = await fs.readFile(productsFile, "utf8");

  // Generate new products array code
  const productsCode = newProducts.map(p => {
    const escapedTitle = p.title.replace(/"/g, '\\"');
    const escapedBenefitTitle = p.benefitTitle.replace(/"/g, '\\"');
    const escapedShortDesc = p.shortDescription.replace(/"/g, '\\"');
    const escapedWhy = p.whyWePickedIt.replace(/"/g, '\\"');
    const escapedHighlights = p.highlights.map((h: string) => h.replace(/"/g, '\\"'));
    const escapedPros = p.pros.map((pr: string) => pr.replace(/"/g, '\\"'));
    const escapedCons = p.cons.map((c: string) => c.replace(/"/g, '\\"'));
    const escapedTargetUser = p.specs["Target User"].replace(/"/g, '\\"');

    return `  {
    id: "${p.id}",
    slug: "${p.slug}",
    title: "${escapedTitle}",
    benefitTitle: "${escapedBenefitTitle}",
    room: "${p.room}",
    tags: [${p.tags.map((t: string) => `"${t}"`).join(", ")}],
    shortDescription: "${escapedShortDesc}",
    whyWePickedIt: "${escapedWhy}",
    image: "${p.image}",
    amazonUrl: "${p.amazonUrl}",
    asin: "${p.asin}",
    price: ${p.price},
    highlights: [
      "${escapedHighlights[0]}",
      "${escapedHighlights[1]}",
      "${escapedHighlights[2]}"
    ],
    pros: [
      "${escapedPros[0]}",
      "${escapedPros[1]}",
      "${escapedPros[2]}"
    ],
    cons: [
      "${escapedCons[0]}",
      "${escapedCons[1]}"
    ],
    specs: {
      "Rating": "${p.specs.Rating}",
      "Reviews": "${p.specs.Reviews}",
      "Price": "${p.specs.Price}",
      "Target User": "${escapedTargetUser}"
    },
    status: "published",
    featured: ${p.featured},
    dateAdded: "${p.dateAdded}"
  }`;
  }).join(",\n");

  // Replace products array
  content = content.replace(
    /export const products: Product\[\] = \[[\s\S]*?\];/,
    `export const products: Product[] = [\n${productsCode}\n];`
  );

  await fs.writeFile(productsFile, content, "utf8");

  console.log(`\n✅ Replaced all products!`);
  console.log(`   Added: ${newProducts.length} products`);
  console.log(`\n📝 Updated: lib/products-data.ts`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Open each Amazon URL and get real product info:`);
  newProducts.forEach((p, i) => {
    console.log(`      ${i + 1}. ${p.amazonUrl}`);
  });
  console.log(`   2. Update titles, prices, ratings in lib/products-data.ts`);
  console.log(`   3. Update images to be relevant`);
  console.log(`   4. Update mainProblem and targetUser`);
  console.log(`   5. Run: npm run build`);
}

// Read ASINs from command line or JSON file
async function main() {
  const input = process.argv[2];

  if (!input) {
    console.log("Usage:");
    console.log("  npm run replace:asins <asin1> <asin2> ... <asin12>");
    console.log("  OR");
    console.log("  npm run replace:asins products.json");
    console.log("\nExample:");
    console.log('  npm run replace:asins B09V5G395G B08YZ5YF7M ...');
    process.exit(1);
  }

  let products: ProductInfo[] = [];

  if (input.endsWith('.json')) {
    // Read from JSON file
    const content = await fs.readFile(input, "utf8");
    products = JSON.parse(content);
  } else {
    // Read from command line
    const asins = process.argv.slice(2);
    products = asins.map(asin => ({ asin: asin.trim() }));
  }

  await replaceAllProducts(products);
}

main().catch(console.error);
