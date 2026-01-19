// ai/runPipeline.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

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

  const products = await readJsonFile<Product[]>("data/products.json", []);

  for (const c of candidates) {
    if (!c || !c.id) continue;

    if (products.some((p) => p.id === c.id)) {
      console.log(`Skipping ${c.id} (already exists in data/products.json)`);
      continue;
    }

    console.log(`\n=== Generating landing page for ${c.name} (${c.id}) ===`);

    const copy = await generateLandingPageContent(c);

    const fullProduct: Product = {
      id: c.id,
      slug: c.slug,
      vertical: c.vertical,
      name: c.name,
      angle: c.angle,
      shortDescription: copy.shortDescription,
      heroImage: "/images/drawer-organizer.jpg",
      priceNote: copy.priceNote,
      amazon: {
        url: c.baseAmazonUrl,
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

    products.push(fullProduct);
    console.log(`Added product: ${c.slug}`);
  }

  await writeJsonFile("data/products.json", products);
  console.log(`\nUpdated data/products.json with ${products.length} product(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
