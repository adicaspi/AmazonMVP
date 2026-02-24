import { NextRequest, NextResponse } from "next/server";

type TestResult = {
  name: string;
  nameHe: string;
  status: "pass" | "fail" | "warn";
  message: string;
  messageHe: string;
  details?: string;
  category: string;
};

const MAIN_PIXEL_ID = "876318711699041";
const AURAGLOW_PIXEL_ID = "2679443682454721";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baseUrl = searchParams.get("baseUrl") || "https://aipicks.co";

  const results: TestResult[] = [];

  // ── 1. API Endpoint Checks ─────────────────────────────
  // Check Amazon Click API
  try {
    const res = await fetch(`${baseUrl}/api/amazon-click?limit=1`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const isJson = res.headers.get("content-type")?.includes("application/json");
    results.push({
      name: "Amazon Click API (GET)",
      nameHe: "API לחיצות אמזון (GET)",
      status: res.ok && isJson ? "pass" : "fail",
      message: res.ok && isJson ? `API responded ${res.status} OK` : `API responded ${res.status}`,
      messageHe: res.ok && isJson ? `API החזיר ${res.status} תקין` : `API החזיר ${res.status}`,
      category: "api",
    });
  } catch (e) {
    results.push({
      name: "Amazon Click API (GET)",
      nameHe: "API לחיצות אמזון (GET)",
      status: "fail",
      message: `Cannot reach API: ${String(e)}`,
      messageHe: `לא ניתן להגיע ל-API: ${String(e)}`,
      category: "api",
      details: String(e),
    });
  }

  // Check Page View API
  try {
    const res = await fetch(`${baseUrl}/api/page-view?limit=1`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const isJson = res.headers.get("content-type")?.includes("application/json");
    results.push({
      name: "Page View API (GET)",
      nameHe: "API צפיות בעמוד (GET)",
      status: res.ok && isJson ? "pass" : "fail",
      message: res.ok && isJson ? `API responded ${res.status} OK` : `API responded ${res.status}`,
      messageHe: res.ok && isJson ? `API החזיר ${res.status} תקין` : `API החזיר ${res.status}`,
      category: "api",
    });
  } catch (e) {
    results.push({
      name: "Page View API (GET)",
      nameHe: "API צפיות בעמוד (GET)",
      status: "fail",
      message: `Cannot reach API: ${String(e)}`,
      messageHe: `לא ניתן להגיע ל-API: ${String(e)}`,
      category: "api",
      details: String(e),
    });
  }

  // Check FB Conversions API endpoint exists
  try {
    // We send an empty body to test that the endpoint exists and rejects properly
    const res = await fetch(`${baseUrl}/api/fb-conversions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: [] }),
    });
    // 400 is expected (empty events array) - it means the endpoint is alive
    const isJson = res.headers.get("content-type")?.includes("application/json");
    results.push({
      name: "FB Conversions API (CAPI)",
      nameHe: "API המרות פייסבוק (CAPI)",
      status: isJson && (res.status === 400 || res.ok) ? "pass" : res.status === 500 && isJson ? "warn" : "fail",
      message:
        isJson && (res.status === 400 || res.ok)
          ? "CAPI endpoint is reachable and responding"
          : res.status === 500
          ? "CAPI endpoint reachable but returned 500 (check FACEBOOK_ACCESS_TOKEN)"
          : `CAPI endpoint returned ${res.status}`,
      messageHe:
        isJson && (res.status === 400 || res.ok)
          ? "נקודת קצה CAPI נגישה ומגיבה"
          : res.status === 500
          ? "נקודת קצה CAPI נגישה אך החזירה 500 (בדוק FACEBOOK_ACCESS_TOKEN)"
          : `נקודת קצה CAPI החזירה ${res.status}`,
      category: "api",
    });
  } catch (e) {
    results.push({
      name: "FB Conversions API (CAPI)",
      nameHe: "API המרות פייסבוק (CAPI)",
      status: "fail",
      message: `Cannot reach CAPI endpoint: ${String(e)}`,
      messageHe: `לא ניתן להגיע לנקודת קצה CAPI: ${String(e)}`,
      category: "api",
      details: String(e),
    });
  }

  // ── 2. Page Checks ─────────────────────────────────────
  const pagesToCheck = [
    { path: "/", name: "Homepage", nameHe: "דף הבית", checkAuraglow: false },
    { path: "/auraglow", name: "AuraGlow page", nameHe: "עמוד AuraGlow", checkAuraglow: true },
    { path: "/grandelash", name: "GrandeLash page", nameHe: "עמוד GrandeLash", checkAuraglow: false },
  ];

  for (const page of pagesToCheck) {
    try {
      const res = await fetch(`${baseUrl}${page.path}`, {
        headers: { Accept: "text/html" },
      });

      if (!res.ok) {
        results.push({
          name: `${page.name} — reachable`,
          nameHe: `${page.nameHe} — נגיש`,
          status: "fail",
          message: `Page returned ${res.status}`,
          messageHe: `העמוד החזיר ${res.status}`,
          category: "pages",
        });
        continue;
      }

      const html = await res.text();

      // Check fbevents.js
      const hasFbScript = html.includes("fbevents.js");
      results.push({
        name: `${page.name} — fbevents.js`,
        nameHe: `${page.nameHe} — fbevents.js`,
        status: hasFbScript ? "pass" : "fail",
        message: hasFbScript ? "fbevents.js found in page HTML" : "fbevents.js NOT found in page HTML",
        messageHe: hasFbScript ? "fbevents.js נמצא ב-HTML של העמוד" : "fbevents.js לא נמצא ב-HTML של העמוד",
        category: "pages",
      });

      // Check main Pixel ID
      const hasMainPixel = html.includes(MAIN_PIXEL_ID);
      results.push({
        name: `${page.name} — Main Pixel ID`,
        nameHe: `${page.nameHe} — מזהה פיקסל ראשי`,
        status: hasMainPixel ? "pass" : "fail",
        message: hasMainPixel ? `Pixel ID ${MAIN_PIXEL_ID} found` : `Pixel ID ${MAIN_PIXEL_ID} NOT found`,
        messageHe: hasMainPixel ? `מזהה פיקסל ${MAIN_PIXEL_ID} נמצא` : `מזהה פיקסל ${MAIN_PIXEL_ID} לא נמצא`,
        category: "pages",
      });

      // Check domain verification meta tag
      const hasDomainMeta = html.includes("facebook-domain-verification");
      results.push({
        name: `${page.name} — Domain verification`,
        nameHe: `${page.nameHe} — אימות דומיין`,
        status: hasDomainMeta ? "pass" : "fail",
        message: hasDomainMeta ? "Domain verification meta tag found" : "Domain verification meta tag NOT found",
        messageHe: hasDomainMeta ? "תגית אימות דומיין נמצאה" : "תגית אימות דומיין לא נמצאה",
        category: "pages",
      });

      // Check noscript fallback
      const hasNoscript = html.includes("facebook.com/tr");
      results.push({
        name: `${page.name} — Noscript fallback`,
        nameHe: `${page.nameHe} — גיבוי Noscript`,
        status: hasNoscript ? "pass" : "warn",
        message: hasNoscript ? "Noscript pixel fallback found" : "Noscript pixel fallback not found",
        messageHe: hasNoscript ? "גיבוי noscript נמצא" : "גיבוי noscript לא נמצא",
        category: "pages",
      });

      // Check AuraGlow pixel on /auraglow page
      if (page.checkAuraglow) {
        const hasAuraglowPixel = html.includes(AURAGLOW_PIXEL_ID);
        // The AuraGlow pixel is initialized client-side via useEffect in AuraGlowPixel.tsx,
        // so it won't appear in the server-rendered HTML. Check for the component instead.
        const hasAuraglowComponent = html.includes("AuraGlowPixel") || html.includes("auraglow");
        results.push({
          name: `${page.name} — AuraGlow Pixel ID`,
          nameHe: `${page.nameHe} — מזהה פיקסל AuraGlow`,
          status: hasAuraglowPixel ? "pass" : hasAuraglowComponent ? "pass" : "warn",
          message: hasAuraglowPixel
            ? `AuraGlow Pixel ID ${AURAGLOW_PIXEL_ID} found in HTML`
            : hasAuraglowComponent
            ? `AuraGlow pixel is loaded client-side via AuraGlowPixel component (ID: ${AURAGLOW_PIXEL_ID})`
            : `AuraGlow Pixel ID ${AURAGLOW_PIXEL_ID} not found in static HTML (may load client-side)`,
          messageHe: hasAuraglowPixel
            ? `מזהה פיקסל AuraGlow ${AURAGLOW_PIXEL_ID} נמצא ב-HTML`
            : hasAuraglowComponent
            ? `פיקסל AuraGlow נטען בצד הלקוח דרך רכיב AuraGlowPixel (מזהה: ${AURAGLOW_PIXEL_ID})`
            : `מזהה פיקסל AuraGlow ${AURAGLOW_PIXEL_ID} לא נמצא ב-HTML סטטי (ייתכן שנטען בצד הלקוח)`,
          category: "pages",
        });
      }

      // Check for Amazon affiliate buttons
      const amazonLinkRegex = /href="[^"]*amazon\.com[^"]*"/g;
      const amazonLinks = html.match(amazonLinkRegex) || [];
      results.push({
        name: `${page.name} — Amazon buttons`,
        nameHe: `${page.nameHe} — כפתורי אמזון`,
        status: amazonLinks.length > 0 ? "pass" : "warn",
        message:
          amazonLinks.length > 0
            ? `Found ${amazonLinks.length} Amazon affiliate link(s)`
            : "No Amazon affiliate links found",
        messageHe:
          amazonLinks.length > 0
            ? `נמצאו ${amazonLinks.length} קישורי שותפים לאמזון`
            : "לא נמצאו קישורי שותפים לאמזון",
        category: "buttons",
      });

      // Check affiliate tag
      const hasTag = html.includes("tag=") && html.includes("amazon.com");
      if (amazonLinks.length > 0) {
        results.push({
          name: `${page.name} — Affiliate tag`,
          nameHe: `${page.nameHe} — תגית שותפים`,
          status: hasTag ? "pass" : "warn",
          message: hasTag ? "Affiliate tag parameter found in Amazon links" : "No affiliate tag found in Amazon links",
          messageHe: hasTag ? "תגית שותפים נמצאה בקישורי אמזון" : "תגית שותפים לא נמצאה בקישורי אמזון",
          category: "buttons",
        });
      }
    } catch (e) {
      results.push({
        name: `${page.name} — reachable`,
        nameHe: `${page.nameHe} — נגיש`,
        status: "fail",
        message: `Cannot reach page: ${String(e)}`,
        messageHe: `לא ניתן להגיע לעמוד: ${String(e)}`,
        category: "pages",
        details: String(e),
      });
    }
  }

  // ── 3. Environment / Config Checks ─────────────────────
  const hasAccessToken = !!process.env.FACEBOOK_ACCESS_TOKEN;
  results.push({
    name: "FACEBOOK_ACCESS_TOKEN env",
    nameHe: "משתנה סביבה FACEBOOK_ACCESS_TOKEN",
    status: hasAccessToken ? "pass" : "fail",
    message: hasAccessToken ? "FACEBOOK_ACCESS_TOKEN is set" : "FACEBOOK_ACCESS_TOKEN is NOT set",
    messageHe: hasAccessToken ? "FACEBOOK_ACCESS_TOKEN מוגדר" : "FACEBOOK_ACCESS_TOKEN לא מוגדר",
    category: "config",
  });

  const hasAppId = !!process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  results.push({
    name: "NEXT_PUBLIC_FACEBOOK_APP_ID env",
    nameHe: "משתנה סביבה NEXT_PUBLIC_FACEBOOK_APP_ID",
    status: hasAppId ? "pass" : "warn",
    message: hasAppId ? "NEXT_PUBLIC_FACEBOOK_APP_ID is set" : "NEXT_PUBLIC_FACEBOOK_APP_ID is not set (optional)",
    messageHe: hasAppId ? "NEXT_PUBLIC_FACEBOOK_APP_ID מוגדר" : "NEXT_PUBLIC_FACEBOOK_APP_ID לא מוגדר (אופציונלי)",
    category: "config",
  });

  // ── Build response ─────────────────────────────────────
  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const warnings = results.filter((r) => r.status === "warn").length;

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passed,
      failed,
      warnings,
    },
    results,
  });
}
