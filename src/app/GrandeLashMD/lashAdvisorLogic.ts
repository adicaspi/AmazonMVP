// Lash Advisor — questions, deterministic recommendation logic, and verified
// product answers. Kept separate from the UI (LashAdvisor.tsx) so the logic
// and copy can be tuned without touching the component.
//
// TRUTHFUL-MARKETING RULES FOR THIS FILE:
// - Every product fact here comes from Grande Cosmetics' official site
//   (grandecosmetics.com product page + FAQ, checked 2026-08-20): apply once
//   daily on the clean dry upper lash line; first results typically 4–6
//   weeks, full results ~3 months; maintenance = every other day after that;
//   results fade back without continued use; safe with lash extensions
//   (water-based, doesn't affect adhesive); ophthalmologist tested;
//   contains isopropyl cloprostenate (a prostaglandin analog). Official
//   warning: do not use while pregnant/nursing or during treatment for
//   glaucoma or cancer; not recommended with a history of dry eyes, styes,
//   eye infections or other eye disorders; not for under-18s.
// - No medical advice, no diagnoses, no invented percentages or "match
//   scores". The outcome must genuinely follow from the visitor's answers —
//   including telling them it's NOT a fit.

export type QuestionId = "goal" | "current" | "priority" | "routine" | "suitability";
export type Answers = Partial<Record<QuestionId, string>>;

export interface AdvisorOption {
  key: string;
  label: string;
  emoji?: string;
}

export interface AdvisorQuestion {
  id: QuestionId;
  prompt: string;
  options: AdvisorOption[];
}

export const QUESTIONS: AdvisorQuestion[] = [
  {
    id: "goal",
    prompt: "First, what would you most like to improve about your lashes? 👀",
    options: [
      { key: "longer", emoji: "✨", label: "Make them look longer" },
      { key: "fuller", emoji: "💕", label: "Make them look fuller" },
      { key: "sparse", emoji: "👁️", label: "Improve sparse-looking lashes" },
      { key: "brittle", emoji: "🌿", label: "Improve the look of brittle/damaged lashes" },
      { key: "standout", emoji: "💫", label: "Make my natural lashes stand out more" },
    ],
  },
  {
    id: "current",
    prompt: "Got it. How would you describe your lashes today?",
    options: [
      { key: "short-full", label: "Short but fairly full" },
      { key: "long-sparse", label: "Long enough but sparse" },
      { key: "short-sparse", label: "Short + sparse" },
      { key: "brittle", label: "Brittle / damaged-looking" },
      { key: "okay", label: "They’re okay — I just want more impact" },
    ],
  },
  {
    id: "priority",
    prompt: "Okay, that helps. What’s most important to you in a lash serum?",
    options: [
      { key: "visible", label: "Noticeable visible improvement" },
      { key: "natural", label: "Natural-looking results" },
      { key: "easy", label: "Easy daily routine" },
      { key: "gentle", label: "Gentle formula" },
      { key: "cost", label: "Keeping the cost down" },
    ],
  },
  {
    id: "routine",
    prompt: "Would you be comfortable applying a lash serum consistently for several weeks?",
    options: [
      { key: "yes", label: "Yes — absolutely" },
      { key: "probably", label: "Probably" },
      { key: "unsure", label: "I’m not sure" },
      { key: "no", label: "No — I want something immediate" },
    ],
  },
  {
    // Neutral suitability check mirroring the manufacturer's own guidance.
    // This answer NEVER leaves the device (see track() in LashAdvisor.tsx).
    id: "suitability",
    prompt: "One last thing — let’s make sure there’s nothing you should consider before using it. Do any of these apply to you?",
    options: [
      { key: "none", emoji: "✅", label: "No — none of these" },
      { key: "pregnant", label: "Pregnant or nursing" },
      { key: "treatment", label: "Being treated for glaucoma or cancer" },
      { key: "eyes", label: "Prone to dry eyes, styes, or other eye conditions" },
      { key: "under18", label: "I’m under 18" },
    ],
  },
];

