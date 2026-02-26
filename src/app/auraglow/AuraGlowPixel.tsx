"use client";

import { useEffect } from "react";
import { generateEventId } from "@/lib/fb-conversions";

const AURAGLOW_PIXEL_ID = "2679443682454721";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFbq(): ((...args: any[]) => void) | null {
  if (typeof window !== "undefined" && (window as any).fbq) {
    return (window as any).fbq;
  }
  return null;
}

function initPixel() {
  const fbq = getFbq();
  if (!fbq) return false;

  // Init only the AuraGlow pixel on this page
  fbq("init", AURAGLOW_PIXEL_ID);
  fbq("trackSingle", AURAGLOW_PIXEL_ID, "PageView");

  return true;
}

/**
 * Send events to the server-side Conversions API endpoint.
 * Uses the same event_id as the browser pixel for deduplication.
 */
function sendCAPI(events: object[]) {
  fetch("/api/fb-conversions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ events, pixel_id: AURAGLOW_PIXEL_ID }),
  }).catch(() => {
    // Silently fail
  });
}

/**
 * Get _fbc and _fbp cookies from the browser for CAPI user matching.
 */
function getUserData(): Record<string, string> {
  const userData: Record<string, string> = {};
  if (typeof document !== "undefined") {
    const cookies = document.cookie;
    const fbcMatch = cookies.match(/_fbc=([^;]+)/);
    const fbpMatch = cookies.match(/_fbp=([^;]+)/);
    if (fbcMatch) userData.fbc = fbcMatch[1];
    if (fbpMatch) userData.fbp = fbpMatch[1];
  }
  return userData;
}

export function AuraGlowPixel() {
  useEffect(() => {
    // Try immediately
    if (initPixel()) return;

    // Retry with intervals in case fbq isn't ready yet
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      attempts++;
      if (initPixel() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export function trackAuraGlowConversion(buttonPosition: string, priceValue: number = 48) {
  const fbq = getFbq();
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "";
  const now = Math.floor(Date.now() / 1000);

  // Generate shared event IDs for deduplication
  const leadEventId = generateEventId();
  const clickEventId = generateEventId();
  const conversionEventId = generateEventId();

  // ── Browser Pixel (AuraGlow only) ────────────────────
  if (fbq) {
    fbq("trackSingle", AURAGLOW_PIXEL_ID, "Lead", {
      content_name: "AuraGlow Teeth Whitening Kit",
      content_category: "Affiliate Link Click",
      content_ids: ["auraglow-kit"],
      content_type: "product",
      value: priceValue,
      currency: "USD",
    }, { eventID: leadEventId });

    fbq("trackSingleCustom", AURAGLOW_PIXEL_ID, "AmazonClick", {
      content_name: "AuraGlow Teeth Whitening Kit",
      content_ids: ["auraglow-kit"],
      content_type: "product",
      button_position: buttonPosition,
      value: priceValue,
      currency: "USD",
    }, { eventID: clickEventId });

    fbq("trackSingleCustom", AURAGLOW_PIXEL_ID, "AuraGlowConversion", {
      content_name: "AuraGlow Teeth Whitening Kit",
      content_ids: ["auraglow-kit"],
      content_type: "product",
      button_position: buttonPosition,
      value: priceValue,
      currency: "USD",
    }, { eventID: conversionEventId });
  }

  // ── Server CAPI (same event_id = Facebook deduplicates) ──
  const userData = getUserData();

  const capiEvents = [
    {
      event_name: "Lead",
      event_time: now,
      event_id: leadEventId,
      event_source_url: pageUrl,
      action_source: "website",
      user_data: userData,
      custom_data: {
        content_name: "AuraGlow Teeth Whitening Kit",
        content_category: "Affiliate Link Click",
        content_ids: ["auraglow-kit"],
        content_type: "product",
        value: priceValue,
        currency: "USD",
      },
    },
    {
      event_name: "AmazonClick",
      event_time: now,
      event_id: clickEventId,
      event_source_url: pageUrl,
      action_source: "website",
      user_data: userData,
      custom_data: {
        content_name: "AuraGlow Teeth Whitening Kit",
        content_ids: ["auraglow-kit"],
        content_type: "product",
        button_position: buttonPosition,
        value: priceValue,
        currency: "USD",
      },
    },
    {
      event_name: "AuraGlowConversion",
      event_time: now,
      event_id: conversionEventId,
      event_source_url: pageUrl,
      action_source: "website",
      user_data: userData,
      custom_data: {
        content_name: "AuraGlow Teeth Whitening Kit",
        content_ids: ["auraglow-kit"],
        content_type: "product",
        button_position: buttonPosition,
        value: priceValue,
        currency: "USD",
      },
    },
  ];

  // Send only to AuraGlow pixel
  sendCAPI(capiEvents);
}
