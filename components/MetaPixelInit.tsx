"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MAIN_PIXEL_ID = "876318711699041";

// Pages that use their own dedicated pixel (skip main pixel)
const EXCLUDED_PATHS = ["/auraglow"];

export function MetaPixelInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip main pixel init for pages that have their own pixel
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;

    function tryInit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fbq = (window as any).fbq;
      if (!fbq) return false;

      fbq("init", MAIN_PIXEL_ID);
      fbq("track", "PageView");
      return true;
    }

    // Try immediately
    if (tryInit()) return;

    // Retry in case fbq isn't ready yet
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      attempts++;
      if (tryInit() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
