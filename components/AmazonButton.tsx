"use client";

import { ReactNode } from "react";
import { generateEventId } from "@/lib/fb-conversions";

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
}

// Map page paths to their dedicated Facebook Pixel IDs
const PAGE_PIXEL_MAP: Record<string, string> = {
  "/auraglow": "2679443682454721",
  "/grandelash": "876318711699041",
};

function getPixelIdForPage(pagePath: string): string | null {
  for (const [prefix, pixelId] of Object.entries(PAGE_PIXEL_MAP)) {
    if (pagePath.startsWith(prefix)) return pixelId;
  }
  return null;
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
  }).catch(() => {
    // Silently fail — don't block navigation
  });
}

export function AmazonButton({ href, children, className, productName, position }: AmazonButtonProps) {
  const handleClick = () => {
    const pagePath = typeof window !== "undefined" ? window.location.pathname : "";
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const now = Math.floor(Date.now() / 1000);

    // Generate shared event IDs for deduplication
    const leadEventId = generateEventId();
    const clickEventId = generateEventId();

    // ── Browser Pixel ──────────────────────────────────
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: productName || "Amazon Product",
        content_category: "Affiliate Link Click",
        content_ids: [position || "unknown"],
        value: position ? 1 : 0,
        currency: "USD",
      }, { eventID: leadEventId });

      window.fbq("trackCustom", "AmazonClick", {
        product: productName || "Amazon Product",
        button_position: position || "unknown",
        page_url: pagePath,
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
      {
        event_name: "Lead",
        event_time: now,
        event_id: leadEventId,
        event_source_url: pageUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          content_name: productName || "Amazon Product",
          content_category: "Affiliate Link Click",
          content_ids: [position || "unknown"],
          value: position ? 1 : 0,
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
          product: productName || "Amazon Product",
          button_position: position || "unknown",
          page_url: pagePath,
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
      body: JSON.stringify({
        productName: productName || "Amazon Product",
        buttonPosition: position || "unknown",
        page: pagePath,
      }),
    }).catch(() => {
      // Silently fail - don't block navigation
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
