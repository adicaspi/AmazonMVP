"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { resolveNotrack } from "@/lib/notrack";

const GRANDELASH_PIXEL_ID = "876318711699041";
const SHARK_PIXEL_ID = "1554568722933870";

// Each pixel is dedicated to its own product page
const BIRKENSTOCK_PIXEL_ID = "1025959486467199";
const NEWBALANCE_PIXEL_ID = "1011147045043568";

const PIXEL_BY_PATH: { prefix: string; pixelId: string }[] = [
  { prefix: "/grandelash", pixelId: GRANDELASH_PIXEL_ID },
  { prefix: "/GrandeLashMD", pixelId: GRANDELASH_PIXEL_ID },
  { prefix: "/GrandeLashInstagram", pixelId: GRANDELASH_PIXEL_ID },
  { prefix: "/shark-flexstyle", pixelId: SHARK_PIXEL_ID },
  { prefix: "/sharkflex", pixelId: SHARK_PIXEL_ID },
  { prefix: "/BirkenstockArizona", pixelId: BIRKENSTOCK_PIXEL_ID },
  { prefix: "/BirkenstockTraffic", pixelId: BIRKENSTOCK_PIXEL_ID },
  { prefix: "/BirkenstockSales", pixelId: BIRKENSTOCK_PIXEL_ID },
  { prefix: "/BirkenstockInstagram", pixelId: BIRKENSTOCK_PIXEL_ID },
  { prefix: "/BirkenstockAudience", pixelId: BIRKENSTOCK_PIXEL_ID },
  // [USER ASSET] /UggScuffette: add { prefix, pixelId } when its pixel exists
  { prefix: "/NewBalance928", pixelId: NEWBALANCE_PIXEL_ID },
];

export function MetaPixelInit() {
  const pathname = usePathname();
  const match = PIXEL_BY_PATH.find((p) => pathname.startsWith(p.prefix));

  useEffect(() => {
    // Skip the site owner's own visits (?notrack=1)
    if (resolveNotrack()) return;
    if (!match) return;
    // The inline script below already fired for this page load — this
    // effect only covers client-side navigations between pages.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).__aipPixelFiredPath === pathname) return;

    function tryInit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fbq = (window as any).fbq;
      if (!fbq) return false;

      // trackSingle targets only this page's pixel so it never double-fires another
      fbq("init", match!.pixelId);
      fbq("trackSingle", match!.pixelId, "PageView");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__aipPixelFiredPath = pathname;
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
  }, [pathname, match]);

  if (!match) return null;

  // The init ships INSIDE the initial HTML: Meta's pixel scanner reads the
  // static page source and needs to see fbq('init', ...) there — the old
  // effect-only init was invisible to it ("A pixel wasn't detected").
  // Bonus: PageView now fires before hydration, earlier and more reliably.
  const inlineInit =
    `try{if(document.cookie.indexOf('aip_notrack=1')===-1&&location.search.indexOf('notrack=1')===-1){` +
    `fbq('init','${match.pixelId}');fbq('trackSingle','${match.pixelId}','PageView');` +
    `window.__aipPixelFiredPath=location.pathname;}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: inlineInit }} />;
}
