// ai/runCreativeGenerator.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";
import { generateCreativeAngles, type CreativeAngles } from "./creativeAngleAgent";

type Product = {
  id: string;
  slug: string;
  name: string;
  angle?: string;
  content: {
    painBullets: string[];
    whoItsFor: string[];
  };
};

const CREATIVES_FILE = path.join(process.cwd(), "data", "creatives.json");

async function readCreatives(): Promise<CreativeAngles[]> {
  try {
    const content = await fs.readFile(CREATIVES_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeCreatives(creatives: CreativeAngles[]): Promise<void> {
  await fs.writeFile(CREATIVES_FILE, JSON.stringify(creatives, null, 2), "utf8");
}

async function readProducts(): Promise<Product[]> {
  try {
    const productsFile = path.join(process.cwd(), "data", "products.json");
    const content = await fs.readFile(productsFile, "utf8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function main() {
  const products = await readProducts();

  if (products.length === 0) {
    console.log("No products found. Run `npm run ai:pipeline` first.");
    return;
  }

  const existingCreatives = await readCreatives();
  const existingProductIds = new Set(existingCreatives.map((c) => c.productId));

  console.log(`\n=== Creative Angle Generator ===\n`);
  console.log(`Found ${products.length} products`);
  console.log(`${existingProductIds.size} already have creatives\n`);

  const newCreatives: CreativeAngles[] = [];

  for (const product of products) {
    // Skip if already generated
    if (existingProductIds.has(product.id)) {
      console.log(`⏭️  Skipping ${product.name} (already has creatives)`);
      continue;
    }

    console.log(`\n🎨 Generating creatives for: ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Angle: ${product.angle || "none"}`);

    try {
      // Extract problem and target user from product content
      const keyProblem = product.content.painBullets[0] || "common problem";
      const targetUser = product.content.whoItsFor[0] || "general audience";

      const angles = await generateCreativeAngles(
        product.name,
        keyProblem,
        targetUser,
        product.angle
      );

      const creative: CreativeAngles = {
        productId: product.id,
        productName: product.name,
        angles,
        generatedAt: new Date().toISOString(),
      };

      newCreatives.push(creative);
      console.log(`   ✅ Generated ${angles.length} ad angles`);
    } catch (error) {
      console.error(`   ❌ Error: ${error}`);
      continue;
    }
  }

  if (newCreatives.length > 0) {
    // Merge with existing
    const allCreatives = [...existingCreatives, ...newCreatives];
    await writeCreatives(allCreatives);
    console.log(`\n✅ Saved ${newCreatives.length} new creative sets to data/creatives.json`);
    console.log(`   Total: ${allCreatives.length} products with creatives`);
  } else {
    console.log(`\n✅ All products already have creatives.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
