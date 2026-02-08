"use client";

import { ReactNode } from "react";

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: object) => void;
  }
}

interface AmazonButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  productName?: string;
  position?: string; // e.g., "hero", "comparison", "sticky-footer"
}

export function AmazonButton({ href, children, className, productName, position }: AmazonButtonProps) {

  const getDeepLink = (url: string): string => {
    if (typeof window === "undefined") return url;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    // Extract the path from the Amazon URL (e.g., /dp/B082WZTJV5?tag=aipicks20-20)
    const amazonPath = url.replace(/^https?:\/\/(www\.)?amazon\.com/, '');

    if (isIOS) {
      // iOS Amazon app deep link
      return `com.amazon.mobile.shopping://amazon.com${amazonPath}`;
    } else if (isAndroid) {
      // Android Amazon app deep link using intent
      return `intent://www.amazon.com${amazonPath}#Intent;scheme=https;package=com.amazon.mShop.android.shopping;end`;
    }

    return url;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

    // Track the click as a Lead event in Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: productName || "Amazon Product",
        content_category: "Affiliate Link Click",
        content_ids: [position || "unknown"], // Which button was clicked
        value: position ? 1 : 0,
        currency: "USD",
      });

      // Also fire a custom event with more details
      window.fbq("trackCustom", "AmazonClick", {
        product: productName || "Amazon Product",
        button_position: position || "unknown",
        page_url: pagePath,
      });
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

    // Try deep link on mobile
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/.test(userAgent);

    if (isMobile) {
      e.preventDefault();
      const deepLink = getDeepLink(href);

      // Try to open the app
      window.location.href = deepLink;

      // Fallback to web if app doesn't open (after 1.5 seconds)
      setTimeout(() => {
        window.open(href, '_blank');
      }, 1500);
    }
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
