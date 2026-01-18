// ai/landingPageAgent.ts
import "dotenv/config";
import { openai } from "./client";
import type { CandidateProduct } from "./types";

export type LandingCopy = {
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

export async function generateLandingPageContent(
  product: CandidateProduct
): Promise<LandingCopy> {
  const systemPrompt = `
Write landing page copy for a Meta Ad → Landing Page → Amazon funnel.
Be problem-first. Avoid hype. Provide useful, concrete details.
Tone: helpful, practical, neutral.
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
