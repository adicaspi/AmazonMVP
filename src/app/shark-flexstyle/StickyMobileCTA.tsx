"use client";

import { AmazonButton } from "@/components/AmazonButton";

interface StickyMobileCTAProps {
  amazonLink: string;
  priceValue?: number;
}

// Always-visible sticky CTA bar. On mobile this is the primary action
// (the hero has no separate button), compact so it supports the content.
export function StickyMobileCTA({ amazonLink, priceValue }: StickyMobileCTAProps) {
  return (
    <>
      {/* Mobile: compact sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2.5 md:hidden z-[9999] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-900">4.3</span>
            </div>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Amazon&apos;s Choice</span>
          </div>
          <AmazonButton
            href={amazonLink}
            productName="Shark FlexStyle"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-base rounded-xl shadow-md active:scale-[0.98] transition-transform whitespace-nowrap"
          >
            <span>Check Today&apos;s Amazon Price</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
        </div>
      </div>

      {/* Desktop: slim sticky bar */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <div className="max-w-6xl mx-auto w-full px-6 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-900">Shark FlexStyle™ Air Styling &amp; Drying System</span>
            <span className="text-xl font-extrabold text-amber-700">🔥 Special Deal Today</span>
            <span className="text-xs text-gray-600 hidden lg:flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 30-Day Money-Back</span>
              <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Free Prime Returns</span>
            </span>
          </div>
          <AmazonButton
            href={amazonLink}
            productName="Shark FlexStyle"
            priceValue={priceValue}
            position="sticky-desktop"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-base rounded-full shadow-lg transition-all whitespace-nowrap"
          >
            <span>Check Today&apos;s Amazon Price</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
        </div>
      </div>

      {/* Spacer so the fixed bars don't cover page content */}
      <div className="h-20 md:h-20"></div>
    </>
  );
}
