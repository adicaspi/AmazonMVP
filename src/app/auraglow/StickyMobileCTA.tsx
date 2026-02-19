"use client";

import { AmazonButton } from "@/components/AmazonButton";

interface StickyMobileCTAProps {
  amazonLink: string;
}

export function StickyMobileCTA({ amazonLink }: StickyMobileCTAProps) {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 p-3 md:hidden z-[9999] shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">$29.99</span>
            <div className="flex flex-col">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">Amazon&apos;s Choice</span>
              <span className="text-xs text-gray-500 mt-0.5">15K+ bought last month</span>
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
          productName="AuraGlow Teeth Whitening Kit"
          position="sticky-mobile"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          <span>Buy Now on Amazon</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </AmazonButton>
      </div>
      <div className="h-28 md:hidden"></div>
    </>
  );
}
