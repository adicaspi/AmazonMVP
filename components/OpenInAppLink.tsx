"use client";

import { useEffect, useState } from "react";
import { getVisitorId } from "@/lib/visitor-id";

// Opt-in Amazon-app link for iOS Safari/Chrome, where the automatic scheme
// attempt is banned (an unhandled scheme pops Apple's unsuppressible
// "address is invalid" alert). Only users who KNOW they have the app tap
// this, so the alert never surprises anyone. In-app browsers (FB/IG) don't
// need it — AmazonButton deep-links them automatically.
export function OpenInAppLink({ href, productName }: { href: string; productName: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const inApp = /FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|Telegram/i.test(ua);
    if (/iPhone|iPad|iPod/i.test(ua) && !inApp) setShow(true);
  }, []);
  if (!show) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const cancelPending = () => { try { window.stop(); } catch { /* noop */ } };
    // Same replay guards as AmazonButton: clear the pending scheme load when
    // the app takes over and again on return, so Safari can't re-issue it.
    document.addEventListener("visibilitychange", cancelPending, { once: true });
    window.addEventListener("pageshow", cancelPending);
    {
      fetch("/api/amazon-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          productName,
          buttonPosition: "open-in-app",
          page: window.location.pathname,
          visitorId: getVisitorId(),
        }),
      }).catch(() => { /* noop */ });
    }
    window.location.href = href.replace(/^https:\/\/(www\.)?/, "com.amazon.mobile.shopping.web://");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-2 w-full text-center text-sm text-blue-700 underline underline-offset-2"
    >
      Have the Amazon app? Open in the app →
    </button>
  );
}
