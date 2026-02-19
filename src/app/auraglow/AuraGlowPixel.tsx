"use client";

import { useEffect } from "react";

const AURAGLOW_PIXEL_ID = "2679443682454721";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFbq(): ((...args: any[]) => void) | null {
  if (typeof window !== "undefined" && (window as any).fbq) {
    return (window as any).fbq;
  }
  return null;
}

export function AuraGlowPixel() {
  useEffect(() => {
    const fbq = getFbq();
    if (fbq) {
      fbq("init", AURAGLOW_PIXEL_ID);
      fbq("trackSingle", AURAGLOW_PIXEL_ID, "PageView");
    }
  }, []);

  return null;
}

export function trackAuraGlowConversion(buttonPosition: string) {
  const fbq = getFbq();
  if (!fbq) return;

  // Fire Lead event to the AuraGlow-specific pixel
  fbq("trackSingle", AURAGLOW_PIXEL_ID, "Lead", {
    content_name: "AuraGlow Teeth Whitening Kit",
    content_category: "Affiliate Link Click",
    content_ids: [buttonPosition],
    value: 48,
    currency: "USD",
  });

  // Fire custom AmazonClick event to the AuraGlow pixel
  fbq("trackSingleCustom", AURAGLOW_PIXEL_ID, "AmazonClick", {
    product: "AuraGlow Teeth Whitening Kit",
    button_position: buttonPosition,
    page_url: window.location.pathname,
  });
}
