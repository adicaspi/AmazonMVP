// ai/complianceAgent.ts
import "dotenv/config";
import { openai } from "./client";
import { supabase, isDatabaseAvailable } from "../lib/db";

export type ComplianceCheck = {
  productId: string;
  productName: string;
  checks: {
    medicalClaims: {
      passed: boolean;
      issues: string[];
      riskLevel: "low" | "medium" | "high";
    };
    affiliateDisclosure: {
      passed: boolean;
      issues: string[];
      riskLevel: "low" | "medium" | "high";
    };
    amazonTos: {
      passed: boolean;
      issues: string[];
      riskLevel: "low" | "medium" | "high";
    };
    generalCompliance: {
      passed: boolean;
      issues: string[];
      riskLevel: "low" | "medium" | "high";
    };
  };
  overallRisk: "low" | "medium" | "high";
  canPublish: boolean;
  recommendations: string[];
};

async function checkCompliance(product: any): Promise<ComplianceCheck> {
  const systemPrompt = `
You are a compliance and risk assessment expert for Amazon affiliate marketing.
Your job is to check landing page content for:
1. Medical/Health Claims - No unsubstantiated medical claims
2. Affiliate Disclosure - Must be clear and visible
3. Amazon TOS Compliance - Must comply with Amazon's terms
4. General Compliance - No misleading claims, false promises, etc.

Output VALID JSON ONLY in this format:
{
  "checks": {
    "medicalClaims": {
      "passed": true/false,
      "issues": ["issue 1", "issue 2"],
      "riskLevel": "low" | "medium" | "high"
    },
    "affiliateDisclosure": {
      "passed": true/false,
      "issues": ["issue 1"],
      "riskLevel": "low" | "medium" | "high"
    },
    "amazonTos": {
      "passed": true/false,
      "issues": ["issue 1"],
      "riskLevel": "low" | "medium" | "high"
    },
    "generalCompliance": {
      "passed": true/false,
      "issues": ["issue 1"],
      "riskLevel": "low" | "medium" | "high"
    }
  },
  "overallRisk": "low" | "medium" | "high",
  "canPublish": true/false,
  "recommendations": ["recommendation 1", "recommendation 2"]
}
`;

  const userPrompt = `
Product: ${product.name}
Headline: ${product.headline}
Subheadline: ${product.subheadline}
Pain Bullets: ${JSON.stringify(product.pain_bullets || [])}
How It Works: ${JSON.stringify(product.how_it_works || [])}
Who It's For: ${JSON.stringify(product.who_its_for || [])}
FAQ: ${JSON.stringify(product.faq || [])}
Affiliate Disclosure: ${product.affiliate_disclosure || "Not found"}

Check this content for compliance issues. Be strict but fair.
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
  if (!raw) throw new Error("Empty AI response from compliance agent");

  const parsed = JSON.parse(raw) as ComplianceCheck;

  return {
    productId: product.id,
    productName: product.name,
    checks: parsed.checks,
    overallRisk: parsed.overallRisk,
    canPublish: parsed.canPublish,
    recommendations: parsed.recommendations,
  };
}

export async function runComplianceAgent(
  productIds?: string[]
): Promise<ComplianceCheck[]> {
  console.log("\n🛡️  Compliance & Risk Agent\n");

  if (!supabase || !(await isDatabaseAvailable())) {
    throw new Error("Database not available");
  }

  // Get products to check
  let query = supabase
    .from("products")
    .select(
      "id, name, headline, subheadline, pain_bullets, how_it_works, who_its_for, faq, affiliate_disclosure"
    );

  if (productIds && productIds.length > 0) {
    query = query.in("id", productIds);
  } else {
    // Check all products in "testing" status
    query = query.eq("status", "testing");
  }

  const { data: products, error } = await query;

  if (error || !products) {
    throw new Error("Failed to fetch products");
  }

  console.log(`📋 Checking ${products.length} products for compliance...\n`);

  const results: ComplianceCheck[] = [];

  for (const product of products) {
    console.log(`\n🔍 Checking: ${product.name}`);

    try {
      const check = await checkCompliance(product);
      results.push(check);

      const status = check.canPublish ? "✅ PASSED" : "❌ FAILED";
      console.log(`   ${status} - Risk: ${check.overallRisk.toUpperCase()}`);

      if (check.recommendations.length > 0) {
        console.log(`   💡 Recommendations:`);
        check.recommendations.forEach((rec) => console.log(`      - ${rec}`));
      }

      if (!check.canPublish) {
        console.log(`   ⚠️  Issues found:`);
        Object.entries(check.checks).forEach(([key, value]) => {
          if (!value.passed && value.issues.length > 0) {
            console.log(`      ${key}: ${value.issues.join(", ")}`);
          }
        });
      }
    } catch (error) {
      console.error(`   ❌ Error checking ${product.name}:`, error);
    }
  }

  const passed = results.filter((r) => r.canPublish).length;
  const failed = results.filter((r) => !r.canPublish).length;

  console.log(`\n✅ Compliance check completed.`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);

  return results;
}
