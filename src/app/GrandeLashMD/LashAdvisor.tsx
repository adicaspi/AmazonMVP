"use client";

import { useEffect, useState } from "react";
import { AmazonButton } from "@/components/AmazonButton";
import {
  QUESTIONS,
  ADVISOR_QAS,
  buildResult,
  type Answers,
  type AdvisorResult,
} from "./lashAdvisorLogic";

// GrandeLASH Personal Shopping Assistant ("Lash Advisor").
// Entry link + full-screen bottom sheet (mobile) / centered modal (desktop).
// ≤5 questions → deterministic recommendation (lashAdvisorLogic.ts) →
// existing AmazonButton CTA. No accounts, no email, no typing, no backend.
//
// Tracking: lash_advisor_* custom pixel events alongside (never replacing)
// the existing pixel/CAPI setup. The suitability answer (question 5) is
// health-adjacent and NEVER sent anywhere — only the generic outcome bucket.

function track(event: string, params?: Record<string, string>) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", event, { page_path: window.location.pathname, ...params });
    }
  } catch {
    // Tracking must never break the UI
  }
}

const RESULT_EVENT: Record<AdvisorResult["outcome"], string> = {
  great: "lash_advisor_result_great_match",
  possible: "lash_advisor_result_possible_match",
  not_fit: "lash_advisor_result_not_fit",
  check_first: "lash_advisor_result_suitability",
};

type Step = "intro" | number | "result"; // number = question index

