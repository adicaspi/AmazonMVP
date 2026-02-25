"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────
type CheckStatus = "pass" | "fail" | "warn" | "running" | "pending";

type Check = {
  id: string;
  name: string;
  nameHe: string;
  status: CheckStatus;
  message: string;
  messageHe: string;
  details?: string;
  category: "pixel" | "events" | "pages" | "api" | "config" | "buttons";
};

type ServerResult = {
  name: string;
  nameHe: string;
  status: "pass" | "fail" | "warn";
  message: string;
  messageHe: string;
  details?: string;
  category?: string;
};

type ServerResponse = {
  timestamp: string;
  summary: { total: number; passed: number; failed: number; warnings: number };
  results: ServerResult[];
};

// ── Translations ───────────────────────────────────────
const t = {
  he: {
    title: "בדיקת Facebook Pixel",
    subtitle: "אבחון ובדיקה של כל רכיבי הפיקסל באתר",
    runTests: "הרץ בדיקות",
    running: "בודק...",
    backToAnalytics: "חזרה לדשבורד",
    summary: "סיכום",
    passed: "עברו",
    failed: "נכשלו",
    warnings: "אזהרות",
    pending: "ממתין",
    categoryPixel: "טעינת פיקסל",
    categoryEvents: "אירועי Pixel",
    categoryPages: "בדיקת עמודים",
    categoryApi: "בדיקת API",
    categoryButtons: "בדיקת כפתורים (דסקטופ + מובייל)",
    categoryConfig: "הגדרות",
    statusPass: "תקין",
    statusFail: "נכשל",
    statusWarn: "אזהרה",
    statusRunning: "בודק",
    statusPending: "ממתין",
    lastRun: "בדיקה אחרונה",
    never: "לא הורצה",
    noTestsYet: "לחץ על ״הרץ בדיקות״ כדי להתחיל",
    pixelIds: "מזהי פיקסל",
    mainPixel: "פיקסל ראשי",
    auraglowPixel: "פיקסל AuraGlow",
    allTestsPassed: "כל הבדיקות עברו בהצלחה!",
    someTestsFailed: "חלק מהבדיקות נכשלו — ראה פרטים למטה",
    details: "פרטים",
    clientChecks: "בדיקות צד לקוח (דפדפן)",
    serverChecks: "בדיקות צד שרת",
    fbqLoaded: "fbq() זמין",
    fbqNotLoaded: "fbq() לא זמין",
    pixelInitialized: "פיקסל מאותחל",
    fbqQueueExists: "תור fbq קיים",
    networkCheck: "בקשות רשת לפייסבוק",
    fireTestEvent: "שליחת אירוע בדיקה",
    testEventSent: "אירוע בדיקה נשלח בהצלחה",
    testEventFailed: "שליחת אירוע בדיקה נכשלה",
  },
  en: {
    title: "Facebook Pixel Debug",
    subtitle: "Diagnose and verify all pixel components on the site",
    runTests: "Run Tests",
    running: "Testing...",
    backToAnalytics: "Back to Dashboard",
    summary: "Summary",
    passed: "Passed",
    failed: "Failed",
    warnings: "Warnings",
    pending: "Pending",
    categoryPixel: "Pixel Loading",
    categoryEvents: "Pixel Events",
    categoryPages: "Page Checks",
    categoryApi: "API Checks",
    categoryButtons: "Button Check (Desktop + Mobile)",
    categoryConfig: "Configuration",
    statusPass: "Pass",
    statusFail: "Fail",
    statusWarn: "Warning",
    statusRunning: "Running",
    statusPending: "Pending",
    lastRun: "Last run",
    never: "Never",
    noTestsYet: "Click \"Run Tests\" to start",
    pixelIds: "Pixel IDs",
    mainPixel: "Main Pixel",
    auraglowPixel: "AuraGlow Pixel",
    allTestsPassed: "All tests passed!",
    someTestsFailed: "Some tests failed — see details below",
    details: "Details",
    clientChecks: "Client-side Checks (Browser)",
    serverChecks: "Server-side Checks",
    fbqLoaded: "fbq() is available",
    fbqNotLoaded: "fbq() is not available",
    pixelInitialized: "Pixel initialized",
    fbqQueueExists: "fbq queue exists",
    networkCheck: "Network requests to Facebook",
    fireTestEvent: "Send Test Event",
    testEventSent: "Test event sent successfully",
    testEventFailed: "Failed to send test event",
  },
};

