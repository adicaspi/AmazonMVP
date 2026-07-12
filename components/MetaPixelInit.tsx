"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { resolveNotrack } from "@/lib/notrack";

const GRANDELASH_PIXEL_ID = "876318711699041";
const SHARK_PIXEL_ID = "1554568722933870";

// Each pixel is dedicated to its own product page
const BIRKENSTOCK_PIXEL_ID = "1025959486467199";

const PIXEL_BY_PATH: { prefix: string; pixelId: string }[] = [
  { prefix: "/grandelash", pixelId: GRANDELASH_PIXEL_ID },
  { prefix: "/shark-flexstyle", pixelId: SHARK_PIXEL_ID },
  { prefix: "/sharkflex", pixelId: SHARK_PIXEL_ID },
  { prefix: "/BirkenstockArizona", pixelId: BIRKENSTOCK_PIXEL_ID },
  { prefix: "/BirkenstockTraffic", pixelId: BIRKENSTOCK_PIXEL_ID },
];

export function MetaPixelInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip the site owner's own visits (?notrack=1)
    if (resolveNotrack()) return;

    // Find the dedicated pixel for the current page (if any)
    const match = PIXEL_BY_PATH.find((p) => pathname.startsWith(p.prefix));
    if (!match) return;

    function tryInit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fbq = (window as any).fbq;
      if (!fbq) return false;

      // trackSingle targets only this page's pixel so it never double-fires another
      fbq("init", match!.pixelId);
      fbq("trackSingle", match!.pixelId, "PageView");
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