export function LashAdvisor({
  amazonLink,
  priceValue,
  productImage,
  productAlt,
}: {
  amazonLink: string;
  priceValue: number;
  productImage: string;
  productAlt: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [beforeBuyOpen, setBeforeBuyOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [activeQA, setActiveQA] = useState<number | null>(null);

  // Lock page scroll behind the sheet
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openAdvisor = () => {
    setOpen(true);
    track("lash_advisor_opened");
  };

  const closeAdvisor = () => {
    setOpen(false);
    // Fresh conversation next time it's opened
    setStep("intro");
    setAnswers({});
    setResult(null);
    setBeforeBuyOpen(false);
    setAskOpen(false);
    setActiveQA(null);
  };

  const start = () => {
    setStep(0);
    track("lash_advisor_started");
  };

  const answer = (key: string) => {
    const qIndex = step as number;
    const q = QUESTIONS[qIndex];
    const next: Answers = { ...answers, [q.id]: key };
    setAnswers(next);
    // The suitability answer stays on-device — event carries the question
    // id only. Other questions include the (non-sensitive) choice.
    track(
      "lash_advisor_question_answered",
      q.id === "suitability" ? { question: q.id } : { question: q.id, answer: key }
    );
    if (qIndex + 1 < QUESTIONS.length) {
      setStep(qIndex + 1);
    } else {
      const r = buildResult(next);
      setResult(r);
      setStep("result");
      track("lash_advisor_completed", { goal: next.goal ?? "", outcome: r.outcome });
      track(RESULT_EVENT[r.outcome]);
    }
  };

  const qIndex = typeof step === "number" ? step : null;

  return (
    <>
      {/* Entry point — under the hero CTA, aimed at the hesitant visitor */}
      <button
        type="button"
        onClick={openAdvisor}
        className="mt-3 w-full text-center md:text-left text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        ✨ Not sure if GrandeLASH is right for you?{" "}
        <span className="font-bold text-rose-700 underline decoration-rose-300 underline-offset-2">
          Ask our Lash Advisor →
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[10000]" role="dialog" aria-modal="true" aria-label="Lash Advisor">
          <style>{`
            @keyframes la-sheet-up { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes la-fade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes la-step { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .la-backdrop { animation: la-fade 0.2s ease-out; }
            .la-sheet { animation: la-sheet-up 0.25s ease-out; }
            .la-step { animation: la-step 0.22s ease-out; }
          `}</style>
          <div className="la-backdrop absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]" onClick={closeAdvisor} />

          {/* Bottom sheet on mobile, centered card on desktop */}
          <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
            <div className="la-sheet relative bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-lg max-h-[92dvh] md:max-h-[85vh] overflow-y-auto overscroll-contain">
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-rose-100 px-5 py-3 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span className="font-black text-gray-900">Lash Advisor</span>
                </div>
                <div className="flex items-center gap-3">
                  {qIndex !== null && (
                    <div className="flex items-center gap-1.5" aria-label={`Question ${qIndex + 1} of ${QUESTIONS.length}`}>
                      {QUESTIONS.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${i < qIndex ? "w-1.5 bg-rose-400" : i === qIndex ? "w-4 bg-rose-600" : "w-1.5 bg-rose-100"}`}
                        />
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={closeAdvisor}
                    aria-label="Close"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="px-5 py-6">
                {/* INTRO */}
                {step === "intro" && (
                  <div className="la-step text-center">
                    <div className="text-4xl mb-3">👋</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Hi — I&apos;m your Lash Advisor.</h3>
                    <p className="text-gray-600 mb-1">
                      Answer a few quick questions and I&apos;ll help you figure out whether
                      GrandeLASH-MD fits what you&apos;re looking for.
                    </p>
                    <p className="text-sm text-gray-400 mb-6">Takes about 30 seconds.</p>
                    <button
                      type="button"
                      onClick={start}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full transition-all shadow-lg active:scale-[0.98]"
                    >
                      Let&apos;s find out
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    <p className="text-[11px] text-gray-400 mt-4">No signup, no email — just answers.</p>
                  </div>
                )}

                {/* QUESTIONS */}
                {qIndex !== null && (
                  <div className="la-step" key={qIndex}>
                    <p className="text-lg font-bold text-gray-900 mb-4 leading-snug">{QUESTIONS[qIndex].prompt}</p>
                    <div className="space-y-2.5">
                      {QUESTIONS[qIndex].options.map((o) => (
                        <button
                          key={o.key}
                          type="button"
                          onClick={() => answer(o.key)}
                          className="w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl border border-rose-100 bg-white hover:border-rose-400 hover:bg-rose-50/60 active:scale-[0.99] transition-all shadow-sm"
                        >
                          {o.emoji && <span className="text-xl flex-shrink-0">{o.emoji}</span>}
                          <span className="text-gray-800 font-medium">{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESULT */}
                {step === "result" && result && (
                  <div className="la-step">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{result.emoji}</div>
                      <h3 className="text-xl font-black text-gray-900 leading-snug">{result.headline}</h3>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4 mb-4">
                      <p className="text-sm font-bold text-rose-800 mb-1">Here&apos;s why:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{result.why}</p>
                    </div>

                    {result.reasons.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-900 mb-2">Why it may suit you</p>
                        <ul className="space-y-1.5">
                          {result.reasons.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-rose-600 font-bold flex-shrink-0">✓</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border border-amber-200 bg-amber-50/60 rounded-2xl p-4 mb-5">
                      <p className="text-sm font-bold text-amber-900 mb-1">One thing to know</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{result.note}</p>
                    </div>

                    {/* Product CTA — reuses the existing AmazonButton (same
                        affiliate link, app handoff, AmazonClick tracking) */}
                    {result.showCta && (
                      <div
                        className="border border-rose-100 rounded-2xl p-4 mb-4 shadow-sm"
                        onClickCapture={() => track("lash_advisor_amazon_clicked", { outcome: result.outcome })}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={productImage} alt={productAlt} className="w-16 h-16 object-contain rounded-xl bg-white ring-1 ring-rose-100 flex-shrink-0" />
                          <div>
                            <p className="font-bold text-gray-900 leading-tight">GrandeLASH-MD Lash Enhancing Serum</p>
                            <p className="text-xs text-gray-500 mt-0.5">2mL — about a 3-month supply</p>
                          </div>
                        </div>
                        <AmazonButton
                          href={amazonLink}
                          productName="GrandeLASH-MD Serum"
                          priceValue={priceValue}
                          position="lash-advisor"
                          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-[0.98]"
                        >
                          <span>Check Price &amp; Availability on Amazon</span>
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </AmazonButton>
                      </div>
                    )}

                    {/* Quiet, non-pushy link for the honest outcomes */}
                    {!result.showCta && (
                      <div
                        className="text-center mb-4"
                        onClickCapture={() => track("lash_advisor_amazon_clicked", { outcome: result.outcome })}
                      >
                        <AmazonButton
                          href={amazonLink}
                          productName="GrandeLASH-MD Serum"
                          priceValue={priceValue}
                          position="lash-advisor"
                          className="inline-block text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
                        >
                          You can still view the listing on Amazon
                        </AmazonButton>
                      </div>
                    )}

                    {/* Before-you-buy quick answers (good outcomes only) */}
                    {result.showCta && (
                      <div className="border border-rose-100 rounded-2xl mb-4 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setBeforeBuyOpen((v) => !v)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left font-bold text-gray-900 text-sm hover:bg-rose-50/50 transition-colors"
                        >
                          <span>Questions before buying?</span>
                          <svg className={`w-4 h-4 text-rose-600 transition-transform ${beforeBuyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {beforeBuyOpen && (
                          <div className="la-step px-4 pb-4 space-y-3">
                            {ADVISOR_QAS.filter((qa) => qa.beforeBuy).map((qa, i) => (
                              <div key={i}>
                                <p className="text-sm font-bold text-gray-800">{qa.q}</p>
                                <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{qa.a}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Prewritten follow-up questions */}
                    <div className="mb-2">
                      {!askOpen ? (
                        <button
                          type="button"
                          onClick={() => setAskOpen(true)}
                          className="w-full text-center text-sm font-bold text-rose-700 hover:text-rose-800 py-2 transition-colors"
                        >
                          Ask another question →
                        </button>
                      ) : (
                        <div className="la-step">
                          <p className="text-sm font-bold text-gray-900 mb-2">What would you like to know?</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {ADVISOR_QAS.map((qa, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setActiveQA(i === activeQA ? null : i)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                                  activeQA === i
                                    ? "bg-rose-600 border-rose-600 text-white"
                                    : "bg-white border-rose-200 text-rose-800 hover:border-rose-400"
                                }`}
                              >
                                {qa.q}
                              </button>
                            ))}
                          </div>
                          {activeQA !== null && (
                            <div className="la-step bg-rose-50/70 border border-rose-100 rounded-2xl p-4">
                              <p className="text-sm text-gray-700 leading-relaxed">{ADVISOR_QAS[activeQA].a}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-center text-[11px] text-gray-400 mt-3">
                      Based on the manufacturer&apos;s published product information — not medical advice.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
