"use client";

import { ReactNode, useEffect, useState } from "react";
import { generateEventId } from "@/lib/fb-conversions";
import { getVisitorId } from "@/lib/visitor-id";
import { isNotrackEnabled } from "@/lib/notrack";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: (...args: any[]) => void;
  }
}

interface AmazonButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  productName?: string;
  position?: string; // e.g., "hero", "comparison", "sticky-footer"
  priceValue?: number; // Dynamic price from Amazon Creators API — overrides hardcoded fallback
}

// Map page paths to their dedicated Facebook Pixel IDs
const PAGE_PIXEL_MAP: Record<string, string> = {
  "/auraglow": "2679443682454721",
  "/grandelash": "876318711699041",
  "/shark-flexstyle": "1554568722933870",
  "/sharkflex": "1554568722933870",
  "/BirkenstockArizona": "1025959486467199",
  "/BirkenstockTraffic": "1025959486467199",
  "/BirkenstockSales": "1025959486467199",
  "/BirkenstockInstagram": "1025959486467199",
  "/BirkenstockAudience": "1025959486467199",
  // [USER ASSET] /UggScuffette: add its dedicated pixel ID here when created
};

// Product info per page for accurate CAPI event data
const PAGE_PRODUCT_MAP: Record<string, { name: string; value: number; content_id: string }> = {
  "/auraglow": { name: "AuraGlow Teeth Whitening Kit", value: 48, content_id: "auraglow-kit" },
  "/grandelash": { name: "GrandeLASH-MD Lash Enhancing Serum", value: 36, content_id: "grandelash-serum" },
  "/shark-flexstyle": { name: "Shark FlexStyle Air Styling & Drying System", value: 279, content_id: "shark-flexstyle" },
  "/sharkflex": { name: "Shark FlexStyle Air Styling & Drying System", value: 279, content_id: "shark-flexstyle" },
  "/BirkenstockArizona": { name: "Birkenstock Arizona Soft Footbed Sandals", value: 120, content_id: "birkenstock-arizona" },
  "/BirkenstockTraffic": { name: "Birkenstock Arizona Soft Footbed Sandals", value: 120, content_id: "birkenstock-arizona" },
  "/BirkenstockSales": { name: "Birkenstock Arizona Soft Footbed Sandals", value: 120, content_id: "birkenstock-arizona" },
  "/BirkenstockInstagram": { name: "Birkenstock Arizona Soft Footbed Sandals", value: 120, content_id: "birkenstock-arizona" },
  "/BirkenstockAudience": { name: "Birkenstock Arizona Soft Footbed Sandals", value: 120, content_id: "birkenstock-arizona" },
  "/UggScuffette": { name: "UGG Scuffette II Slipper", value: 90, content_id: "ugg-scuffette" },
};

// Standard pixel events fired when an Amazon CTA is clicked, per page.
// Falls back to DEFAULT_CLICK_EVENTS for any page not listed here.
// (The custom AmazonClick event also fires on every click, browser + CAPI.)
const DEFAULT_CLICK_EVENTS = ["Lead", "InitiateCheckout"];
const PAGE_CLICK_EVENTS: Record<string, string[]> = {
  "/shark-flexstyle": ["ViewContent"],
  "/sharkflex": ["InitiateCheckout"],
  // No FB dataset for Birkenstock yet — internal analytics only until one exists
  "/BirkenstockArizona": [],
  "/BirkenstockTraffic": [],
  // Sales campaign optimizes on the custom AmazonClickBirkenstock event
  "/BirkenstockSales": [],
  "/BirkenstockInstagram": [],
  "/BirkenstockAudience": [],
  // Custom AmazonClick only until a UGG pixel + campaign exist
  "/UggScuffette": [],
};

// Longest matching prefix wins
function longestPrefixMatch<T>(map: Record<string, T>, pagePath: string): T | null {
  const key = Object.keys(map)
    .filter((prefix) => pagePath.startsWith(prefix))
    .sort((a, b) => b.length - a.length)[0];
  return key ? map[key] : null;
}

function getPixelIdForPage(pagePath: string): string | null {
  return longestPrefixMatch(PAGE_PIXEL_MAP, pagePath);
}

function getClickEventsForPage(pagePath: string): string[] {
  return longestPrefixMatch(PAGE_CLICK_EVENTS, pagePath) ?? DEFAULT_CLICK_EVENTS;
}

/**
 * Send events to the server-side Conversions API endpoint.
 * Uses the same event_id as the browser pixel for deduplication.
 */
function sendCAPI(events: object[], pixelId: string) {
  fetch("/api/fb-conversions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ events, pixel_id: pixelId }),
    keepalive: true,
  }).catch(() => {
    // Silently fail — don't block navigation
  });
}

