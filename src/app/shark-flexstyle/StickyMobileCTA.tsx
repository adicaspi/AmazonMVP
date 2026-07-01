"use client";

import { AmazonButton } from "@/components/AmazonButton";

interface StickyMobileCTAProps {
  amazonLink: string;
  price?: string;
  priceValue?: number;
}

export function StickyMobileCTA({ amazonLink, price, priceValue }: StickyMobileCTAProps) {
  return (
    <>
      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-200 p-3 md:hidden z-[9999] shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">{price || "$229"}</span>
            <div className="flex flex-col">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">Amazon&apos;s Choice</span>
              <span className="text-xs text-gray-500 mt-0.5">Thousands bought last month</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Free Prime
          </div>
        </div>
        <AmazonButton
          href={amazonLink}
          productName="Shark FlexStyle"
          priceValue={priceValue}
          position="sticky-mobile"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          <span>Check Price on Amazon</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </AmazonButton>
        <p className="text-center text-[11px] text-gray-500 mt-1.5">🔒 30-Day Money-Back Guarantee · Free Returns</p>
      </div>

      {/* Desktop sticky bar */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <div className="max-w-6xl mx-auto w-full px-6 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-900">Shark FlexStyle™ Air Styling &amp; Drying System</span>
            <span className="text-2xl font-bold text-gray-900">{price || "$229"}</span>
            <span className="text-base text-gray-400 line-through">$350</span>
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
            <span>Check Price on Amazon</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
        </div>
      </div>

      {/* Spacer so the fixed bars don't cover footer content */}
      <div className="h-28 md:h-20"></div>
    </>
  );
}
