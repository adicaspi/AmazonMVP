"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MAIN_PIXEL_ID = "876318711699041";

// Pages that use their own dedicated pixel (skip main pixel)
const EXCLUDED_PATHS = ["/auraglow"];

export function MetaPixelInit() {
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fbq = (window as any).fbq;
    if (!fbq) return;

    // Skip main pixel init for pages that have their own pixel
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;

    fbq("init", MAIN_PIXEL_ID);
    fbq("track", "PageView");
  }, [pathname]);

  return null;
}
