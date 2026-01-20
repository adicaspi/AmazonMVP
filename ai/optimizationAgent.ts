// ai/optimizationAgent.ts
import "dotenv/config";
import { openai } from "./client";
import { supabase, isDatabaseAvailable } from "../lib/db";

export type OptimizationSuggestion = {
  productId: string;
  productName: string;
  currentMetrics: {
    views: number;
    clicks: number;
    ctr: number;
  };
  suggestions: {
    headline?: string;
    subheadline?: string;
    painBullets?: string[];
    ctaText?: string;
    reason: string;
  };
  expectedImprovement: string;
  confidence: "high" | "medium" | "low";
};

const MIN_VIEWS_FOR_OPTIMIZATION = 50; // Minimum views before suggesting optimizations
const LOW_CTR_THRESHOLD = 2.0; // CTR below which to suggest optimizations

async function getProductsNeedingOptimization() {
  if (!supabase || !(await isDatabaseAvailable())) {
    throw new Error("Database not available");
  }

  // Get products with low CTR
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, slug, name, headline, subheadline, pain_bullets, cta_text, status")
    .eq("status", "testing");

  if (productsError || !products) {
    throw new Error("Failed to fetch products");
  }

  // Get events for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("product_id, type")
    .gte("timestamp", thirtyDaysAgo.toISOString());

  if (eventsError) {
    throw new Error("Failed to fetch events");
  }

  // Calculate metrics and filter
  const productsNeedingOptimization = products
    .map((product) => {
      const productEvents = events?.filter((e) => e.product_id === product.id) || [];
      const views = productEvents.filter((e) => e.type === "view").length;
      const clicks = productEvents.filter((e) => e.type === "click").length;
      const ctr = views > 0 ? (clicks / views) * 100 : 0;

      return {
        product,
        views,
        clicks,
        ctr,
      };
    })
    .filter((p) => p.views >= MIN_VIEWS_FOR_OPTIMIZATION && p.ctr < LOW_CTR_THRESHOLD);

  return productsNeedingOptimization;
}

async function generateOptimizationSuggestions(
  product: any,
  metrics: { views: number; clicks: number; ctr: number }
): Promise<OptimizationSuggestion> {
  const systemPrompt = `
You are a conversion optimization expert for landing pages.
Your job is to analyze low-performing landing pages and suggest improvements.

Focus on:
- Headlines that are more compelling/problem-focused
- Subheadlines that better explain the value
- Pain bullets that resonate more
- CTA text that drives action

Output VALID JSON ONLY in this format:
{
  "suggestions": {
    "headline": "Improved headline (optional, only if needs improvement)",
    "subheadline": "Improved subheadline (optional)",
    "painBullets": ["bullet 1", "bullet 2", "bullet 3"],
    "ctaText": "Improved CTA text (optional)",
    "reason": "Why these changes will improve CTR"
  },
  "expectedImprovement": "Expected CTR improvement (e.g., '2-3% increase')",
  "confidence": "high" | "medium" | "low"
}
`;

  const userPrompt = `
Product: ${product.name}
Current Headline: ${product.headline}
Current Subheadline: ${product.subheadline}
Current Pain Bullets: ${JSON.stringify(product.pain_bullets || [])}
Current CTA: ${product.cta_text}

Performance:
- Views: ${metrics.views}
- Clicks: ${metrics.clicks}
- CTR: ${metrics.ctr.toFixed(2)}% (LOW - needs improvement)

Suggest optimizations to improve CTR. Focus on making the value proposition clearer and more compelling.
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
  if (!raw) throw new Error("Empty AI response from optimization agent");

  const parsed = JSON.parse(raw) as {
    suggestions: {
      headline?: string;
      subheadline?: string;
      painBullets?: string[];
      ctaText?: string;
      reason: string;
    };
    expectedImprovement: string;
    confidence: "high" | "medium" | "low";
  };

  return {
    productId: product.id,
    productName: product.name,
    currentMetrics: {
      views: metrics.views,
      clicks: metrics.clicks,
      ctr: metrics.ctr,
    },
    suggestions: parsed.suggestions,
    expectedImprovement: parsed.expectedImprovement,
    confidence: parsed.confidence,
  };
}

export async function runOptimizationAgent(): Promise<OptimizationSuggestion[]> {
  console.log("\n🚀 Optimization Agent\n");

  const productsNeedingOptimization = await getProductsNeedingOptimization();
  console.log(
    `📊 Found ${productsNeedingOptimization.length} products needing optimization...\n`
  );

  const suggestions: OptimizationSuggestion[] = [];

  for (const { product, views, clicks, ctr } of productsNeedingOptimization) {
    console.log(`\n🔍 Analyzing: ${product.name}`);
    console.log(`   Current CTR: ${ctr.toFixed(2)}% (${views} views, ${clicks} clicks)`);

    try {
      const suggestion = await generateOptimizationSuggestions(product, { views, clicks, ctr });
      suggestions.push(suggestion);

      console.log(`   ✅ Suggestions generated`);
      console.log(`   📝 Reason: ${suggestion.suggestions.reason}`);
      console.log(`   📈 Expected: ${suggestion.expectedImprovement}`);
      console.log(`   🎯 Confidence: ${suggestion.confidence}`);

      // Note: We don't auto-apply suggestions - user should review first
      // Suggestions can be saved to a file or displayed for review
    } catch (error) {
      console.error(`   ❌ Error optimizing ${product.name}:`, error);
    }
  }

  console.log(`\n✅ Optimization Agent completed. ${suggestions.length} suggestions generated.`);

  return suggestions;
}
