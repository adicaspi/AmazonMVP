"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NY_TZ = "America/New_York";

type RecentClick = {
  id: string;
  timestamp: string;
  product_name: string;
  button_position: string;
  page: string;
  device_type?: string;
};

type RecentVisit = {
  id: string;
  timestamp: string;
  page: string;
  utm_source: string | null;
  device_type: string;
  full_url: string | null;
  visitor_id: string | null;
  clicked_amazon: boolean;
};

type PageData = {
  page: string;
  label: string;
  color: string;
  views: number;
  totalClicks: number;
  todayClicks: number;
  weekClicks: number;
  bestButton: string | null;
  byPosition: Record<string, number>;
  byPositionDevice: Record<string, Record<string, number>>;
  byDay: Record<string, number>;
  byDevice: Record<string, number>;
  recentClicks: RecentClick[];
  peakHour: number | null;
  trafficSources: Record<string, number>;
  viewDeviceCounts: Record<string, number>;
  sourceDeviceBreakdown: Record<string, Record<string, number>>;
  recentVisits: RecentVisit[];
};

type FacebookCampaign = {
  campaign_name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  costPerConversion: number;
  conversionEventName: string;
};

type FacebookAdsData = {
  campaigns: FacebookCampaign[];
  totalSpend: number;
  totalConversions: number;
  avgCostPerConversion: number;
  todaySpend: number;
  currency: string;
};

interface Props {
  allData: PageData;
  pagesData: PageData[];
  facebookAdsData: FacebookAdsData | null;
}