// ── Helper: status icon ────────────────────────────────
function StatusIcon({ status }: { status: CheckStatus }) {
  switch (status) {
    case "pass":
      return (
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40">
          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      );
    case "fail":
      return (
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/40">
          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      );
    case "warn":
      return (
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/40">
          <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01M12 3l9.5 16.5H2.5L12 3z" />
          </svg>
        </span>
      );
    case "running":
      return (
        <span className="flex items-center justify-center w-6 h-6">
          <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      );
    default:
      return (
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-800">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
        </span>
      );
  }
}

// ── Main Component ─────────────────────────────────────
export default function FacebookDebugDashboard() {
  const [lang, setLang] = useState<"he" | "en">("he");
  const [darkMode, setDarkMode] = useState(false);
  const [checks, setChecks] = useState<Check[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);

  const tr = t[lang];
  const isRTL = lang === "he";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mq.matches);
    const h = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const dm = {
    bg: darkMode ? "bg-black" : "bg-gray-50",
    headerBg: darkMode ? "bg-black border-neutral-800" : "bg-white border-gray-200",
    cardBg: darkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-gray-200",
    text: darkMode ? "text-gray-100" : "text-gray-900",
    textMuted: darkMode ? "text-gray-400" : "text-gray-500",
    textLight: darkMode ? "text-gray-500" : "text-gray-400",
    divider: darkMode ? "divide-neutral-800" : "divide-gray-100",
    border: darkMode ? "border-neutral-800" : "border-gray-200",
  };

  // ── Client-side checks ───────────────────────────────
  const runClientChecks = useCallback((): Check[] => {
    const results: Check[] = [];

    // 1. Is fbq available?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fbq = (window as any).fbq;
    const hasFbq = typeof fbq === "function";
    results.push({
      id: "client-fbq-available",
      name: "fbq() function",
      nameHe: "פונקציית fbq()",
      status: hasFbq ? "pass" : "fail",
      message: hasFbq ? "fbq() is available on window" : "fbq() is NOT available on window",
      messageHe: hasFbq ? "fbq() זמין ב-window" : "fbq() לא זמין ב-window",
      category: "pixel",
    });

    // 2. Is fbq loaded (not just stub)?
    if (hasFbq) {
      const isLoaded = fbq.loaded === true;
      results.push({
        id: "client-fbq-loaded",
        name: "fbq loaded flag",
        nameHe: "fbq טעון",
        status: isLoaded ? "pass" : "warn",
        message: isLoaded ? "fbq.loaded = true (SDK fully loaded)" : "fbq.loaded is not true (SDK may still be loading)",
        messageHe: isLoaded ? "fbq.loaded = true (ה-SDK נטען במלואו)" : "fbq.loaded לא true (ה-SDK עדיין נטען)",
        category: "pixel",
      });

      // 3. Check fbq version
      const version = fbq.version;
      results.push({
        id: "client-fbq-version",
        name: "fbq version",
        nameHe: "גרסת fbq",
        status: version ? "pass" : "warn",
        message: version ? `fbq version: ${version}` : "Could not read fbq version",
        messageHe: version ? `גרסת fbq: ${version}` : "לא ניתן לקרוא גרסת fbq",
        category: "pixel",
      });

      // 4. Check queue
      const hasQueue = Array.isArray(fbq.queue);
      results.push({
        id: "client-fbq-queue",
        name: "fbq queue",
        nameHe: "תור fbq",
        status: hasQueue ? "pass" : "warn",
        message: hasQueue ? `Queue exists (${fbq.queue.length} pending items)` : "No queue found",
        messageHe: hasQueue ? `תור קיים (${fbq.queue.length} פריטים ממתינים)` : "תור לא נמצא",
        category: "pixel",
      });
    }

    // 5. Check fbevents.js script tag
    const scripts = document.querySelectorAll("script");
    let foundFbScript = false;
    scripts.forEach((s) => {
      if (s.src?.includes("fbevents.js") || s.textContent?.includes("fbevents.js")) {
        foundFbScript = true;
      }
    });
    results.push({
      id: "client-script-tag",
      name: "fbevents.js script",
      nameHe: "תגית סקריפט fbevents.js",
      status: foundFbScript ? "pass" : "fail",
      message: foundFbScript ? "fbevents.js script tag found in DOM" : "fbevents.js script tag NOT found in DOM",
      messageHe: foundFbScript ? "תגית סקריפט fbevents.js נמצאה ב-DOM" : "תגית סקריפט fbevents.js לא נמצאה ב-DOM",
      category: "pixel",
    });

    // 6. Check domain verification meta tag
    const metaTag = document.querySelector('meta[name="facebook-domain-verification"]');
    results.push({
      id: "client-domain-verification",
      name: "Domain verification meta",
      nameHe: "תגית אימות דומיין",
      status: metaTag ? "pass" : "fail",
      message: metaTag ? `Domain verification: ${metaTag.getAttribute("content")}` : "facebook-domain-verification meta tag not found",
      messageHe: metaTag ? `אימות דומיין: ${metaTag.getAttribute("content")}` : "תגית אימות דומיין לא נמצאה",
      category: "config",
    });

    // 7. Check noscript fallback
    const noscripts = document.querySelectorAll("noscript");
    let hasNoscriptPixel = false;
    noscripts.forEach((ns) => {
      if (ns.innerHTML?.includes("facebook.com/tr")) {
        hasNoscriptPixel = true;
      }
    });
    results.push({
      id: "client-noscript",
      name: "Noscript fallback",
      nameHe: "גיבוי Noscript",
      status: hasNoscriptPixel ? "pass" : "warn",
      message: hasNoscriptPixel ? "Noscript pixel fallback found" : "Noscript pixel fallback not found",
      messageHe: hasNoscriptPixel ? "גיבוי noscript לפיקסל נמצא" : "גיבוי noscript לפיקסל לא נמצא",
      category: "pixel",
    });

    // 8. Test firing an event
    if (hasFbq) {
      try {
        fbq("trackCustom", "DebugTest", {
          test: true,
          timestamp: new Date().toISOString(),
        });
        results.push({
          id: "client-test-event",
          name: "Test event fire",
          nameHe: "שליחת אירוע בדיקה",
          status: "pass",
          message: "Successfully called fbq('trackCustom', 'DebugTest') — no errors thrown",
          messageHe: "הצלחנו לקרוא ל-fbq('trackCustom', 'DebugTest') — ללא שגיאות",
          category: "events",
        });
      } catch (e) {
        results.push({
          id: "client-test-event",
          name: "Test event fire",
          nameHe: "שליחת אירוע בדיקה",
          status: "fail",
          message: `Error firing test event: ${String(e)}`,
          messageHe: `שגיאה בשליחת אירוע בדיקה: ${String(e)}`,
          category: "events",
          details: String(e),
        });
      }
    }

    // 9. Check if pixel network requests can be observed
    // We check for existing facebook pixel image requests
    const perfEntries = performance.getEntriesByType("resource");
    const fbRequests = perfEntries.filter(
      (e) => e.name.includes("facebook.com/tr") || e.name.includes("facebook.net")
    );
    results.push({
      id: "client-network-requests",
      name: "Facebook network requests",
      nameHe: "בקשות רשת לפייסבוק",
      status: fbRequests.length > 0 ? "pass" : "warn",
      message:
        fbRequests.length > 0
          ? `Found ${fbRequests.length} requests to Facebook servers`
          : "No Facebook network requests detected (pixel may be blocked by ad-blocker)",
      messageHe:
        fbRequests.length > 0
          ? `נמצאו ${fbRequests.length} בקשות לשרתי Facebook`
          : "לא נמצאו בקשות רשת לפייסבוק (ייתכן שחוסם פרסומות פעיל)",
      category: "events",
    });

    return results;
  }, []);

  // ── Run all checks ───────────────────────────────────
  const runAllChecks = useCallback(async () => {
    setIsRunning(true);
    setExpandedCheck(null);
    const allChecks: Check[] = [];

    // Phase 1: Client-side checks
    const clientResults = runClientChecks();
    allChecks.push(...clientResults);
    setChecks([...allChecks]);

    // Phase 2: Server-side checks
    const serverPlaceholders: Check[] = [
      { id: "server-loading", name: "Server checks", nameHe: "בדיקות שרת", status: "running", message: "Running server-side diagnostics...", messageHe: "מריץ בדיקות בצד השרת...", category: "api" },
    ];
    setChecks([...allChecks, ...serverPlaceholders]);

    try {
      const baseUrl = window.location.origin;
      const res = await fetch(`/api/facebook-debug?baseUrl=${encodeURIComponent(baseUrl)}`);
      const data: ServerResponse = await res.json();

      const serverChecks: Check[] = data.results.map((r, i) => {
        // Use category from server if provided, otherwise infer
        let category: Check["category"] = "pages";
        if (r.category && ["pixel", "events", "pages", "api", "config", "buttons"].includes(r.category)) {
          category = r.category as Check["category"];
        } else if (r.name.includes("API")) category = "api";
        else if (r.name.includes("env") || r.name.includes("Domain") || r.name.includes("Noscript")) category = "config";
        else if (r.name.includes("fbevents") || r.name.includes("Pixel ID")) category = "pixel";

        return {
          id: `server-${i}`,
          name: r.name,
          nameHe: r.nameHe,
          status: r.status,
          message: r.message,
          messageHe: r.messageHe,
          details: r.details,
          category,
        };
      });

      allChecks.push(...serverChecks);
      setChecks([...allChecks]);
    } catch (e) {
      allChecks.push({
        id: "server-error",
        name: "Server diagnostics",
        nameHe: "בדיקות שרת",
        status: "fail",
        message: `Failed to reach server: ${String(e)}`,
        messageHe: `לא הצלחנו להגיע לשרת: ${String(e)}`,
        category: "api",
        details: String(e),
      });
      setChecks([...allChecks]);
    }

    setLastRun(new Date().toISOString());
    setIsRunning(false);
  }, [runClientChecks]);

  // ── Stats ────────────────────────────────────────────
  const passed = checks.filter((c) => c.status === "pass").length;
  const failed = checks.filter((c) => c.status === "fail").length;
  const warnings = checks.filter((c) => c.status === "warn").length;
  const total = checks.filter((c) => c.status !== "running" && c.status !== "pending").length;

  // ── Group checks by category ─────────────────────────
  const categories: { key: Check["category"]; label: string }[] = [
    { key: "pixel", label: tr.categoryPixel },
    { key: "events", label: tr.categoryEvents },
    { key: "buttons", label: tr.categoryButtons },
    { key: "pages", label: tr.categoryPages },
    { key: "api", label: tr.categoryApi },
    { key: "config", label: tr.categoryConfig },
  ];

  const grouped = categories
    .map((cat) => ({
      ...cat,
      checks: checks.filter((c) => c.category === cat.key),
    }))
    .filter((g) => g.checks.length > 0);

  return (
    <main className={`min-h-screen ${dm.bg} transition-colors duration-300`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className={`${dm.headerBg} border-b sticky top-0 z-30 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${dm.text}`}>{tr.title}</h1>
              <p className={`text-sm ${dm.textMuted}`}>{tr.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition ${darkMode ? "bg-neutral-800 hover:bg-neutral-700 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>
              <button
                onClick={() => setLang(lang === "he" ? "en" : "he")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${darkMode ? "bg-neutral-800 hover:bg-neutral-700 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                {lang === "he" ? "EN" : "HE"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Navigation + Run Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/analytics"
            className={`text-sm ${dm.textMuted} hover:underline flex items-center gap-1`}
          >
            <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {tr.backToAnalytics}
          </Link>

          <button
            onClick={runAllChecks}
            disabled={isRunning}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              isRunning
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {tr.running}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tr.runTests}
              </span>
            )}
          </button>
        </div>

        {/* Pixel IDs Info Card */}
        <div className={`${dm.cardBg} rounded-xl border p-4 transition-colors duration-300`}>
          <h3 className={`text-sm font-semibold ${dm.text} mb-3`}>{tr.pixelIds}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-neutral-800" : "bg-gray-50"}`}>
              <div className={`text-xs ${dm.textMuted} mb-1`}>AIPicksGrandLash</div>
              <div className={`text-sm font-mono font-bold ${dm.text}`}>876318711699041</div>
              <div className={`text-xs ${dm.textLight} mt-1`}>/grandelash only</div>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? "bg-neutral-800" : "bg-gray-50"}`}>
              <div className={`text-xs ${dm.textMuted} mb-1`}>AuraglowTeethWhiteningKit</div>
              <div className={`text-sm font-mono font-bold ${dm.text}`}>2679443682454721</div>
              <div className={`text-xs ${dm.textLight} mt-1`}>/auraglow only</div>
            </div>
          </div>
        </div>

        {/* No tests yet */}
        {checks.length === 0 && !isRunning && (
          <div className={`${dm.cardBg} rounded-xl border p-12 text-center transition-colors duration-300`}>
            <div className="mb-4">
              <svg className={`w-16 h-16 mx-auto ${dm.textLight}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className={`text-lg font-medium ${dm.text}`}>{tr.noTestsYet}</p>
          </div>
        )}

        {/* Summary Cards */}
        {checks.length > 0 && (
          <>
            {/* Overall Status Banner */}
            <div
              className={`rounded-xl p-4 border ${
                failed > 0
                  ? darkMode
                    ? "bg-red-900/20 border-red-800"
                    : "bg-red-50 border-red-200"
                  : darkMode
                  ? "bg-green-900/20 border-green-800"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {failed > 0 ? (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className={`font-semibold ${failed > 0 ? (darkMode ? "text-red-300" : "text-red-800") : darkMode ? "text-green-300" : "text-green-800"}`}>
                  {failed > 0 ? tr.someTestsFailed : tr.allTestsPassed}
                </span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3">
              <div className={`${dm.cardBg} rounded-xl p-4 border text-center transition-colors duration-300`}>
                <div className="text-2xl font-bold text-green-500">{passed}</div>
                <div className={`text-xs ${dm.textMuted}`}>{tr.passed}</div>
              </div>
              <div className={`${dm.cardBg} rounded-xl p-4 border text-center transition-colors duration-300`}>
                <div className="text-2xl font-bold text-red-500">{failed}</div>
                <div className={`text-xs ${dm.textMuted}`}>{tr.failed}</div>
              </div>
              <div className={`${dm.cardBg} rounded-xl p-4 border text-center transition-colors duration-300`}>
                <div className="text-2xl font-bold text-yellow-500">{warnings}</div>
                <div className={`text-xs ${dm.textMuted}`}>{tr.warnings}</div>
              </div>
              <div className={`${dm.cardBg} rounded-xl p-4 border text-center transition-colors duration-300`}>
                <div className={`text-2xl font-bold ${dm.text}`}>{total}</div>
                <div className={`text-xs ${dm.textMuted}`}>{tr.summary}</div>
              </div>
            </div>

            {/* Last Run */}
            {lastRun && (
              <p className={`text-xs ${dm.textLight} text-center`}>
                {tr.lastRun}: {new Date(lastRun).toLocaleString(lang === "he" ? "he-IL" : "en-US", { timeZone: "America/New_York" })}
              </p>
            )}

            {/* Grouped Results */}
            {grouped.map((group) => (
              <section key={group.key}>
                <h2 className={`text-base font-semibold ${dm.text} mb-3 flex items-center gap-2`}>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      group.key === "pixel"
                        ? "bg-blue-500"
                        : group.key === "events"
                        ? "bg-purple-500"
                        : group.key === "buttons"
                        ? "bg-pink-500"
                        : group.key === "pages"
                        ? "bg-emerald-500"
                        : group.key === "api"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  />
                  {group.label}
                  <span className={`text-xs ${dm.textLight} font-normal`}>
                    ({group.checks.filter((c) => c.status === "pass").length}/{group.checks.length})
                  </span>
                </h2>

                <div className={`${dm.cardBg} rounded-xl border overflow-hidden transition-colors duration-300`}>
                  <div className={`divide-y ${dm.divider}`}>
                    {group.checks.map((check) => (
                      <div key={check.id}>
                        <button
                          onClick={() => setExpandedCheck(expandedCheck === check.id ? null : check.id)}
                          className={`w-full p-3 flex items-center gap-3 transition ${
                            darkMode ? "hover:bg-neutral-800" : "hover:bg-gray-50"
                          }`}
                        >
                          <StatusIcon status={check.status} />
                          <div className={`flex-1 text-${isRTL ? "right" : "left"} min-w-0`}>
                            <div className={`text-sm font-medium ${dm.text} truncate`}>
                              {lang === "he" ? check.nameHe : check.name}
                            </div>
                            <div className={`text-xs ${dm.textMuted} truncate`}>
                              {lang === "he" ? check.messageHe : check.message}
                            </div>
                          </div>
                          <svg
                            className={`w-4 h-4 ${dm.textLight} transition-transform ${expandedCheck === check.id ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {expandedCheck === check.id && (
                          <div className={`px-4 pb-3 ${darkMode ? "bg-neutral-800/50" : "bg-gray-50"}`}>
                            <div className={`text-xs ${dm.textMuted} p-3 rounded-lg font-mono ${darkMode ? "bg-black" : "bg-white"} border ${dm.border}`}>
                              <div><strong>{tr.details}:</strong></div>
                              <div className="mt-1">{lang === "he" ? check.messageHe : check.message}</div>
                              {check.details && (
                                <div className="mt-2 text-red-400 break-all">{check.details}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
