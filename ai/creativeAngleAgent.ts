// ai/creativeAngleAgent.ts
import "dotenv/config";
import { openai } from "./client";

export type AdAngle = {
  angle: string; // The main angle/hook (e.g., "Before/After", "Problem → Relief")
  hook: string; // First 2-3 seconds hook line
  primaryText: string; // Main ad copy (2-3 sentences)
  shotList: string[]; // Visual shot descriptions (3-5 shots)
  targetAudience: string; // Who this angle targets
  emotionalTrigger: string; // What emotion it triggers
};

export type CreativeAngles = {
  productId: string;
  productName: string;
  angles: AdAngle[];
  generatedAt: string;
};

export async function generateCreativeAngles(
  productName: string,
  keyProblem: string,
  targetUser: string,
  angle?: string
): Promise<AdAngle[]> {
  const systemPrompt = `
You are a Meta Ads creative strategist. Generate 5-10 distinct ad angles for a product.
Each angle should be scroll-stopping and problem-first.

Rules:
- NO mentions of Amazon, reviews, star ratings, "#1", "best seller"
- Focus on the PROBLEM first, then the solution
- Each angle must be visually distinct (different shot ideas)
- Hook lines must grab attention in first 2 seconds
- Be realistic, not hypey
- Think: What would make someone stop scrolling?

Output VALID JSON ONLY in this format:
{
  "angles": [
    {
      "angle": "Before/After",
      "hook": "Your kitchen drawer doesn't have to look like this.",
      "primaryText": "If utensils slide around every time you open the drawer, this organizer keeps everything in place. No more digging for the right tool.",
      "shotList": [
        "Close-up of messy drawer with utensils scattered",
        "Hand placing organizer into drawer",
        "Wide shot of organized drawer with everything in place"
      ],
      "targetAudience": "Busy home cooks frustrated with cluttered drawers",
      "emotionalTrigger": "Relief from daily frustration"
    }
  ]
}

Generate 5-10 angles. Include variety:
- Before/After
- Problem → Relief
- "Didn't know this existed"
- Time-saving
- Visual transformation
- Pain point focus
`.trim();

  const userPrompt = `
Product: ${productName}
Problem: ${keyProblem}
Target User: ${targetUser}
${angle ? `Current Angle: ${angle}` : ""}

Generate 5-10 distinct ad angles with hooks, copy, and shot lists.
`.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const raw = completion.choices[0].message.content;
  if (!raw) throw new Error("Empty AI response from creative angle agent");

  const parsed = JSON.parse(raw) as { angles: AdAngle[] };

  // Validate and normalize
  parsed.angles ??= [];
  parsed.angles = parsed.angles.map((angle) => ({
    angle: angle.angle || "General angle",
    hook: angle.hook || "Hook line",
    primaryText: angle.primaryText || "Ad copy",
    shotList: angle.shotList || [],
    targetAudience: angle.targetAudience || targetUser,
    emotionalTrigger: angle.emotionalTrigger || "Interest",
  }));

  // Ensure we have at least 5 angles
  while (parsed.angles.length < 5) {
    parsed.angles.push({
      angle: `Angle ${parsed.angles.length + 1}`,
      hook: "Hook line",
      primaryText: "Ad copy",
      shotList: ["Shot 1", "Shot 2", "Shot 3"],
      targetAudience: targetUser,
      emotionalTrigger: "Interest",
    });
  }

  // Limit to 10 angles
  return parsed.angles.slice(0, 10);
}
