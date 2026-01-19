import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

// ---------------- Types ----------------

type RawCandidate = {
  asin?: string;
  baseAmazonUrl: string;
  vertical: string;
  name: string;
  targetUser?: string;
  keyProblem?: string;
  hints?: {
    estimatedPrice?: number;
    primeEligible?: boolean;
    ratingBucket?: string;
    reviewsBucket?: string;
  };
  source?: {
    origin?: string;
    notes?: string;
  };
};

type RawCandidatesFile = {
  schemaVersion: "1.0";
  defaults?: {
    trackingId?: string;
    market?: string;
  };
  items: RawCandidate[];
};

type CandidateProduct = {
  id: string;
  slug: string;
  vertical: string;
  name: string;
  baseAmazonUrl: string;
  trackingId: string;
  targetUser: string;
  keyProblem: string;
  angle?: string;
};

type SelectionScore = {
  score: number; // 0-100
  tier: "A" | "B" | "C" | "D";
  decision: "approve" | "hold" | "reject";
  reasons: string[];
  risks: string[];
  angles: string[]; // 3-5 angles
};

type CandidateItemV1 = {
  candidate: CandidateProduct;
  selection: {
    score: number;
    tier: "A" | "B" | "C" | "D";
    decision: "approve" | "hold" | "reject";
    reasons: string[];
    risks?: string[];
    selectedAt: string;
    selectedBy: string;
  };
  testPlan?: {
    priority?: number;
    angles?: string[];
    variantsToGenerate?: number;
  };
  lifecycle?: {
    status: "queued";
    createdAt: string;
    expiresAt?: string;
  };
};

type CandidatesFileV1 = {
  schemaVersion: "1.0";
  generatedAt: string;
  runId: string;
  defaults?: {
    trackingId?: string;
    market?: string;
  };
  items: CandidateItemV1[];
};

// ---------------- OpenAI ----------------

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY not set. Put it in .env.local at the project root.");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------------- Helpers ----------------

async function readJsonFile<T>(relativePath: string): Promise<T> {
  const fullPath = path.join(process.cwd(), relativePath);
  const content = await fs.readFile(fullPath, "utf8");
  return JSON.parse(content) as T;
}

async function writeJsonFile<T>(relativePath: string, data: T): Promise<void> {
  const fullPath = path.join(process.cwd(), relativePath);
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(fullPath, json, "utf8");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function stableIdFrom(candidate: RawCandidate): string {
  // Prefer ASIN when available; otherwise derive from URL/name
  const asin = candidate.asin?.trim();
  if (asin) return `asin-${asin.toLowerCase()}`;
  const urlPart = slugify(candidate.baseAmazonUrl);
  const namePart = slugify(candidate.name);
  return `cand-${namePart}-${urlPart}`.slice(0, 80);
}

function hardRejectReasons(c: RawCandidate): string[] {
  const reasons: string[] = [];

  const price = c.hints?.estimatedPrice;
  if (typeof price === "number") {
    if (price < 15) reasons.push("Estimated price too low (< $15): often low AOV / weak incentive.");
    if (price > 60) reasons.push("Estimated price too high (> $60): higher purchase friction for cold traffic.");
  }

  // Require a problem & audience for decent LLM scoring and copy generation
  if (!c.keyProblem || c.keyProblem.trim().length < 8) reasons.push("Missing or too-short keyProblem.");
  if (!c.targetUser || c.targetUser.trim().length < 5) reasons.push("Missing or too-short targetUser.");

  // URL sanity
  if (!c.baseAmazonUrl?.startsWith("http")) reasons.push("baseAmazonUrl missing/invalid.");

  return reasons;
}

function tierFromScore(score: number): "A" | "B" | "C" | "D" {
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  return "D";
}

// ---------------- LLM scoring ----------------

async function scoreCandidate(c: RawCandidate): Promise<SelectionScore> {
  const systemPrompt = `
You are selecting products to test via Meta ads → landing page → Amazon affiliate.
Score candidates for: impulse-buy likelihood, visual before/after potential, clarity of problem-solution, breadth of audience, and ease of messaging.

Return VALID JSON ONLY in this format:
{
  "score": 0,
  "tier": "A|B|C|D",
  "decision": "approve|hold|reject",
  "reasons": ["..."],
  "risks": ["..."],
  "angles": ["...", "...", "..."]
}

Rules:
- score is 0-100.
- "approve" typically >= 70, "hold" 55-69, "reject" < 55 (unless clear red flags).
- angles must be 3 to 5 distinct ad angles/hooks, non-hypey, problem-first.
- Avoid mentioning Amazon, reviews, star ratings.
- Be realistic and conservative.
`.trim();

  const userPrompt = `
Candidate:
Name: ${c.name}
Vertical: ${c.vertical}
Problem: ${c.keyProblem ?? ""}
Target user: ${c.targetUser ?? ""}
Hints: ${JSON.stringify(c.hints ?? {}, null, 0)}
Source notes: ${c.source?.notes ?? ""}
`.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  });

  const raw = completion.choices[0].message.content;
  if (!raw) throw new Error("Empty AI response from selection agent.");

  const parsed = JSON.parse(raw) as SelectionScore;

  // Defensive normalization
  parsed.reasons ??= [];
  parsed.risks ??= [];
  parsed.angles ??= [];
  parsed.score = Number.isFinite(parsed.score) ? parsed.score : 0;
  parsed.tier = tierFromScore(parsed.score);
  if (!["approve", "hold", "reject"].includes(parsed.decision)) {
    parsed.decision = parsed.score >= 70 ? "approve" : parsed.score >= 55 ? "hold" : "reject";
  }

  // Enforce 3-5 angles
  parsed.angles = parsed.angles.filter(Boolean).slice(0, 5);
  while (parsed.angles.length < 3) parsed.angles.push("Reduce friction: make the solution feel simple and immediate.");

  return parsed;
}

