// ai/runPipeline.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { supabase, isDatabaseAvailable } from "../lib/db";

// ---------- Types ----------

type CandidateProduct = {
  id: string;
  slug: string;
  vertical: string;
  name: string;
  baseAmazonUrl: string;
  trackingId: string;
  targetUser: string;
  keyProblem: string;
  angle?: string; // NEW
};

type CandidateItemV1 = {
  candidate: CandidateProduct;
  selection?: {
    score: number;
    tier?: "A" | "B" | "C" | "D";
    decision?: "approve" | "hold" | "reject";
    reasons?: string[];
    risks?: string[];
    selectedAt?: string;
    selectedBy?: string;
  };
  testPlan?: {
    priority?: number;
    angles?: string[];
    variantsToGenerate?: number;
  };
  lifecycle?: {
    status?: "queued" | "generated" | "skipped";
    createdAt?: string;
    expiresAt?: string;
  };
};

type CandidatesFileV1 = {
  schemaVersion: "1.0";
  generatedAt?: string;
  runId?: string;
  defaults?: {
    trackingId?: string;
    market?: string;
    currency?: string;
  };
  items: CandidateItemV1[];
};

type CandidatesInput = CandidateProduct[] | CandidatesFileV1;



type LandingCopy = {
  shortDescription: string;
  headline: string;
  subheadline: string;
  painBullets: string[];
  howItWorks: string[];
  whoItsFor: string[];
  whoItsNotFor: string[];
  ctaText: string;
  faq: { q: string; a: string }[];
  priceNote: string;
};

type Product = {
  id: string;
  slug: string;
  vertical: string;
  name: string;
  angle?: string;
  shortDescription: string;
  heroImage?: string;
  priceNote?: string;
  amazon: {
    url: string;
    trackingId: string;
  };
  content: {
    headline: string;
    subheadline: string;
    painBullets: string[];
    howItWorks: string[];
    whoItsFor: string[];
    whoItsNotFor: string[];
    ctaText: string;
    faq: { q: string; a: string }[];
  };
  disclosures: {
    affiliate: string;
  };
  status: "testing" | "winner" | "killed";
};

// ---------- OpenAI client ----------

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY not set. Put it in .env.local at the project root."
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---------- Helpers ----------

async function readJsonFile<T>(
  relativePath: string,
  defaultValue: T
): Promise<T> {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    const content = await fs.readFile(fullPath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    return defaultValue;
  }
}

async function writeJsonFile<T>(
  relativePath: string,
  data: T
): Promise<void> {
  const fullPath = path.join(process.cwd(), relativePath);
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(fullPath, json, "utf8");
}

// ---------- Landing page generator (inline agent) ----------

async function generateLandingPageContent(
  product: CandidateProduct
): Promise<LandingCopy> {
  const systemPrompt = `
Write landing page copy for a Meta Ad → Landing Page → Amazon funnel.
Be problem-first. Avoid hype. Provide useful, concrete details.
Tone: helpful, practical, neutral.
Use the provided ANGLE as the primary framing.
Make the headline + first 2 pain bullets strongly reflect the angle.
DO NOT mention reviews, star ratings, or Amazon directly.
Output VALID JSON ONLY in this format:
{
  "shortDescription": "",
  "headline": "",
  "subheadline": "",
  "painBullets": [],
  "howItWorks": [],
  "whoItsFor": [],
  "whoItsNotFor": [],
  "ctaText": "",
  "faq": [{"q": "", "a": ""}],
  "priceNote": ""
}
`;

 const userPrompt = `
Product: ${product.name}
Problem: ${product.keyProblem}
Audience: ${product.targetUser}
ANGLE: ${product.angle ?? "general problem/solution framing"}
`;


  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const raw = completion.choices[0].message.content;
  if (!raw) throw new Error("Empty AI response from landing page agent");

  const parsed = JSON.parse(raw) as LandingCopy;

  parsed.painBullets ??= [];
  parsed.howItWorks ??= [];
  parsed.whoItsFor ??= [];
  parsed.whoItsNotFor ??= [];
  parsed.faq ??= [];

  return parsed;
}

function normalizeCandidates(input: CandidatesInput): CandidateProduct[] {
  if (Array.isArray(input)) return input;

  if (input && typeof input === "object" && Array.isArray(input.items)) {
    return input.items
      .map((it) => it?.candidate)
      .filter((c): c is CandidateProduct => !!c && typeof c.id === "string");
  }

  return [];
}


// ---------- Main pipeline ----------