const translations = {
  he: {
    title: "Analytics Dashboard",
    subtitle: "מעקב ביצועים — כל העמודים",
    allPages: "הכל",
    conversionFunnel: "משפך המרה",
    funnelDesc: "כמה אנשים ביקרו בעמוד וכמה מהם לחצו לאמזון",
    pageViews: "צפיות בעמוד",
    amazonClicks: "לחיצות לאמזון",
    conversion: "המרה",
    views: "צפיות",
    clicks: "לחיצות",
    quickSummary: "סיכום מהיר",
    totalClicks: "סה״כ לחיצות",
    today: "היום",
    todayDesc: "לחיצות שהתקבלו היום",
    thisWeek: "השבוע",
    thisWeekDesc: "לחיצות ב-7 הימים האחרונים",
    bestButton: "הכפתור הטוב",
    noData: "אין נתונים",
    buttonPerformance: "ביצועים לפי כפתור",
    buttonPerformanceDesc: "איזה כפתורים בעמוד מביאים הכי הרבה לחיצות",
    noClickData: "עדיין אין נתונים על לחיצות",
    noClickDataDesc: "ברגע שמישהו ילחץ על כפתור לאמזון, הנתונים יופיעו כאן",
    insights: "תובנות",
    winningButton: "הכפתור המנצח",
    peakHour: "שעת השיא",
    peakHourDesc: "רוב הלחיצות מגיעות בשעה",
    mobileTraffic: "תנועה ממובייל",
    mobileClicksFrom: "לחיצות מהכפתור הצף במובייל",
    tip: "טיפ",
    tipText: "כפתורים בסוף העמוד מראים שאנשים קוראים את כל התוכן לפני שמחליטים לקנות",
    recentClicks: "לחיצות אחרונות",
    recentClicksDesc: "15 הלחיצות האחרונות בזמן אמת",
    dateTime: "תאריך ושעה",
    button: "כפתור",
    product: "מוצר",
    page: "עמוד",
    noClicksYet: "אין לחיצות עדיין",
    noClicksYetDesc: "לחיצות חדשות יופיעו כאן בזמן אמת",
    dailyClicks: "לחיצות לפי יום",
    todayLabel: "היום",
    trafficSources: "מקורות תנועה",
    trafficSourcesDesc: "מאיפה המבקרים הגיעו לעמוד",
    direct: "ישיר",
    noTrafficData: "אין נתונים על מקורות תנועה",
    conversionExcellent: "שיעור המרה מעולה!",
    conversionGood: "שיעור המרה טוב.",
    conversionImprove: "יש מקום לשיפור.",
    ofVisitorsClick: "מהמבקרים לוחצים לאמזון.",
    bringsClicks: "מביא",
    clicksWord: "לחיצות",
    ofAllClicks: "מכל הלחיצות",
    helpTitle: "מה המספרים האלה אומרים?",
    helpClick: "לחיצה לאמזון",
    helpClickDesc: "כל פעם שמישהו לוחץ על כפתור ועובר לאמזון, זה נספר כלחיצה.",
    helpWhyButton: "למה חשוב לדעת איזה כפתור?",
    helpWhyButtonDesc: "אם רוב הלחיצות מגיעות מכפתור מסוים, כדאי לשים שם יותר דגש.",
    helpWorking: "איך לדעת אם זה עובד?",
    helpWorkingDesc: "אם יש לחיצות, העמוד עובד! בדקו בחשבון Amazon Associates כמה הפכו לרכישות.",
    helpPixel: "מה עם Facebook Pixel?",
    helpPixelDesc: "כל לחיצה נשלחת גם ל-Facebook כ-Lead. אפשר לראות את זה ב-Events Manager.",
    pageOverview: "סקירת עמודים",
    pageOverviewDesc: "סטטיסטיקות מהירות לכל עמוד",
    deviceBreakdown: "פילוח לפי מכשיר",
    deviceBreakdownDesc: "מובייל מול דסקטופ — צפיות ולחיצות",
    mobile: "מובייל",
    desktop: "דסקטופ",
    tablet: "טאבלט",
    unknown: "לא ידוע",
    viewsLabel: "צפיות",
    clicksLabel: "לחיצות",
    clickLog: "יומן לחיצות מפורט",
    clickLogDesc: "כל לחיצה עם כפתור, שעה מדויקת, מכשיר ועמוד",
    time: "שעה",
    device: "מכשיר",
    noDeviceData: "אין נתוני מכשיר עדיין",
    recentVisits: "ביקורים אחרונים",
    recentVisitsDesc: "כל ביקור עם הקישור המלא שדרכו הגיעו",
    landingUrl: "קישור כניסה",
    source: "מקור",
    amazon: "אמזון",
    clickedToAmazon: "לחץ לאמזון",
    noVisitsYet: "אין ביקורים עדיין",
    directVisit: "ישיר",
    fbAds: "Facebook Ads",
    fbAdsDesc: "ביצועי קמפיינים ב-7 הימים האחרונים",
    fbTotalSpend: "הוצאה כוללת",
    fbConversions: "המרות",
    fbCostPerConv: "עלות להמרה",
    fbTodaySpend: "הוצאה היום",
    fbCampaign: "קמפיין",
    fbSpend: "הוצאה",
    fbNoData: "אין נתוני מודעות — יש לוודא שה-Token כולל הרשאת ads_read וש-FACEBOOK_AD_ACCOUNT_ID מוגדר",
    fbLast7d: "7 ימים",
  },
  en: {
    title: "Analytics Dashboard",
    subtitle: "Performance tracking — all pages",
    allPages: "All",
    conversionFunnel: "Conversion Funnel",
    funnelDesc: "How many people visited the page and how many clicked to Amazon",
    pageViews: "Page Views",
    amazonClicks: "Amazon Clicks",
    conversion: "Conversion",
    views: "Views",
    clicks: "Clicks",
    quickSummary: "Quick Summary",
    totalClicks: "Total Clicks",
    today: "Today",
    todayDesc: "Clicks received today",
    thisWeek: "This Week",
    thisWeekDesc: "Clicks in the last 7 days",
    bestButton: "Best Button",
    noData: "No data",
    buttonPerformance: "Button Performance",
    buttonPerformanceDesc: "Which buttons on the page drive the most clicks",
    noClickData: "No click data yet",
    noClickDataDesc: "Once someone clicks an Amazon button, the data will appear here",
    insights: "Insights",
    winningButton: "Winning Button",
    peakHour: "Peak Hour",
    peakHourDesc: "Most clicks come at",
    mobileTraffic: "Mobile Traffic",
    mobileClicksFrom: "clicks from the sticky mobile button",
    tip: "Tip",
    tipText: "Buttons at the end of the page show that people read all the content before buying",
    recentClicks: "Recent Clicks",
    recentClicksDesc: "Last 15 clicks in real-time",
    dateTime: "Date & Time",
    button: "Button",
    product: "Product",
    page: "Page",
    noClicksYet: "No clicks yet",
    noClicksYetDesc: "New clicks will appear here in real-time",
    dailyClicks: "Daily Clicks",
    todayLabel: "Today",
    trafficSources: "Traffic Sources",
    trafficSourcesDesc: "Where visitors came from",
    direct: "Direct",
    noTrafficData: "No traffic source data",
    conversionExcellent: "Excellent conversion rate!",
    conversionGood: "Good conversion rate.",
    conversionImprove: "Room for improvement.",
    ofVisitorsClick: "of visitors click to Amazon.",
    bringsClicks: "brings",
    clicksWord: "clicks",
    ofAllClicks: "of all clicks",
    helpTitle: "What do these numbers mean?",
    helpClick: "Amazon Click",
    helpClickDesc: "Every time someone clicks a button and goes to Amazon, it counts as a click.",
    helpWhyButton: "Why is button position important?",
    helpWhyButtonDesc: "If most clicks come from a specific button, focus more there.",
    helpWorking: "How do I know it's working?",
    helpWorkingDesc: "If there are clicks, the page is working! Check Amazon Associates for actual purchases.",
    helpPixel: "What about Facebook Pixel?",
    helpPixelDesc: "Every click is also sent to Facebook as a Lead event. Use Events Manager for retargeting.",
    pageOverview: "Page Overview",
    pageOverviewDesc: "Quick stats for each page",
    deviceBreakdown: "Device Breakdown",
    deviceBreakdownDesc: "Mobile vs Desktop — views and clicks",
    mobile: "Mobile",
    desktop: "Desktop",
    tablet: "Tablet",
    unknown: "Unknown",
    viewsLabel: "Views",
    clicksLabel: "Clicks",
    clickLog: "Detailed Click Log",
    clickLogDesc: "Every click with button, exact time, device and page",
    time: "Time",
    device: "Device",
    noDeviceData: "No device data yet",
    recentVisits: "Recent Visits",
    recentVisitsDesc: "Every visit with the full landing URL",
    landingUrl: "Landing URL",
    source: "Source",
    amazon: "Amazon",
    clickedToAmazon: "Clicked to Amazon",
    noVisitsYet: "No visits yet",
    directVisit: "Direct",
    fbAds: "Facebook Ads",
    fbAdsDesc: "Campaign performance over the last 7 days",
    fbTotalSpend: "Total Spend",
    fbConversions: "Conversions",
    fbCostPerConv: "Cost / Conv",
    fbTodaySpend: "Today's Spend",
    fbCampaign: "Campaign",
    fbSpend: "Spend",
    fbNoData: "No ads data — verify your token has ads_read permission and FACEBOOK_AD_ACCOUNT_ID is set",
    fbLast7d: "7 days",
  },
};

const positionLabels: Record<string, { he: string; en: string }> = {
  "hero-main": { he: "כפתור ראשי (Hero)", en: "Main Button (Hero)" },
  "comparison-table": { he: "טבלת השוואה", en: "Comparison Table" },
  "benefits-card": { he: "כרטיס יתרונות", en: "Benefits Card" },
  "how-it-works": { he: "איך זה עובד", en: "How It Works" },
  "video-testimonials": { he: "סרטוני המלצות", en: "Video Testimonials" },
  "reviews-section": { he: "סקשן ביקורות", en: "Reviews Section" },
  "faq-section": { he: "שאלות נפוצות", en: "FAQ Section" },
  "final-cta": { he: "CTA סופי", en: "Final CTA" },
  "sticky-mobile": { he: "כפתור צף (מובייל)", en: "Sticky (Mobile)" },
};