// ---------------- Main ----------------

async function main() {
  const raw = await readJsonFile<RawCandidatesFile>("ai/raw_candidates.json");

  if (!raw?.items || !Array.isArray(raw.items) || raw.items.length === 0) {
    console.log("No items found in ai/raw_candidates.json");
    return;
  }

  const trackingIdDefault = raw.defaults?.trackingId ?? "yourtag-20";

  // Config knobs (tweak freely)
  const TOP_N_PRODUCTS = 10;          // how many base products to approve
  const VARIANTS_PER_PRODUCT = 3;     // create one candidate per angle (up to this many)
  const EXPIRE_DAYS = 14;

  const evaluated: Array<{
    raw: RawCandidate;
    hardRejects: string[];
    score?: SelectionScore;
    baseId: string;
  }> = [];

  // 1) Hard filters
  for (const c of raw.items) {
    const baseId = stableIdFrom(c);
    const hardRejects = hardRejectReasons(c);
    evaluated.push({ raw: c, hardRejects, baseId });
  }

  // 2) LLM scoring for those that pass hard filters
  for (const e of evaluated) {
    if (e.hardRejects.length > 0) continue;
    e.score = await scoreCandidate(e.raw);
    console.log(`Scored: ${e.raw.name} → ${e.score.score} (${e.score.decision})`);
  }

  // 3) Rank & select approved base products
  const approvedBase = evaluated
    .filter((e) => e.hardRejects.length === 0 && e.score?.decision === "approve")
    .sort((a, b) => (b.score!.score - a.score!.score))
    .slice(0, TOP_N_PRODUCTS);

  // 4) Expand into variants (one per angle), output candidates.json (structured)
  const now = new Date();
  const expiresAt = new Date(now.getTime() + EXPIRE_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const items: CandidateItemV1[] = [];

  for (let i = 0; i < approvedBase.length; i++) {
    const e = approvedBase[i];
    const s = e.score!;
    const angles = s.angles.slice(0, VARIANTS_PER_PRODUCT);

    for (let v = 0; v < angles.length; v++) {
      const angle = angles[v];
      const baseSlug = slugify(e.raw.name);
      const variantSlug = `${baseSlug}-v${v + 1}`;
      const candidate: CandidateProduct = {
        id: `${e.baseId}-v${v + 1}`,
        slug: variantSlug,
        vertical: e.raw.vertical,
        name: e.raw.name,
        baseAmazonUrl: e.raw.baseAmazonUrl,
        trackingId: trackingIdDefault,
        targetUser: e.raw.targetUser ?? "general audience",
        keyProblem: e.raw.keyProblem ?? "a common, frustrating daily problem",
        angle
      };

      items.push({
        candidate,
        selection: {
          score: s.score,
          tier: s.tier,
          decision: s.decision,
          reasons: s.reasons,
          risks: s.risks,
          selectedAt: now.toISOString(),
          selectedBy: "agent:product-selection-v1"
        },
        testPlan: {
          priority: i + 1,
          angles: angles,
          variantsToGenerate: angles.length
        },
        lifecycle: {
          status: "queued",
          createdAt: now.toISOString(),
          expiresAt
        }
      });
    }
  }

  // Also print holds/rejects summary to console (useful debugging)
  const hardRejected = evaluated.filter((e) => e.hardRejects.length > 0);
  const held = evaluated.filter((e) => e.hardRejects.length === 0 && e.score?.decision === "hold");
  const rejected = evaluated.filter((e) => e.hardRejects.length === 0 && e.score?.decision === "reject");

  console.log("\n--- Summary ---");
  console.log(`Total raw candidates: ${evaluated.length}`);
  console.log(`Hard rejected: ${hardRejected.length}`);
  console.log(`LLM rejected: ${rejected.length}`);
  console.log(`Held: ${held.length}`);
  console.log(`Approved base products: ${approvedBase.length}`);
  console.log(`Output variants (items): ${items.length}`);

  const out: CandidatesFileV1 = {
    schemaVersion: "1.0",
    generatedAt: now.toISOString(),
    runId: `select-${now.toISOString().slice(0, 16).replace(/[:T]/g, "-")}`,
    defaults: raw.defaults ?? { trackingId: trackingIdDefault },
    items
  };

  await writeJsonFile("ai/candidates.json", out);
  console.log("\nWrote ai/candidates.json (structured). Next: run `npm run ai:pipeline`.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