export type Outcome = "great" | "possible" | "not_fit" | "check_first";

// Deterministic — the same answers always give the same outcome, and the
// outcome actually reflects them. No AI scores, no arbitrary percentages.
export function recommend(a: Answers): Outcome {
  // Manufacturer guidance always wins, regardless of everything else.
  if (a.suitability && a.suitability !== "none") return "check_first";
  // The product only works with consistent use over weeks — someone who
  // wants an immediate effect should honestly be told it's not the fit.
  if (a.routine === "no") return "not_fit";
  // Hesitant about the routine → honest "possible, if…" rather than a push.
  if (a.routine === "unsure") return "possible";
  // Cost-first shoppers get the softer outcome: one bottle is an upfront
  // spend even though it stretches over ~3 months.
  if (a.priority === "cost") return "possible";
  return "great";
}

function optionLabel(qid: QuestionId, key: string | undefined): string {
  const q = QUESTIONS.find((x) => x.id === qid);
  return q?.options.find((o) => o.key === key)?.label ?? "";
}

// Short phrases for weaving answers into sentences
const GOAL_PHRASE: Record<string, string> = {
  longer: "longer-looking lashes",
  fuller: "fuller-looking lashes",
  sparse: "improving sparse-looking lashes",
  brittle: "improving the look of brittle or damaged lashes",
  standout: "making your natural lashes stand out more",
};

const PRIORITY_REASON: Record<string, string> = {
  visible: "It’s designed for a noticeable change over a full lash cycle — the brand’s 12-week study reported visible improvement for most participants",
  natural: "You said natural-looking results matter — it enhances your own lashes, no falsies or extensions",
  easy: "You wanted an easy routine — it’s one swipe on the upper lash line, once a day",
  gentle: "You asked for a gentle formula — it’s ophthalmologist tested (though any eye-area product can irritate; stop if it does)",
  cost: "One bottle is about a 3-month supply, so the cost spreads out over a season",
};

export interface AdvisorResult {
  outcome: Outcome;
  emoji: string;
  headline: string;
  // "Here's why" — references the visitor's actual answers
  why: string;
  // ✓ bullets (great/possible only)
  reasons: string[];
  // "One thing to know" — expectation-setting from official guidance
  note: string;
  // Whether to show the product CTA prominently
  showCta: boolean;
}