const pageLabels: Record<string, string> = {
  "/auraglow": "AuraGlow",
  "/grandelash": "GrandeLash",
};

export default function AnalyticsDashboard({ allData, pagesData, facebookAdsData }: Props) {
  const router = useRouter();
  const [lang, setLang] = useState<"he" | "en">("he");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const t = translations[lang];
  const isRTL = lang === "he";
  const today = new Date().toLocaleDateString("en-CA", { timeZone: NY_TZ });

  // Get current data based on selection
  const data = selectedPage === "all" ? allData : pagesData.find((p) => p.page === selectedPage) || allData;

  const [nyTime, setNyTime] = useState("");
  useEffect(() => {
    const tick = () => setNyTime(new Date().toLocaleTimeString("en-US", { timeZone: NY_TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => router.refresh(), 10000);
    return () => clearInterval(interval);
  }, [router]);

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
    tableBg: darkMode ? "bg-neutral-800/50" : "bg-gray-50",
    tableHover: darkMode ? "hover:bg-neutral-800" : "hover:bg-gray-50",
    divider: darkMode ? "divide-neutral-800" : "divide-gray-100",
    border: darkMode ? "border-neutral-800" : "border-gray-200",
    barBg: darkMode ? "bg-neutral-800" : "bg-gray-100",
    helpBg: darkMode ? "bg-neutral-900" : "bg-gray-100",
    tabActive: darkMode ? "bg-neutral-800 text-white" : "bg-white text-gray-900 shadow-sm",
    tabInactive: darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700",
  };

  const conversionRate = data.views > 0 ? ((data.totalClicks / data.views) * 100).toFixed(1) : "0";

  const getButtonLabel = (position: string) => {
    const label = positionLabels[position];
    if (!label) return position;
    return lang === "he" ? label.he : label.en;
  };

  const getDeviceLabel = (device: string) => {
    if (device === "mobile") return t.mobile;
    if (device === "desktop") return t.desktop;
    if (device === "tablet") return t.tablet;
    return t.unknown;
  };

  const getDeviceIcon = (device: string) => {
    if (device === "mobile") return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" strokeWidth="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>
    );
    if (device === "tablet") return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>
    );
    return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/><path d="M8 21h8M12 17v4" strokeWidth="2" strokeLinecap="round"/></svg>
    );
  };

  const getSourceIcon = (source: string) => {
    if (source === "campaign")
      return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
    if (source === "fb" || source.includes("facebook") || source === "an" || source === "audience_network")
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    if (source === "ig" || source.includes("instagram"))
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#E1306C"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    if (source.includes("google"))
      return <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;
    if (source.includes("tiktok"))
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill={darkMode ? "#fff" : "#000"}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
    return <span className={`w-4 h-4 inline-block rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></span>;
  };

  const getSourceDisplayName = (source: string) => {
    if (source === "Direct") return t.direct;
    if (source === "campaign") return lang === "he" ? "קמפיין (לא מזוהה)" : "Campaign (Unknown)";
    if (source === "an" || source === "audience_network") return "Audience Network";
    if (source === "fb" || source.includes("facebook")) return "Facebook";
    if (source === "ig" || source.includes("instagram")) return "Instagram";
    if (source.includes("google")) return "Google";
    if (source.includes("tiktok")) return "TikTok";
    return source;
  };

  return (
    <main className={`min-h-screen ${dm.bg} transition-colors duration-300`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className={`${dm.headerBg} border-b sticky top-0 z-30 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-xl font-bold ${dm.text}`}>{t.title}</h1>
              <div className="flex items-center gap-2">
                <p className={`text-sm ${dm.textMuted}`}>{t.subtitle}</p>
                {nyTime && (
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${darkMode ? "bg-neutral-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                    NYC {nyTime}
                  </span>
                )}
              </div>
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

          {/* Page Tabs */}
          <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? "bg-neutral-900" : "bg-gray-100"}`}>
            <button
              onClick={() => setSelectedPage("all")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${selectedPage === "all" ? dm.tabActive : dm.tabInactive}`}
            >
              {t.allPages}
            </button>
            {pagesData.map((p) => (
              <button
                key={p.page}
                onClick={() => setSelectedPage(p.page)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${selectedPage === p.page ? dm.tabActive : dm.tabInactive}`}
              >
                <span>{p.label}</span>
                {p.todayClicks > 0 && (
                  <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {p.todayClicks}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-2">
          <a
            href="/analytics/facebook-debug"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 border border-blue-800" : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Pixel Debug
          </a>
          <a
            href="/auraglow"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-cyan-900/40 text-cyan-300 hover:bg-cyan-900/60 border border-cyan-800" : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200"}`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            AuraGlow
          </a>
          <a
            href="/grandelash"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-rose-900/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800" : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"}`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            GrandeLash
          </a>
          <a
            href="https://eventsmanager.facebook.com/events_manager2/list/dataset/2679443682454721/overview?business_id=758181023519141&nav_source=events_manager"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-indigo-900/40 text-indigo-300 hover:bg-indigo-900/60 border border-indigo-800" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Events Manager
          </a>
          <a
            href="https://supabase.com/dashboard/project/uoydxjnbqbifcaigeexg/sql/69b2de36-a9ee-4ad4-8e72-c7eedc806b70"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-emerald-900/40 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
            Supabase
          </a>
          <a
            href="https://vercel.com/ranis-projects-7f7129ce/amazonmvp/deployments"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L24 22H0L12 1Z"/></svg>
            Vercel
          </a>
          <a
            href="https://affiliate-program.amazon.com/home"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${darkMode ? "bg-orange-900/40 text-orange-300 hover:bg-orange-900/60 border border-orange-800" : "bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200"}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.072-.116.187-.124.348-.022 2.344 1.47 4.882 2.208 7.614 2.208 2.51 0 4.907-.572 7.19-1.716 2.283-1.144 4.218-2.787 5.805-4.93.088-.122.165-.13.234-.02.036.065.018.155-.055.27-.914 1.436-2.068 2.7-3.46 3.79a18.14 18.14 0 01-4.608 2.588c-1.674.658-3.42.988-5.237.988-1.564 0-3.082-.275-4.554-.825-1.472-.55-2.78-1.32-3.925-2.31-.064-.056-.08-.1-.045-.134zm6.664-7.46c0-.98.234-1.82.703-2.52.47-.7 1.108-1.243 1.914-1.628a6.52 6.52 0 012.714-.577c.96 0 1.832.17 2.616.51v.544c0 .648-.147 1.296-.44 1.943-.294.648-.7 1.164-1.218 1.55-.518.386-1.044.58-1.578.58-.352 0-.6-.097-.742-.293-.143-.196-.165-.458-.066-.786.22-.73.33-1.206.33-1.428 0-.462-.183-.693-.55-.693-.44 0-.876.27-1.307.81-.43.54-.646 1.17-.646 1.89 0 .882.37 1.51 1.11 1.884-.352 1.386-.603 2.36-.753 2.92-.15.56-.22 1.146-.22 1.76 0 .136.012.338.036.604.024.266.06.47.108.61-.648-.302-1.19-.78-1.627-1.432-.437-.652-.655-1.39-.655-2.21 0-.418.068-.978.204-1.68.136-.703.33-1.486.58-2.35-.723-.35-1.085-.96-1.085-1.83zm0 0"/></svg>
            Amazon Affiliates
          </a>
        </div>

        {/* Page Overview Cards (only show in "All" view) */}
        {selectedPage === "all" && (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-3 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              {t.pageOverview}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pagesData.map((p) => {
                const cr = p.views > 0 ? ((p.totalClicks / p.views) * 100).toFixed(1) : "0";
                return (
                  <button
                    key={p.page}
                    onClick={() => setSelectedPage(p.page)}
                    className={`${dm.cardBg} rounded-xl border p-5 transition-all hover:scale-[1.01] hover:shadow-md text-${isRTL ? "right" : "left"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${p.color === "blue" ? "bg-blue-500" : "bg-rose-500"}`}></span>
                        <span className={`font-semibold ${dm.text}`}>{p.label}</span>
                      </div>
                      <Link
                        href={p.page}
                        className={`text-xs ${dm.textMuted} hover:underline`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.page} &rarr;
                      </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <div className={`text-2xl font-bold ${dm.text}`}>{p.views}</div>
                        <div className={`text-xs ${dm.textMuted}`}>{t.views}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-500">{p.totalClicks}</div>
                        <div className={`text-xs ${dm.textMuted}`}>{t.clicks}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-500">{p.todayClicks}</div>
                        <div className={`text-xs ${dm.textMuted}`}>{t.today}</div>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${parseFloat(cr) >= 20 ? "text-emerald-500" : dm.text}`}>{cr}%</div>
                        <div className={`text-xs ${dm.textMuted}`}>{t.conversion}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Conversion Funnel */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            {t.conversionFunnel}
          </h2>
          <p className={`text-sm ${dm.textMuted} mb-3`}>{t.funnelDesc}</p>

          <div className={`${dm.cardBg} rounded-xl border shadow-sm p-5 transition-colors duration-300`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <div className={`text-3xl font-bold ${dm.text}`}>{data.views}</div>
                <div className={`text-sm ${dm.textMuted} mt-1`}>{t.pageViews}</div>
              </div>
              <div className="flex flex-col items-center px-4">
                <svg className={`w-6 h-6 ${darkMode ? "text-gray-600" : "text-gray-300"} ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="text-lg font-bold text-emerald-500 mt-1">{conversionRate}%</div>
                <div className={`text-xs ${dm.textLight}`}>{t.conversion}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-3xl font-bold text-emerald-500">{data.totalClicks}</div>
                <div className={`text-sm ${dm.textMuted} mt-1`}>{t.amazonClicks}</div>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-16 text-sm ${dm.textMuted}`}>{t.views}</div>
                <div className={`flex-1 h-6 ${dm.barBg} rounded-lg overflow-hidden`}>
                  <div className={`h-full ${darkMode ? "bg-gray-500" : "bg-gray-400"} rounded-lg`} style={{ width: "100%" }}></div>
                </div>
                <div className={`w-10 text-sm font-medium ${dm.text}`}>{data.views}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-16 text-sm ${dm.textMuted}`}>{t.clicks}</div>
                <div className={`flex-1 h-6 ${dm.barBg} rounded-lg overflow-hidden`}>
                  <div className="h-full bg-emerald-500 rounded-lg transition-all duration-500" style={{ width: `${data.views > 0 ? (data.totalClicks / data.views) * 100 : 0}%` }}></div>
                </div>
                <div className="w-10 text-sm font-medium text-emerald-500">{data.totalClicks}</div>
              </div>
            </div>

            {data.views > 0 && (
              <div className={`mt-4 p-3 rounded-lg border ${darkMode ? "bg-emerald-900/30 border-emerald-800" : "bg-emerald-50 border-emerald-200"}`}>
                <p className={`text-sm ${darkMode ? "text-emerald-300" : "text-emerald-800"}`}>
                  <strong>{conversionRate}%</strong> {t.ofVisitorsClick}
                  {parseFloat(conversionRate) >= 30 && ` ${t.conversionExcellent}`}
                  {parseFloat(conversionRate) >= 15 && parseFloat(conversionRate) < 30 && ` ${t.conversionGood}`}
                  {parseFloat(conversionRate) < 15 && ` ${t.conversionImprove}`}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-3 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            {t.quickSummary}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
              <div className={`text-xs ${dm.textMuted} mb-1`}>{t.totalClicks}</div>
              <div className={`text-2xl font-bold ${dm.text}`}>{data.totalClicks}</div>
            </div>
            <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
              <div className={`text-xs ${dm.textMuted} mb-1`}>{t.today}</div>
              <div className="text-2xl font-bold text-green-500">{data.todayClicks}</div>
            </div>
            <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
              <div className={`text-xs ${dm.textMuted} mb-1`}>{t.thisWeek}</div>
              <div className="text-2xl font-bold text-blue-500">{data.weekClicks}</div>
            </div>
            <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
              <div className={`text-xs ${dm.textMuted} mb-1`}>{t.bestButton}</div>
              <div className="text-sm font-bold text-purple-500 truncate">
                {data.bestButton ? getButtonLabel(data.bestButton) : t.noData}
              </div>
            </div>
          </div>
        </section>

        {/* Facebook Ads */}
        {facebookAdsData && facebookAdsData.campaigns.length > 0 ? (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              {t.fbAds}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-3`}>{t.fbAdsDesc}</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
                <div className={`text-xs ${dm.textMuted} mb-1`}>{t.fbTotalSpend} ({t.fbLast7d})</div>
                <div className={`text-2xl font-bold ${dm.text}`}>{facebookAdsData.currency === "ILS" ? "₪" : "$"}{facebookAdsData.totalSpend.toFixed(2)}</div>
              </div>
              <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
                <div className={`text-xs ${dm.textMuted} mb-1`}>{t.fbConversions}</div>
                <div className="text-2xl font-bold text-blue-500">{facebookAdsData.totalConversions}</div>
              </div>
              <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
                <div className={`text-xs ${dm.textMuted} mb-1`}>{t.fbCostPerConv}</div>
                <div className="text-2xl font-bold text-amber-500">{facebookAdsData.currency === "ILS" ? "₪" : "$"}{facebookAdsData.avgCostPerConversion.toFixed(2)}</div>
              </div>
              <div className={`${dm.cardBg} rounded-xl p-4 border shadow-sm transition-colors duration-300`}>
                <div className={`text-xs ${dm.textMuted} mb-1`}>{t.fbTodaySpend}</div>
                <div className="text-2xl font-bold text-green-500">{facebookAdsData.currency === "ILS" ? "₪" : "$"}{facebookAdsData.todaySpend.toFixed(2)}</div>
              </div>
            </div>

            {/* Campaign Table */}
            <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
              <div className={`grid grid-cols-12 gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider ${dm.textMuted} ${dm.tableBg}`}>
                <div className="col-span-5">{t.fbCampaign}</div>
                <div className="col-span-2 text-center">{t.fbConversions}</div>
                <div className="col-span-3 text-center">{t.fbCostPerConv}</div>
                <div className="col-span-2 text-right">{t.fbSpend}</div>
              </div>
              <div className={`divide-y ${dm.divider}`}>
                {facebookAdsData.campaigns
                  .sort((a, b) => b.spend - a.spend)
                  .map((campaign, index) => (
                    <div key={index} className={`grid grid-cols-12 gap-1 px-3 py-2.5 items-center ${dm.tableHover} transition`}>
                      <div className={`col-span-5 text-sm font-medium ${dm.text} truncate`}>
                        {campaign.campaign_name}
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`text-sm font-bold ${campaign.conversions > 0 ? "text-blue-500" : dm.textMuted}`}>
                          {campaign.conversions}
                        </span>
                      </div>
                      <div className={`col-span-3 text-center text-sm ${dm.textMuted}`}>
                        {campaign.costPerConversion > 0
                          ? `${facebookAdsData.currency === "ILS" ? "₪" : "$"}${campaign.costPerConversion.toFixed(2)}`
                          : "—"}
                      </div>
                      <div className={`col-span-2 text-right text-sm font-medium ${dm.text}`}>
                        {facebookAdsData.currency === "ILS" ? "₪" : "$"}{campaign.spend.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ) : !facebookAdsData ? (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              {t.fbAds}
            </h2>
            <div className={`${dm.cardBg} rounded-xl border p-6 text-center transition-colors duration-300`}>
              <p className={`text-sm ${dm.textMuted}`}>{t.fbNoData}</p>
            </div>
          </section>
        ) : null}

        {/* Traffic Sources + Button Performance side by side on desktop */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traffic Sources */}
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {t.trafficSources}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-3`}>{t.trafficSourcesDesc}</p>

            {Object.keys(data.trafficSources).length > 0 ? (
              <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
                <div className={`divide-y ${dm.divider}`}>
                  {Object.entries(data.trafficSources)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 8)
                    .map(([source, count], index) => {
                      const pct = data.views > 0 ? (count / data.views) * 100 : 0;
                      const deviceBreakdown = data.sourceDeviceBreakdown?.[source] || {};
                      return (
                        <div key={source} className={`p-3 ${dm.tableHover} transition`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              {getSourceIcon(source)}
                              {index === 0 && <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${darkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700"}`}>#1</span>}
                              <span className={`text-sm font-medium ${dm.text}`}>{getSourceDisplayName(source)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`text-sm font-bold ${dm.text}`}>{count}</div>
                              <span className={`text-xs ${dm.textMuted}`}>{pct.toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className={`h-1.5 ${dm.barBg} rounded-full overflow-hidden`}>
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${index === 0 ? "bg-gradient-to-r from-purple-500 to-pink-500" : darkMode ? "bg-gray-600" : "bg-gray-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          {Object.keys(deviceBreakdown).length > 0 && (
                            <div className="flex items-center gap-3 mt-1.5">
                              {Object.entries(deviceBreakdown)
                                .filter(([d]) => d !== "unknown")
                                .sort(([, a], [, b]) => b - a)
                                .map(([device, dCount]) => (
                                  <span key={device} className={`flex items-center gap-1 text-xs ${dm.textMuted}`}>
                                    {getDeviceIcon(device)}
                                    {dCount}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={`${dm.cardBg} rounded-xl border p-6 text-center transition-colors duration-300`}>
                <p className={dm.textMuted}>{t.noTrafficData}</p>
              </div>
            )}
          </section>

          {/* Button Performance */}
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {t.buttonPerformance}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-3`}>{t.buttonPerformanceDesc}</p>

            {Object.keys(data.byPosition).length > 0 ? (
              <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
                <div className={`divide-y ${dm.divider}`}>
                  {Object.entries(data.byPosition)
                    .sort(([, a], [, b]) => b - a)
                    .map(([position, count], index) => {
                      const pct = data.totalClicks > 0 ? (count / data.totalClicks) * 100 : 0;
                      const posDevices = data.byPositionDevice?.[position] || {};
                      return (
                        <div key={position} className={`p-3 ${dm.tableHover} transition`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              {index === 0 && <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${darkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-100 text-yellow-700"}`}>#1</span>}
                              <span className={`text-sm font-medium ${dm.text}`}>{getButtonLabel(position)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${dm.text}`}>{count}</span>
                              <span className={`text-xs ${dm.textMuted}`}>{pct.toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className={`h-1.5 ${dm.barBg} rounded-full overflow-hidden`}>
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${index === 0 ? "bg-gradient-to-r from-rose-500 to-pink-500" : darkMode ? "bg-gray-600" : "bg-gray-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          {Object.keys(posDevices).length > 0 && (
                            <div className="flex items-center gap-3 mt-1.5">
                              {Object.entries(posDevices)
                                .filter(([d]) => d !== "unknown")
                                .sort(([, a], [, b]) => b - a)
                                .map(([device, dCount]) => (
                                  <span key={device} className={`flex items-center gap-1 text-xs ${dm.textMuted}`}>
                                    {getDeviceIcon(device)}
                                    {dCount}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={`${dm.cardBg} rounded-xl border p-6 text-center transition-colors duration-300`}>
                <p className={dm.textMuted}>{t.noClickData}</p>
                <p className={`text-sm ${dm.textLight} mt-1`}>{t.noClickDataDesc}</p>
              </div>
            )}
          </section>
        </div>

        {/* Recent Visits with Landing URLs */}
        {data.recentVisits && data.recentVisits.length > 0 && (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              {t.recentVisits}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-3`}>{t.recentVisitsDesc}</p>

            <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
              {/* Table header */}
              <div className={`grid grid-cols-12 gap-1 px-3 py-2 text-xs font-medium ${dm.textMuted} ${dm.tableBg} border-b ${dm.border}`}>
                <div className="col-span-3">{t.time}</div>
                <div className="col-span-2">{t.source}</div>
                <div className="col-span-1">{t.device}</div>
                <div className="col-span-1 text-center">{t.amazon}</div>
                <div className="col-span-5">{t.landingUrl}</div>
              </div>
              <div className={`divide-y ${dm.divider}`}>
                {data.recentVisits.slice(0, 20).map((visit, index) => {
                  const isRecent = index < 3;
                  const visitDate = new Date(visit.timestamp);
                  const sourceName = visit.utm_source ? getSourceDisplayName(visit.utm_source) : t.directVisit;
                  // Extract just the query string part for display
                  let urlDisplay = "";
                  try {
                    if (visit.full_url) {
                      const u = new URL(visit.full_url);
                      urlDisplay = u.pathname + u.search;
                    }
                  } catch {
                    urlDisplay = visit.full_url || "";
                  }

                  return (
                    <div key={visit.id} className={`grid grid-cols-12 gap-1 px-3 py-2.5 items-center ${isRecent ? (darkMode ? "bg-teal-900/10" : "bg-teal-50/50") : ""} ${dm.tableHover} transition`}>
                      <div className="col-span-3 flex items-center gap-1.5">
                        {isRecent && <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse flex-shrink-0"></span>}
                        <span className={`text-xs ${dm.textMuted}`}>
                          {visitDate.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { day: "2-digit", month: "2-digit", timeZone: NY_TZ })}
                          {" "}
                          <span className={`font-medium ${dm.text}`}>
                            {visitDate.toLocaleTimeString(lang === "he" ? "he-IL" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: NY_TZ })}
                          </span>
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5">
                        {visit.utm_source ? getSourceIcon(visit.utm_source) : <span className={`w-4 h-4 inline-flex items-center justify-center rounded-full text-xs ${darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"}`}>D</span>}
                        <span className={`text-xs font-medium ${dm.text} truncate`}>{sourceName}</span>
                      </div>
                      <div className="col-span-1 flex items-center">
                        {visit.device_type && visit.device_type !== "unknown" ? (
                          <span className={`flex items-center text-xs ${dm.textMuted}`}>
                            {getDeviceIcon(visit.device_type)}
                          </span>
                        ) : (
                          <span className={`text-xs ${dm.textLight}`}>—</span>
                        )}
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        {visit.clicked_amazon ? (
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${darkMode ? "bg-orange-900/30 text-orange-400" : "bg-orange-100 text-orange-700"}`} title={t.clickedToAmazon}>
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1.846 18.77c-.052.082-.061.175-.019.261.052.086.139.139.234.139h.007c4.136-.139 8.389 1.271 12.643 2.678l.13.043c.312.104.584.06.833-.078 1.884-1.043 3.745-2.104 5.609-3.17a.278.278 0 0 0 .139-.234.279.279 0 0 0-.122-.243c-1.007-.696-2.074-1.131-3.178-1.302a12.51 12.51 0 0 0-2.504-.087c-1.67.113-3.253.591-4.784 1.057l-.113.035c-.487.148-.748.035-.861-.122-.113-.157-.07-.383.139-.557.93-.782 1.901-1.174 2.9-1.487 1.592-.496 3.236-.73 4.888-.696 1.826.035 3.548.461 5.131 1.557a.43.43 0 0 0 .052.035c.035.017.078.026.122.026a.22.22 0 0 0 .191-.113c.07-.122.052-.243-.052-.348-3.21-3.54-6.922-5.713-11.209-6.592-2.139-.444-4.296-.531-6.474-.27-1.948.235-3.81.74-5.583 1.714a.38.38 0 0 0-.183.209.37.37 0 0 0 .009.278c.174.365.47.548.87.539.278-.009.548-.07.826-.148.191-.052.383-.096.574-.122a15.02 15.02 0 0 1 3.21-.139c3.375.191 6.4 1.287 9.061 3.34a.284.284 0 0 1-.035.487c-2.556 1.357-5.113 2.713-7.67 4.07a.285.285 0 0 1-.348-.044l-.07-.07c-.33-.33-.713-.504-1.139-.504-.548 0-1.174.27-1.914.826L1.846 18.77z"/></svg>
                          </span>
                        ) : (
                          <span className={`text-xs ${dm.textLight}`}>—</span>
                        )}
                      </div>
                      <div className="col-span-5">
                        <span className={`text-xs ${dm.textMuted} font-mono break-all`}>
                          {urlDisplay || "—"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Insights */}
        {data.totalClicks > 0 && (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-3 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {t.insights}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.bestButton && (
                <div className={`rounded-xl p-4 border ${darkMode ? "bg-green-900/20 border-green-800" : "bg-green-50 border-green-200"}`}>
                  <div className={`text-xs font-medium mb-1 ${darkMode ? "text-green-400" : "text-green-600"}`}>{t.winningButton}</div>
                  <div className={`text-sm font-bold ${darkMode ? "text-green-300" : "text-green-800"}`}>{getButtonLabel(data.bestButton)}</div>
                  <div className={`text-xs ${darkMode ? "text-green-400" : "text-green-600"} mt-1`}>
                    {data.byPosition[data.bestButton]} {t.clicksWord} ({((data.byPosition[data.bestButton] / data.totalClicks) * 100).toFixed(0)}%)
                  </div>
                </div>
              )}
              {data.peakHour !== null && (
                <div className={`rounded-xl p-4 border ${darkMode ? "bg-blue-900/20 border-blue-800" : "bg-blue-50 border-blue-200"}`}>
                  <div className={`text-xs font-medium mb-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{t.peakHour}</div>
                  <div className={`text-sm font-bold ${darkMode ? "text-blue-300" : "text-blue-800"}`}>{data.peakHour}:00-{data.peakHour + 1}:00</div>
                  <div className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-600"} mt-1`}>{t.peakHourDesc}</div>
                </div>
              )}
              {data.byPosition["sticky-mobile"] && (
                <div className={`rounded-xl p-4 border ${darkMode ? "bg-purple-900/20 border-purple-800" : "bg-purple-50 border-purple-200"}`}>
                  <div className={`text-xs font-medium mb-1 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>{t.mobileTraffic}</div>
                  <div className={`text-sm font-bold ${darkMode ? "text-purple-300" : "text-purple-800"}`}>
                    {data.byPosition["sticky-mobile"]} {t.clicksWord}
                  </div>
                  <div className={`text-xs ${darkMode ? "text-purple-400" : "text-purple-600"} mt-1`}>
                    {((data.byPosition["sticky-mobile"] / data.totalClicks) * 100).toFixed(0)}% {t.ofAllClicks}
                  </div>
                </div>
              )}
              <div className={`rounded-xl p-4 border ${darkMode ? "bg-amber-900/20 border-amber-800" : "bg-amber-50 border-amber-200"}`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? "text-amber-400" : "text-amber-600"}`}>{t.tip}</div>
                <div className={`text-xs ${darkMode ? "text-amber-300" : "text-amber-700"}`}>{t.tipText}</div>
              </div>
            </div>
          </section>
        )}

        {/* Device Breakdown */}
        {(Object.keys(data.viewDeviceCounts || {}).length > 0 || Object.keys(data.byDevice || {}).length > 0) && (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              {t.deviceBreakdown}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-3`}>{t.deviceBreakdownDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Views by Device */}
              {Object.keys(data.viewDeviceCounts || {}).length > 0 && (
                <div className={`${dm.cardBg} rounded-xl border shadow-sm p-4 transition-colors duration-300`}>
                  <div className={`text-xs font-medium ${dm.textMuted} mb-3`}>{t.viewsLabel}</div>
                  <div className="space-y-2">
                    {Object.entries(data.viewDeviceCounts)
                      .filter(([d]) => d !== "unknown")
                      .sort(([, a], [, b]) => b - a)
                      .map(([device, count]) => {
                        const total = Object.values(data.viewDeviceCounts).reduce((s, c) => s + c, 0);
                        const pct = total > 0 ? (count / total) * 100 : 0;
                        return (
                          <div key={device} className="flex items-center gap-3">
                            <div className={`flex items-center gap-1.5 w-20 ${dm.textMuted}`}>
                              {getDeviceIcon(device)}
                              <span className="text-xs">{getDeviceLabel(device)}</span>
                            </div>
                            <div className={`flex-1 h-5 ${dm.barBg} rounded overflow-hidden`}>
                              <div className={`h-full rounded transition-all duration-500 ${device === "mobile" ? "bg-cyan-500" : device === "tablet" ? "bg-teal-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
                            </div>
                            <div className={`w-16 text-xs font-medium ${dm.text} text-${isRTL ? "left" : "right"}`}>
                              {count} <span className={dm.textMuted}>({pct.toFixed(0)}%)</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Clicks by Device */}
              {Object.keys(data.byDevice || {}).length > 0 && (
                <div className={`${dm.cardBg} rounded-xl border shadow-sm p-4 transition-colors duration-300`}>
                  <div className={`text-xs font-medium ${dm.textMuted} mb-3`}>{t.clicksLabel}</div>
                  <div className="space-y-2">
                    {Object.entries(data.byDevice)
                      .filter(([d]) => d !== "unknown")
                      .sort(([, a], [, b]) => b - a)
                      .map(([device, count]) => {
                        const total = Object.values(data.byDevice).reduce((s, c) => s + c, 0);
                        const pct = total > 0 ? (count / total) * 100 : 0;
                        return (
                          <div key={device} className="flex items-center gap-3">
                            <div className={`flex items-center gap-1.5 w-20 ${dm.textMuted}`}>
                              {getDeviceIcon(device)}
                              <span className="text-xs">{getDeviceLabel(device)}</span>
                            </div>
                            <div className={`flex-1 h-5 ${dm.barBg} rounded overflow-hidden`}>
                              <div className={`h-full rounded transition-all duration-500 ${device === "mobile" ? "bg-cyan-500" : device === "tablet" ? "bg-teal-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
                            </div>
                            <div className={`w-16 text-xs font-medium ${dm.text} text-${isRTL ? "left" : "right"}`}>
                              {count} <span className={dm.textMuted}>({pct.toFixed(0)}%)</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Detailed Click Log + Daily Breakdown side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Detailed Click Log */}
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              {t.clickLog}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-3`}>{t.clickLogDesc}</p>

            {data.recentClicks.length > 0 ? (
              <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
                {/* Table header */}
                <div className={`grid grid-cols-12 gap-1 px-3 py-2 text-xs font-medium ${dm.textMuted} ${dm.tableBg} border-b ${dm.border}`}>
                  <div className="col-span-4">{t.time}</div>
                  <div className="col-span-3">{t.button}</div>
                  <div className="col-span-2">{t.device}</div>
                  {selectedPage === "all" && <div className="col-span-3">{t.page}</div>}
                </div>
                <div className={`divide-y ${dm.divider}`}>
                  {data.recentClicks.slice(0, 20).map((click, index) => {
                    const isRecent = index < 3;
                    const clickDate = new Date(click.timestamp);
                    return (
                      <div key={click.id} className={`grid grid-cols-12 gap-1 px-3 py-2.5 items-center ${isRecent ? (darkMode ? "bg-green-900/10" : "bg-green-50/50") : ""} ${dm.tableHover} transition`}>
                        <div className="col-span-4 flex items-center gap-1.5">
                          {isRecent && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>}
                          <span className={`text-xs ${dm.textMuted}`}>
                            {clickDate.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { day: "2-digit", month: "2-digit", timeZone: NY_TZ })}
                            {" "}
                            <span className={`font-medium ${dm.text}`}>
                              {clickDate.toLocaleTimeString(lang === "he" ? "he-IL" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: NY_TZ })}
                            </span>
                          </span>
                        </div>
                        <div className="col-span-3">
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${darkMode ? "bg-rose-900/50 text-rose-300" : "bg-rose-100 text-rose-700"}`}>
                            {getButtonLabel(click.button_position)}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1">
                          {click.device_type && click.device_type !== "unknown" ? (
                            <span className={`flex items-center gap-1 text-xs ${dm.textMuted}`}>
                              {getDeviceIcon(click.device_type)}
                              <span className="hidden sm:inline">{getDeviceLabel(click.device_type)}</span>
                            </span>
                          ) : (
                            <span className={`text-xs ${dm.textLight}`}>—</span>
                          )}
                        </div>
                        {selectedPage === "all" && (
                          <div className="col-span-3">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? "bg-neutral-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                              {pageLabels[click.page] || click.page}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className={`${dm.cardBg} rounded-xl border p-6 text-center transition-colors duration-300`}>
                <p className={dm.textMuted}>{t.noClicksYet}</p>
                <p className={`text-sm ${dm.textLight} mt-1`}>{t.noClicksYetDesc}</p>
              </div>
            )}
          </section>

          {/* Daily Breakdown */}
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              {t.dailyClicks}
            </h2>

            {Object.keys(data.byDay).length > 0 ? (
              <div className={`${dm.cardBg} rounded-xl border shadow-sm p-4 transition-colors duration-300 mt-3`}>
                <div className="space-y-1.5">
                  {Object.entries(data.byDay)
                    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                    .slice(0, 14)
                    .map(([day, count]) => {
                      const maxCount = Math.max(...Object.values(data.byDay));
                      const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      const isToday = day === today;
                      const date = new Date(day);
                      const dayName = date.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { weekday: "short", timeZone: NY_TZ });

                      return (
                        <div key={day} className="flex items-center gap-2">
                          <div className={`w-16 text-xs ${dm.textMuted}`}>
                            {isToday ? <span className="text-green-500 font-medium">{t.todayLabel}</span> : (
                              <>{dayName} {date.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { day: "2-digit", month: "2-digit", timeZone: NY_TZ })}</>
                            )}
                          </div>
                          <div className={`flex-1 h-5 ${dm.barBg} rounded overflow-hidden`}>
                            <div className={`h-full rounded transition-all duration-500 ${isToday ? "bg-green-500" : "bg-indigo-500"}`} style={{ width: `${pct}%` }} />
                          </div>
                          <div className={`w-6 text-xs font-medium ${dm.text}`}>{count}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={`${dm.cardBg} rounded-xl border p-6 text-center transition-colors duration-300 mt-3`}>
                <p className={dm.textMuted}>{t.noClickData}</p>
              </div>
            )}
          </section>
        </div>

        {/* Help Section */}
        <section className={`${dm.helpBg} rounded-xl p-5 transition-colors duration-300`}>
          <h2 className={`text-base font-semibold ${dm.text} mb-3`}>{t.helpTitle}</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-0.5`}>{t.helpClick}</h3>
              <p className={`text-xs ${dm.textMuted}`}>{t.helpClickDesc}</p>
            </div>
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-0.5`}>{t.helpWhyButton}</h3>
              <p className={`text-xs ${dm.textMuted}`}>{t.helpWhyButtonDesc}</p>
            </div>
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-0.5`}>{t.helpWorking}</h3>
              <p className={`text-xs ${dm.textMuted}`}>{t.helpWorkingDesc}</p>
            </div>
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-0.5`}>{t.helpPixel}</h3>
              <p className={`text-xs ${dm.textMuted}`}>{t.helpPixelDesc}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
