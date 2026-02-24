"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GRANDELASH_PIXEL_ID = "876318711699041";

// Each pixel is dedicated to its own product page
const GRANDELASH_PATHS = ["/grandelash"];

export function MetaPixelInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Only init GrandeLash pixel on GrandeLash pages
    if (!GRANDELASH_PATHS.some((p) => pathname.startsWith(p))) return;

    function tryInit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fbq = (window as any).fbq;
      if (!fbq) return false;

      fbq("init", GRANDELASH_PIXEL_ID);
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
