"use client";

import { AmazonButton } from "@/components/AmazonButton";

interface StickyMobileCTAProps {
  amazonLink: string;
  priceValue?: number;
}

// Always-visible sticky bar — a slim BACKUP to the hero CTA, not a rival:
// shorter label ("See Price"), lower height, quieter styling. The hero
// button stays the visual "hero"; this stays available while scrolling.
export function StickyMobileCTA({ amazonLink, priceValue }: StickyMobileCTAProps) {
  return (
    <>
      {/* Mobile: slim sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 px-3 py-1.5 md:hidden z-[9999] shadow-[0_-2px_12px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900">4.3</span>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">· Amazon&apos;s Choice</span>
          </div>
          <AmazonButton
            href={amazonLink}
            productName="Shark FlexStyle"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-lg shadow-sm active:scale-[0.98] transition-transform whitespace-nowrap"
          >
            <span>See Price</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
        </div>
      </div>

      {/* Desktop: slim sticky bar */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 z-[9999] shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
        <div className="max-w-6xl mx-auto w-full px-6 py-2 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-900 text-sm">Shark FlexStyle™ Air Styling &amp; Drying System</span>
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
            className="flex items-center justify-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-full shadow-sm transition-all whitespace-nowrap"
          >
            <span>View on Amazon</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
        </div>
      </div>

      {/* Spacer so the fixed bars don't cover page content */}
      <div className="h-14 md:h-14"></div>
    </>
  );
}
