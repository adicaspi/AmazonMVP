// ai/decisionEngineAgent.ts
import "dotenv/config";
import { openai } from "./client";
import { supabase, isDatabaseAvailable } from "../lib/db";

export type ProductPerformance = {
  productId: string;
  productName: string;
  slug: string;
  angle?: string;
  views: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  daysInTesting: number;
  status: "testing" | "winner" | "killed";
};

export type DecisionResult = {
  productId: string;
  productName: string;
  currentStatus: string;
  newStatus: "testing" | "winner" | "killed";
  reason: string;
  metrics: {
    views: number;
    clicks: number;
    ctr: number;
    conversionRate: number;
  };
  confidence: "high" | "medium" | "low";
};

const MIN_VIEWS_FOR_DECISION = 100; // Minimum views before making a decision
const MIN_DAYS_IN_TESTING = 3; // Minimum days in testing
const WINNER_CTR_THRESHOLD = 3.0; // CTR % to be considered winner
const KILLED_CTR_THRESHOLD = 1.0; // CTR % below which to kill

async function getProductPerformance(): Promise<ProductPerformance[]> {
  if (!supabase || !(await isDatabaseAvailable())) {
    throw new Error("Database not available");
  }

  // Get all products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, slug, name, angle, status, created_at");

  if (productsError || !products) {
    throw new Error("Failed to fetch products");
  }

  // Get events for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("product_id, type, timestamp")
    .gte("timestamp", thirtyDaysAgo.toISOString());

  if (eventsError) {
    throw new Error("Failed to fetch events");
  }

  // Calculate metrics for each product
  const performance: ProductPerformance[] = products.map((product) => {
    const productEvents = events?.filter((e) => e.product_id === product.id) || [];
    const views = productEvents.filter((e) => e.type === "view").length;
    const clicks = productEvents.filter((e) => e.type === "click").length;
    const conversions = productEvents.filter((e) => e.type === "conversion").length;

    const ctr = views > 0 ? (clicks / views) * 100 : 0;
    const conversionRate = views > 0 ? (conversions / views) * 100 : 0;

    const createdAt = new Date(product.created_at);
    const daysInTesting = Math.floor(
      (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      angle: product.angle || undefined,
      views,
      clicks,
      conversions,
      ctr,
      conversionRate,
      daysInTesting,
      status: product.status as "testing" | "winner" | "killed",
    };
  });

  return performance;
}

async function makeDecisionWithAI(
  performance: ProductPerformance
): Promise<DecisionResult> {
  const systemPrompt = `
You are a data-driven decision engine for an Amazon affiliate marketing funnel.
Your job is to analyze product performance and decide whether to:
- Mark as "winner" (if performing well)
- Mark as "killed" (if performing poorly)
- Keep as "testing" (if needs more data)

Consider:
- CTR (Click-Through Rate) - higher is better
- Conversion rate - higher is better
- Number of views - need enough data
- Days in testing - need enough time

Output VALID JSON ONLY in this format:
{
  "newStatus": "testing" | "winner" | "killed",
  "reason": "Brief explanation of decision",
  "confidence": "high" | "medium" | "low"
}
`;

  const userPrompt = `
Product: ${performance.productName}
Current Status: ${performance.status}
Days in Testing: ${performance.daysInTesting}
Views: ${performance.views}
Clicks: ${performance.clicks}
CTR: ${performance.ctr.toFixed(2)}%
Conversion Rate: ${performance.conversionRate.toFixed(2)}%
Angle: ${performance.angle || "none"}

Thresholds:
- Minimum views for decision: ${MIN_VIEWS_FOR_DECISION}
- Minimum days in testing: ${MIN_DAYS_IN_TESTING}
- Winner CTR threshold: ${WINNER_CTR_THRESHOLD}%
- Killed CTR threshold: ${KILLED_CTR_THRESHOLD}%

Make a decision based on this data.
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
  if (!raw) throw new Error("Empty AI response from decision engine");

  const parsed = JSON.parse(raw) as {
    newStatus: "testing" | "winner" | "killed";
    reason: string;
    confidence: "high" | "medium" | "low";
  };

  // Apply business rules
  let finalStatus = parsed.newStatus;

  // Rule: Need minimum views
  if (performance.views < MIN_VIEWS_FOR_DECISION) {
    finalStatus = "testing";
  }

  // Rule: Need minimum days
  if (performance.daysInTesting < MIN_DAYS_IN_TESTING) {
    finalStatus = "testing";
  }

  // Rule: High CTR = winner
  if (performance.ctr >= WINNER_CTR_THRESHOLD && performance.views >= MIN_VIEWS_FOR_DECISION) {
    finalStatus = "winner";
  }

  // Rule: Very low CTR = killed
  if (performance.ctr < KILLED_CTR_THRESHOLD && performance.views >= MIN_VIEWS_FOR_DECISION) {
    finalStatus = "killed";
  }

  return {
    productId: performance.productId,
    productName: performance.productName,
    currentStatus: performance.status,
    newStatus: finalStatus,
    reason: parsed.reason,
    metrics: {
      views: performance.views,
      clicks: performance.clicks,
      ctr: performance.ctr,
      conversionRate: performance.conversionRate,
    },
    confidence: parsed.confidence,
  };
}

export async function runDecisionEngine(): Promise<DecisionResult[]> {
  console.log("\n🤖 Decision Engine Agent\n");

  const performance = await getProductPerformance();
  console.log(`📊 Analyzing ${performance.length} products...\n`);

  const decisions: DecisionResult[] = [];

  for (const perf of performance) {
    // Skip if already decided (winner/killed)
    if (perf.status !== "testing") {
      console.log(`⏭️  Skipping ${perf.productName} (status: ${perf.status})`);
      continue;
    }

    // Skip if not enough data
    if (perf.views < MIN_VIEWS_FOR_DECISION || perf.daysInTesting < MIN_DAYS_IN_TESTING) {
      console.log(
        `⏳ ${perf.productName}: Need more data (${perf.views} views, ${perf.daysInTesting} days)`
      );
      continue;
    }

    console.log(`\n🔍 Analyzing: ${perf.productName}`);
    console.log(`   Views: ${perf.views}, Clicks: ${perf.clicks}, CTR: ${perf.ctr.toFixed(2)}%`);

    try {
      const decision = await makeDecisionWithAI(perf);
      decisions.push(decision);

      if (decision.newStatus !== decision.currentStatus) {
        console.log(`   ✅ Decision: ${decision.currentStatus} → ${decision.newStatus}`);
        console.log(`   📝 Reason: ${decision.reason}`);
        console.log(`   🎯 Confidence: ${decision.confidence}`);

        // Update status in database
        if (supabase && (await isDatabaseAvailable())) {
          const { error } = await supabase
            .from("products")
            .update({ status: decision.newStatus })
            .eq("id", decision.productId);

          if (error) {
            console.error(`   ❌ Failed to update status: ${error.message}`);
          } else {
            console.log(`   ✅ Status updated in database`);
          }
        }
      } else {
        console.log(`   ℹ️  No change needed (${decision.currentStatus})`);
      }
    } catch (error) {
      console.error(`   ❌ Error analyzing ${perf.productName}:`, error);
    }
  }

  console.log(`\n✅ Decision Engine completed. ${decisions.length} products analyzed.`);

  return decisions;
}
