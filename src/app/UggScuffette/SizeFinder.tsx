"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { AmazonButton } from "@/components/AmazonButton";

// Editorial size-check widgets — the one tiny piece of shopping behavior we
// ask for before Amazon. The chosen size is SHARED page-wide (SizeProvider):
// picking a size in the hero or in the "Find your size" section personalizes
// every size-aware CTA ("… — Size 8 on Amazon") and fires a qualification
// signal. The actual size selection still happens on the Amazon listing
// (affiliate links can't preselect a size variant), which the copy makes
// obvious.
const US_SIZES = ["5", "6", "7", "8", "9", "10", "11", "12"];

const SizeContext = createContext<{ size: string | null; pick: (s: string) => void }>({
  size: null,
  pick: () => {},
});

export function SizeProvider({ children }: { children: ReactNode }) {
  const [size, setSize] = useState<string | null>(null);

  const pick = (s: string) => {
    setSize(s);
    // Qualifies this visit: AmazonButton only sends AmazonClick on gated
    // pages once a size has been chosen (owner rule — qualified clicks only)
    try { window.__aipUggSize = s; } catch { /* noop */ }
    try {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("trackCustom", "ugg_size_selected", { size: s, page_path: window.location.pathname });
      }
    } catch {
      // Tracking must never break the UI
    }
  };

  return <SizeContext.Provider value={{ size, pick }}>{children}</SizeContext.Provider>;
}

function SizePills({ compact }: { compact?: boolean }) {
  const { size, pick } = useContext(SizeContext);
  const box = compact ? "w-10 h-10 text-sm" : "w-12 h-12 text-base";
  return (
    <div className="flex flex-wrap gap-2">
      {US_SIZES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => pick(s)}
          aria-pressed={size === s}
          className={`${box} flex items-center justify-center border font-medium transition-colors ${
            size === s
              ? "border-stone-900 bg-stone-900 text-white"
              : "border-stone-300 bg-white text-stone-800 hover:border-stone-500"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

// Hero-block size row + primary CTA: the CTA label carries the chosen size.
// buttonClassName/idleLabel let the classic (non-editorial) page reuse this
// with its own amber button style and copy.
export function HeroSizeCta({
  amazonLink,
  priceValue,
  buttonClassName,
  idleLabel,
}: {
  amazonLink: string;
  priceValue: number;
  buttonClassName?: string;
  idleLabel?: string;
}) {
  const { size } = useContext(SizeContext);
  return (
    <div>
      <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-2">Your usual US size</p>
      <div className="mb-5">
        <SizePills compact />
      </div>
      <AmazonButton
        href={amazonLink}
        productName="UGG Scuffette II"
        priceValue={priceValue}
        position="hero-main"
        className={buttonClassName ?? "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-stone-900 hover:bg-stone-700 text-white font-semibold text-lg transition-colors"}
      >
        <span>{size ? `Check Scuffette II — Size ${size} on Amazon` : (idleLabel ?? "Check Price on Amazon")}</span>
        <span aria-hidden>→</span>
      </AmazonButton>
      <p className="text-sm text-stone-500 mt-3">
        {size
          ? `You'll select size ${size} and your color on the Amazon listing.`
          : "View current price, available sizes & colors on Amazon."}
      </p>
    </div>
  );
}

// Full "Find your size" section (mid-page) — same shared size state
export function SizeFinder({
  amazonLink,
  priceValue,
  buttonClassName,
}: {
  amazonLink: string;
  priceValue: number;
  buttonClassName?: string;
}) {
  const { size } = useContext(SizeContext);
  return (
    <div>
      <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-3">Find your size</p>
      <p className="text-stone-700 mb-4">What&apos;s your usual US shoe size?</p>
      <div className="mb-5">
        <SizePills />
      </div>
      {size ? (
        <div>
          <AmazonButton
            href={amazonLink}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="size-finder"
            className={buttonClassName ?? "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-700 text-white font-semibold transition-colors"}
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
