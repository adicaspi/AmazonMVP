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
  "/NewBalance928": "1011147045043568",
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
  "/NewBalance928": { name: "New Balance Women's 928v3 Walking Shoe", value: 158, content_id: "newbalance-928v3" },
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
  // Custom AmazonClick only — campaign optimizes on it via custom conversion
  "/NewBalance928": [],
};

// In-app browsers of Meta apps (and similar) — the ad-click traffic. Only
// here do we attempt the Amazon app scheme on iOS: virtually everyone has
// the app, and these webviews don't show Safari's "address is invalid"
// alert. Regular Safari/Chrome get a clean new-tab web link instead.
function isMetaInApp(ua: string): boolean {
  return /FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|Telegram/i.test(ua);
}

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
  // iOS fallback: when the app didn't take over, we NEVER navigate this tab —
  // a "Continue to Amazon" sheet appears instead, and its tap (a real user
  // gesture) opens Amazon in a guaranteed NEW tab. iOS blocks window.open
  // outside the click gesture, so an automatic new tab is impossible.
  const [showContinue, setShowContinue] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) {
      setTarget(undefined); // intent:// needs same-tab; falls back silently
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      // ALL iOS same-tab. In-app browsers: the scheme handoff needs it.
      // Regular Safari: Amazon's AASA DOES include /dp/ product paths
      // (verified against /.well-known/apple-app-site-association), so a
      // plain same-tab anchor tap IS a Universal Link — iOS silently opens
      // the Amazon app when installed (and our page stays put), or just
      // loads amazon.com when not. target=_blank KILLS this handoff, and
      // no scheme runs here so the "address is invalid" alert can't appear.
      setTarget(undefined);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Deep-link into the Amazon APP on all mobile. Amazon deliberately
    // does NOT allow silent app-open from web links (their AASA excludes
    // product pages), so the URL scheme + one-tap iOS dialog is the only
    // path to the logged-in app with 1-click buy — worth it for conversion.
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    // iOS app-scheme attempt happens ONLY in Meta in-app browsers: regular
    // Safari/Chrome users just follow the anchor to a new tab (no scheme →
    // Safari's "address is invalid" alert can never appear for them).
    const isIOS = /iPhone|iPad|iPod/i.test(ua) && isMetaInApp(ua);
    const isAndroid = /Android/i.test(ua);
    if (isIOS || isAndroid) {
      e.preventDefault();
      const webUrl = href;
      if (isIOS) {
        const appUrl = webUrl.replace(/^https:\/\/(www\.)?/, "com.amazon.mobile.shopping.web://");
        // OWNER'S TWO RULES:
        // 1. App installed → the app opens and our page stays untouched in
        //    the browser (no web navigation anywhere).
        // 2. No app → Amazon web opens in a NEW tab, our page stays open
        //    (falls back to same-tab only if the popup is blocked).
        //
        // Mechanics: ONLY visibilitychange/pagehide mean "app opened" (the
        // page really disappears). `blur` means a system dialog is up — the
        // app-confirm dialog OR the "address is invalid" alert — so the
        // fallback must WAIT for focus to return instead of racing the user
        // (racing caused app users to get web-navigated too). window.stop()
        // clears the pending scheme load so Safari can't replay it (gesture-
        // less replays pop the invalid-address alert on return from the app).
        const cancelPending = () => { try { window.stop(); } catch { /* noop */ } };
        let left = false;
        let blurred = false;
        const markLeft = () => { left = true; cancelPending(); };
        document.addEventListener("visibilitychange", markLeft, { once: true });
        window.addEventListener("pagehide", markLeft, { once: true });
        window.addEventListener("pageshow", cancelPending);
        // Fallback NEVER navigates this tab. It shows the continue sheet,
        // whose tap is a fresh user gesture → guaranteed new tab.
        const offerContinue = () => {
          if (left || document.hidden) return;
          cancelPending();
          setShowContinue(true);
        };
        window.addEventListener("blur", () => {
          blurred = true;
          // A system dialog was dismissed. Tapping "Open" on the app-confirm
          // regains focus a beat BEFORE the app switch — so wait a long
          // grace (1300ms) for visibilitychange to set `left` before
          // concluding the app didn't open. (A 400ms grace lost this race
          // and web-navigated on top of the app launch.)
          window.addEventListener("focus", () => setTimeout(offerContinue, 1300), { once: true });
        }, { once: true });
        window.location.href = appUrl;
        setTimeout(() => {
          if (!left && !blurred) offerContinue();
        }, 1600);
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
    <>
      <a
        href={href}
        target={target}
        rel="nofollow sponsored noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
      {/* iOS fallback sheet — plain anchor, NOT wired to handleClick: its tap
          is a real gesture, so target=_blank reliably opens a NEW tab while
          our page stays open underneath. */}
      {showContinue && (
        <div className="fixed inset-x-0 bottom-0 z-[10001] p-4 pb-6 bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
          <div className="max-w-md mx-auto text-center">
            <p className="text-sm font-semibold text-gray-800 mb-2">Amazon app didn&apos;t open?</p>
            <a
              href={href}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => setShowContinue(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-base rounded-xl shadow-lg active:scale-[0.98] transition-transform"
            >
              Continue to Amazon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button onClick={() => setShowContinue(false)} className="mt-2 text-xs text-gray-500 underline">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