export function buildResult(a: Answers): AdvisorResult {
  const outcome = recommend(a);
  const goalPhrase = GOAL_PHRASE[a.goal ?? ""] ?? "enhancing your lashes";
  const currentLabel = optionLabel("current", a.current).toLowerCase();

  if (outcome === "check_first") {
    const guidance: Record<string, string> = {
      pregnant:
        "Grande Cosmetics’ official guidance is not to use GrandeLASH-MD while pregnant or nursing.",
      treatment:
        "Grande Cosmetics’ official guidance is not to use GrandeLASH-MD while undergoing treatment for glaucoma or cancer.",
      eyes:
        "Grande Cosmetics doesn’t recommend GrandeLASH-MD if you’ve experienced dry eyes, styes, eye infections or other eye-related conditions, and advises consulting your physician if you’re being treated for an eye condition.",
      under18: "GrandeLASH-MD is not intended for use under the age of 18.",
    };
    return {
      outcome,
      emoji: "⚠️",
      headline: "Something to check before using GrandeLASH",
      why: guidance[a.suitability ?? ""] ?? "",
      reasons: [],
      note:
        "We can’t tell you whether it’s right for you personally — that’s a question for your doctor or pharmacist. This isn’t medical advice, just the manufacturer’s own guidance.",
      showCta: false,
    };
  }

  if (outcome === "not_fit") {
    return {
      outcome,
      emoji: "🤔",
      headline: "GrandeLASH may not be your best fit",
      why: `You told us you’re looking for an immediate effect and don’t want to keep up a regular serum routine. GrandeLASH-MD is designed for consistent daily use — first results typically show after 4–6 weeks — so it may not match what you’re looking for.`,
      reasons: [],
      note:
        "If you want an instant look for an event, falsies or extensions will get you there tonight. And if you ever decide a nightly routine is worth it, this page will still be here.",
      showCta: false,
    };
  }

  const why = `You told us your lashes are ${currentLabel || "where you want to improve"}, your main goal is ${goalPhrase}, and ${
    a.routine === "yes"
      ? "you’re comfortable using a serum consistently"
      : a.routine === "probably"
        ? "you’d probably keep up the routine"
        : "you’re not sure yet about a daily routine"
  }.`;

  const reasons = [
    `Matches your goal of ${goalPhrase}`,
    "Designed to enhance the appearance of your natural lashes",
    PRIORITY_REASON[a.priority ?? ""] ?? "One swipe a night is the whole routine",
  ];

  const baseNote =
    "Set the right expectation: Grande Cosmetics says first improvements typically appear after 4–6 weeks of daily use, with full results around 3 months — and lashes gradually return to their original look if you stop. This is a routine, not an overnight fix.";

  if (outcome === "possible") {
    return {
      outcome,
      emoji: "👍",
      headline: "GrandeLASH could be a good match — with one thing to weigh",
      why,
      reasons,
      note:
        a.routine === "unsure"
          ? `${baseNote} It only makes sense if you’ll realistically apply it most nights.`
          : `${baseNote} One bottle is an upfront spend — it works out as a ~3-month supply, but only if you use it consistently.`,
      showCta: true,
    };
  }

  return {
    outcome,
    emoji: "✨",
    headline: "GrandeLASH looks like a great match for you",
    why,
    reasons,
    note: baseNote,
    showCta: true,
  };
}

// Verified Q&A — sources: grandecosmetics.com product page + FAQ (2026-08).
// Used for both the "Questions before buying?" section and the prewritten
// follow-up chips. No invented claims.
export interface AdvisorQA {
  q: string;
  a: string;
  beforeBuy: boolean; // shown in the "Questions before buying?" expandable
}

export const ADVISOR_QAS: AdvisorQA[] = [
  {
    q: "How long before I may notice a difference?",
    a: "Grande Cosmetics says first improvements typically appear after 4–6 weeks of daily use, with full results at around 3 months (a full lash cycle).",
    beforeBuy: true,
  },
  {
    q: "How often do I use it?",
    a: "Once a day — one swipe along the clean, dry upper lash line, like liquid eyeliner. One dip is enough for both eyes; let it dry 2–3 minutes before makeup.",
    beforeBuy: true,
  },
  {
    q: "What happens after the first 3 months?",
    a: "After you reach the look you want, the brand’s guidance is to switch to maintenance: one application every other day. Results need continued use — lashes gradually return to their original appearance if you stop.",
    beforeBuy: true,
  },
  {
    q: "Can it be used with lash extensions?",
    a: "Yes — Grande Cosmetics says the water-based formula is safe with lash extensions and won’t interact with the adhesive.",
    beforeBuy: true,
  },
  {
    q: "What ingredients/considerations should I know about?",
    a: "The formula combines peptides, amino acids (like L-proline), hyaluronic acid and antioxidants — plus isopropyl cloprostenate, a prostaglandin analog. Because of it, the brand advises against use while pregnant or nursing, or during treatment for glaucoma or cancer, and doesn’t recommend it with a history of dry eyes, styes or other eye conditions.",
    beforeBuy: true,
  },
  {
    q: "Is it suitable for sensitive eyes?",
    a: "It’s ophthalmologist tested, and Grande Cosmetics notes sensitivity is rare but possible with any new product. If mild irritation occurs, their guidance is to use less product or apply every other day — and stop if it persists. Not recommended if you’re prone to dry eyes or styes.",
    beforeBuy: false,
  },
  {
    q: "What happens if I stop using it?",
    a: "Results aren’t permanent — the manufacturer says lashes will gradually return to their original appearance once you stop applying it.",
    beforeBuy: false,
  },
];
