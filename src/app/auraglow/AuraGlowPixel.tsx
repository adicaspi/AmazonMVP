"use client";

import { useEffect } from "react";

const AURAGLOW_PIXEL_ID = "2679443682454721";
const MAIN_PIXEL_ID = "876318711699041";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFbq(): ((...args: any[]) => void) | null {
  if (typeof window !== "undefined" && (window as any).fbq) {
    return (window as any).fbq;
  }
  return null;
}

function initPixels() {
  const fbq = getFbq();
  if (!fbq) return false;

  // Init both pixels for this page
  fbq("init", AURAGLOW_PIXEL_ID);
  fbq("init", MAIN_PIXEL_ID);

  // Track PageView on both pixels
  fbq("trackSingle", AURAGLOW_PIXEL_ID, "PageView");
  fbq("trackSingle", MAIN_PIXEL_ID, "PageView");

  return true;
}

export function AuraGlowPixel() {
  useEffect(() => {
    // Try immediately
    if (initPixels()) return;

    // Retry with intervals in case fbq isn't ready yet
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      attempts++;
      if (initPixels() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
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

  // Fire Lead event to the main pixel too
  fbq("trackSingle", MAIN_PIXEL_ID, "Lead", {
    content_name: "AuraGlow Teeth Whitening Kit",
    content_category: "Affiliate Link Click",
    content_ids: [buttonPosition],
    value: 48,
    currency: "USD",
  });

  // Fire custom AmazonClick event to both pixels
  fbq("trackSingleCustom", AURAGLOW_PIXEL_ID, "AmazonClick", {
    product: "AuraGlow Teeth Whitening Kit",
    button_position: buttonPosition,
    page_url: window.location.pathname,
  });

  fbq("trackSingleCustom", MAIN_PIXEL_ID, "AmazonClick", {
    product: "AuraGlow Teeth Whitening Kit",
    button_position: buttonPosition,
    page_url: window.location.pathname,
  });

  // Fire custom AuraGlowConversion event to both pixels
  fbq("trackSingleCustom", AURAGLOW_PIXEL_ID, "AuraGlowConversion", {
    product: "AuraGlow Teeth Whitening Kit",
    button_position: buttonPosition,
    page_url: window.location.pathname,
    value: 48,
    currency: "USD",
  });

  fbq("trackSingleCustom", MAIN_PIXEL_ID, "AuraGlowConversion", {
    product: "AuraGlow Teeth Whitening Kit",
    button_position: buttonPosition,
    page_url: window.location.pathname,
    value: 48,
    currency: "USD",
  });
}