async function main() {
  const candidatesRaw = await readJsonFile<CandidatesInput>(
  "ai/candidates.json",
  []
);

const candidates = normalizeCandidates(candidatesRaw);

  if (!Array.isArray(candidates) || candidates.length === 0) {
    console.log("No candidates found in ai/candidates.json");
    return;
  }

  // Check existing products (from database or JSON)
  let existingProducts: Product[] = [];
  if (supabase && (await isDatabaseAvailable())) {
    try {
      const { data, error } = await supabase.from("products").select("id");
      if (!error && data) {
        existingProducts = data.map((row) => ({ id: row.id } as Product));
      }
    } catch (error) {
      console.warn("Failed to check database, using JSON fallback:", error);
      existingProducts = await readJsonFile<Product[]>("data/products.json", []);
    }
  } else {
    existingProducts = await readJsonFile<Product[]>("data/products.json", []);
  }

  const newProducts: Product[] = [];

  for (const c of candidates) {
    if (!c || !c.id) continue;

    if (existingProducts.some((p) => p.id === c.id)) {
      console.log(`Skipping ${c.id} (already exists)`);
      continue;
    }

    console.log(`\n=== Generating landing page for ${c.name} (${c.id}) ===`);

    const copy = await generateLandingPageContent(c);

    // Extract ASIN from baseAmazonUrl or ID
    const asinMatch = c.baseAmazonUrl.match(/\/dp\/([A-Z0-9]{10})/i) || c.id.match(/asin-([a-z0-9]{10})/i);
    const asin = asinMatch ? asinMatch[1].toUpperCase() : null;
    
    // Build Amazon product image URL
    // Amazon Product Images: We'll use a high-quality approach
    // Since direct ASIN-to-image mapping requires API access, we'll use:
    // 1. High-quality Unsplash images for product categories (better than static placeholders)
    // 2. These are professional, high-resolution images that match the product category
    const getHeroImage = (vertical: string, asin: string | null) => {
      if (vertical === "home_kitchen") {
        // High-quality kitchen/product images from Unsplash
        const kitchenImages = [
          "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=800&fit=crop&q=90", // Kitchen organization
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=90", // Kitchen tools
          "https://images.unsplash.com/photo-1556910103-4d0c8c8c8c8c?w=1200&h=800&fit=crop&q=90", // Kitchen accessories
        ];
        // Use ASIN to deterministically pick an image (so same product gets same image)
        const index = asin ? parseInt(asin.slice(-1), 16) % kitchenImages.length : 0;
        return kitchenImages[index];
      }
      // Fallback for other categories
      return "/images/drawer-organizer.jpg";
    };
    
    const heroImage = getHeroImage(c.vertical, asin);
    
    // Build clean Amazon URL with ASIN (remove any existing params)
    const cleanAmazonUrl = asin 
      ? `https://www.amazon.com/dp/${asin}`
      : c.baseAmazonUrl.split('?')[0]; // Remove query params if any

    const fullProduct: Product = {
      id: c.id,
      slug: c.slug,
      vertical: c.vertical,
      name: c.name,
      angle: c.angle,
      shortDescription: copy.shortDescription,
      heroImage: heroImage,
      priceNote: copy.priceNote,
      amazon: {
        url: cleanAmazonUrl,
        trackingId: c.trackingId,
      },
      content: {
        headline: copy.headline,
        subheadline: copy.subheadline,
        painBullets: copy.painBullets,
        howItWorks: copy.howItWorks,
        whoItsFor: copy.whoItsFor,
        whoItsNotFor: copy.whoItsNotFor,
        ctaText: copy.ctaText,
        faq: copy.faq,
      },
      disclosures: {
        affiliate: "As an Amazon Associate, we earn from qualifying purchases.",
      },
      status: "testing",
    };

    newProducts.push(fullProduct);
    console.log(`Added product: ${c.slug}`);
  }

  // Write to database or JSON
  if (supabase && (await isDatabaseAvailable()) && newProducts.length > 0) {
    try {
      const dbRows = newProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        vertical: p.vertical,
        name: p.name,
        angle: p.angle || null,
        short_description: p.shortDescription,
        hero_image: p.heroImage || null,
        price_note: p.priceNote || null,
        amazon_url: p.amazon.url,
        amazon_tracking_id: p.amazon.trackingId,
        headline: p.content.headline,
        subheadline: p.content.subheadline,
        pain_bullets: p.content.painBullets,
        how_it_works: p.content.howItWorks,
        who_its_for: p.content.whoItsFor,
        who_its_not_for: p.content.whoItsNotFor,
        cta_text: p.content.ctaText,
        faq: p.content.faq,
        affiliate_disclosure: p.disclosures.affiliate,
        status: p.status,
      }));

      const { error } = await supabase.from("products").insert(dbRows);
      if (error) throw error;

      console.log(`\n✅ Saved ${newProducts.length} product(s) to database.`);
    } catch (error) {
      console.error("Failed to save to database, using JSON fallback:", error);
      const allProducts = [...existingProducts, ...newProducts];
      await writeJsonFile("data/products.json", allProducts);
      console.log(`\nUpdated data/products.json with ${allProducts.length} product(s).`);
    }
  } else {
    const allProducts = [...existingProducts, ...newProducts];
    await writeJsonFile("data/products.json", allProducts);
    console.log(`\nUpdated data/products.json with ${allProducts.length} product(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