export function AmazonButton({ href, children, className, productName, position, priceValue }: AmazonButtonProps) {
  // Mobile: navigate in the SAME tab — iOS/Android only hand a tap off to
  // the Amazon app (universal/app links) on same-tab navigations; a new
  // tab always opens the website. Desktop keeps the new tab.
  const [target, setTarget] = useState<string | undefined>("_blank");
  useEffect(() => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) setTarget(undefined);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Deep-link into the Amazon APP on all mobile. Amazon deliberately
    // does NOT allow silent app-open from web links (their AASA excludes
    // product pages), so the URL scheme + one-tap iOS dialog is the only
    // path to the logged-in app with 1-click buy — worth it for conversion.
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    if (isIOS || isAndroid) {
      e.preventDefault();
      const webUrl = href;
      if (isIOS) {
        const appUrl = webUrl.replace(/^https:\/\/(www\.)?/, "com.amazon.mobile.shopping.web://");
        // Fall back to the website ONLY if we can tell the app never took
        // over: any hide/blur means the app (or its dialog) opened.
        let left = false;
        const markLeft = () => { left = true; };
        document.addEventListener("visibilitychange", markLeft, { once: true });
        window.addEventListener("pagehide", markLeft, { once: true });
        window.addEventListener("blur", markLeft, { once: true });
        window.location.href = appUrl;
        setTimeout(() => {
          if (!left && !document.hidden) window.location.href = webUrl;
        }, 2500);
      } else {
        const u = new URL(webUrl);
        window.location.href =
          `intent://${u.host}${u.pathname}${u.search}#Intent;scheme=https;` +
          `package=com.amazon.mShop.android.shopping;` +
          `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
      }
    }
    // Regular browsers (mobile + desktop) keep default navigation

    // Skip counting the site owner's own clicks (?notrack=1); link still navigates
    if (isNotrackEnabled()) return;

    const pagePath = typeof window !== "undefined" ? window.location.pathname : "";
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const now = Math.floor(Date.now() / 1000);

    // Look up product info for this page
    const productInfo = longestPrefixMatch(PAGE_PRODUCT_MAP, pagePath);
    const name = productName || productInfo?.name || "Amazon Product";
    // Use dynamic price from Creators API if provided, otherwise fall back to hardcoded
    const value = priceValue ?? productInfo?.value ?? 0;
    const contentId = productInfo?.content_id || "unknown";

    // Build the custom_data payload for a given standard event
    const customDataFor = (eventName: string): Record<string, unknown> => {
      const data: Record<string, unknown> = {
        content_name: name,
        content_ids: [contentId],
        content_type: "product",
        value: value,
        currency: "USD",
      };
      if (eventName === "Lead") data.content_category = "Affiliate Link Click";
      if (eventName === "InitiateCheckout") data.num_items = 1;
      return data;
    };

    // Which standard events to fire on this page, each with a shared id for dedup
    const standardEvents = getClickEventsForPage(pagePath).map((eventName) => ({
      eventName,
      eventId: generateEventId(),
    }));
    // Custom click event — one name everywhere: AmazonClick. The custom
    // conversions in the ad account scope it per product by URL rule
    // (BirkenstockSales / shark-flexstyle), and the pixels differ anyway.
    const customEventName = "AmazonClick";
    const clickEventId = generateEventId();

    // ── Browser Pixel ──────────────────────────────────
    if (typeof window !== "undefined" && window.fbq) {
      for (const e of standardEvents) {
        window.fbq("track", e.eventName, customDataFor(e.eventName), { eventID: e.eventId });
      }

      window.fbq("trackCustom", customEventName, {
        content_name: name,
        content_ids: [contentId],
        content_type: "product",
        button_position: position || "unknown",
        value: value,
        currency: "USD",
      }, { eventID: clickEventId });
    }

    // ── Server CAPI (same event_id = Facebook deduplicates) ──
    const userData: Record<string, string> = {};
    // Try to get _fbc and _fbp cookies for better matching
    if (typeof document !== "undefined") {
      const cookies = document.cookie;
      const fbcMatch = cookies.match(/_fbc=([^;]+)/);
      const fbpMatch = cookies.match(/_fbp=([^;]+)/);
      if (fbcMatch) userData.fbc = fbcMatch[1];
      if (fbpMatch) userData.fbp = fbpMatch[1];
    }

    const capiEvents = [
      ...standardEvents.map((e) => ({
        event_name: e.eventName,
        event_time: now,
        event_id: e.eventId,
        event_source_url: pageUrl,
        action_source: "website",
        user_data: userData,
        custom_data: customDataFor(e.eventName),
      })),
      {
        event_name: customEventName,
        event_time: now,
        event_id: clickEventId,
        event_source_url: pageUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          content_name: name,
          content_ids: [contentId],
          content_type: "product",
          button_position: position || "unknown",
          value: value,
          currency: "USD",
        },
      },
    ];

    const pixelId = getPixelIdForPage(pagePath);
    if (pixelId) {
      sendCAPI(capiEvents, pixelId);
    }

    // Also track on our server for the analytics dashboard
    fetch("/api/amazon-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        productName: productName || "Amazon Product",
        buttonPosition: position || "unknown",
        page: pagePath,
        visitorId: getVisitorId(),
      }),
    }).catch(() => {
      // Silently fail - don't block navigation
    });
  };

  return (
    <a
      href={href}
      target={target}
      rel="nofollow sponsored noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
