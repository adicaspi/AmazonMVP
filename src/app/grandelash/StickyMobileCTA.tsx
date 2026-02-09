"use client";

import { AmazonButton } from "@/components/AmazonButton";

interface StickyMobileCTAProps {
  amazonLink: string;
}

export function StickyMobileCTA({ amazonLink }: StickyMobileCTAProps) {
  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 bg-gray-900 px-3 pt-2.5 pb-3 md:hidden z-[9999] shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      >
        <AmazonButton
          href={amazonLink}
          productName="GrandeLASH-MD"
          position="sticky-mobile"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          <span>Get Your 8-Week Lash Results</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </AmazonButton>
        <div className="flex items-center justify-center gap-3 mt-1.5">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span className="text-green-400">✓</span> Prime Shipping
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span className="text-green-400">✓</span> 30-Day Guarantee
          </span>
          <span className="text-xs text-white font-bold">$36</span>
        </div>
      </div>
      <div className="h-24 md:hidden"></div>
    </>
  );
}
