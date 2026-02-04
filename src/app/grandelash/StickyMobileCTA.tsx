"use client";

import { useState, useEffect } from "react";
import { AmazonButton } from "@/components/AmazonButton";

interface StickyMobileCTAProps {
  amazonLink: string;
}

export function StickyMobileCTA({ amazonLink }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = 600; // Approximate hero section height

      // Show after scrolling past hero
      if (currentScrollY > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Track scroll direction for animation
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-rose-200 p-4 md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">$36</span>
            <div className="flex flex-col">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">Amazon's Choice</span>
              <span className="text-xs text-gray-500 mt-0.5">20K+ bought last month</span>
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
          productName="GrandeLASH-MD"
          position="sticky-mobile"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          <span>Check Price on Amazon</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </AmazonButton>
      </div>
      <div className="h-28 md:hidden"></div>
    </>
  );
}
