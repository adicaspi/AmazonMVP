"use client";

import { useState } from "react";
import { AmazonButton } from "@/components/AmazonButton";

// Editorial size-check widget — the one tiny piece of shopping behavior we
// ask for before Amazon. Picking a size personalizes the CTA ("… — Size 8
// on Amazon") and fires a qualification signal; the actual size selection
// still happens on the Amazon listing (affiliate links can't preselect a
// size variant), which the CTA copy makes obvious.
const US_SIZES = ["5", "6", "7", "8", "9", "10", "11", "12"];

export function SizeFinder({ amazonLink, priceValue }: { amazonLink: string; priceValue: number }) {
  const [size, setSize] = useState<string | null>(null);

  const pick = (s: string) => {
    setSize(s);
    try {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("trackCustom", "ugg_size_selected", { size: s, page_path: window.location.pathname });
      }
    } catch {
      // Tracking must never break the UI
    }
  };

  return (
    <div>
      <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-3">Find your size</p>
      <p className="text-stone-700 mb-4">What&apos;s your usual US shoe size?</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {US_SIZES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => pick(s)}
            aria-pressed={size === s}
            className={`w-12 h-12 flex items-center justify-center border text-base font-medium transition-colors ${
              size === s
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-300 bg-white text-stone-800 hover:border-stone-500"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {size ? (
        <div>
          <AmazonButton
            href={amazonLink}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="size-finder"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-700 text-white font-semibold transition-colors"
          >
            <span>Check UGG Scuffette II — Size {size} on Amazon</span>
            <span aria-hidden>→</span>
          </AmazonButton>
          <p className="text-sm text-stone-500 mt-3">
            You&apos;ll select size {size} and your color on the Amazon listing — UGG&apos;s official
            size chart is there too, and Prime returns make an exchange free.
          </p>
        </div>
      ) : (
        <p className="text-sm text-stone-400">Select a size to continue to the listing.</p>
      )}
    </div>
  );
}
