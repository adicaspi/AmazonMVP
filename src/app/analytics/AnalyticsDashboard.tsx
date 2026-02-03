"use client";

import { useState } from "react";
import Link from "next/link";

type RecentClick = {
  id: string;
  timestamp: string;
  product_name: string;
  button_position: string;
  page: string;
};

interface Props {
  views: number;
  totalClicks: number;
  todayClicks: number;
  weekClicks: number;
  bestButton: string | null;
  byPosition: Record<string, number>;
  byDay: Record<string, number>;
  recentClicks: RecentClick[];
  peakHour: number | null;
  trafficSources: Record<string, number>;
}

// Translations
const translations = {
  he: {
    title: "Analytics Dashboard",
    subtitle: "מעקב אחרי לחיצות לאמזון מהאתר שלך",
    viewPage: "צפה בעמוד GrandeLash",
    conversionFunnel: "משפך המרה",
    funnelDesc: "כמה אנשים ביקרו בעמוד וכמה מהם לחצו לאמזון",
    pageViews: "צפיות בעמוד",
    pageViewsDesc: "אנשים שנכנסו לעמוד GrandeLash",
    amazonClicks: "לחיצות לאמזון",
    amazonClicksDesc: "אנשים שלחצו על כפתור לאמזון",
    conversion: "המרה",
    views: "צפיות",
    clicks: "לחיצות",
    quickSummary: "סיכום מהיר",
    totalClicks: "סה״כ לחיצות לאמזון",
    totalClicksDesc: "מספר הפעמים שמישהו לחץ על כפתור שמוביל לאמזון",
    today: "היום",
    todayDesc: "לחיצות שהתקבלו היום",
    thisWeek: "השבוע",
    thisWeekDesc: "לחיצות ב-7 הימים האחרונים",
    bestButton: "הכפתור הכי טוב",
    bestButtonDesc: "הכפתור שמקבל הכי הרבה לחיצות",
    noData: "אין נתונים",
    buttonPerformance: "ביצועים לפי כפתור",
    buttonPerformanceDesc: "איזה כפתורים בעמוד מביאים הכי הרבה לחיצות? ככה תדע איפה לשים את הדגש",
    noClickData: "עדיין אין נתונים על לחיצות",
    noClickDataDesc: "ברגע שמישהו ילחץ על כפתור לאמזון, הנתונים יופיעו כאן",
    insights: "תובנות",
    insightsDesc: "מה אפשר ללמוד מהנתונים",
    winningButton: "הכפתור המנצח",
    peakHour: "שעת השיא",
    peakHourDesc: "רוב הלחיצות מגיעות בשעה",
    mobileTraffic: "תנועה ממובייל",
    mobileClicksFrom: "לחיצות מהכפתור הצף במובייל",
    tip: "טיפ",
    tipText: "כפתורים בסוף העמוד (FAQ, Final CTA) מראים שאנשים קוראים את כל התוכן לפני שמחליטים לקנות",
    recentClicks: "לחיצות אחרונות",
    recentClicksDesc: "15 הלחיצות האחרונות בזמן אמת",
    dateTime: "תאריך ושעה",
    button: "כפתור",
    product: "מוצר",
    noClicksYet: "אין לחיצות עדיין",
    noClicksYetDesc: "לחיצות חדשות יופיעו כאן בזמן אמת",
    dailyClicks: "לחיצות לפי יום",
    dailyClicksDesc: "היסטוריית לחיצות יומית",
    todayLabel: "היום",
    helpTitle: "מה המספרים האלה אומרים?",
    helpClick: "לחיצה לאמזון",
    helpClickDesc: "כל פעם שמישהו לוחץ על כפתור \"Buy Now\" ועובר לאמזון, זה נספר כלחיצה. זה לא אומר שהוא קנה - רק שהוא התעניין מספיק כדי ללחוץ.",
    helpWhyButton: "למה חשוב לדעת איזה כפתור?",
    helpWhyButtonDesc: "אם רוב הלחיצות מגיעות מכפתור מסוים, כדאי לשים שם יותר דגש. אם כפתור לא מקבל לחיצות, אולי צריך לשנות את המיקום או הטקסט שלו.",
    helpWorking: "איך לדעת אם זה עובד?",
    helpWorkingDesc: "אם יש לחיצות, העמוד עובד! הצעד הבא הוא לבדוק בחשבון Amazon Associates כמה מהלחיצות האלה הפכו לרכישות בפועל.",
    helpPixel: "מה עם Facebook Pixel?",
    helpPixelDesc: "כל לחיצה נשלחת גם ל-Facebook כ-\"Lead\". אפשר לראות את זה ב-Events Manager ולהשתמש בזה לretargeting.",
    trafficSources: "מקורות תנועה",
    trafficSourcesDesc: "מאיפה המבקרים הגיעו לעמוד",
    direct: "ישיר",
    noTrafficData: "אין נתונים על מקורות תנועה",
    noTrafficDataDesc: "ברגע שיהיו מבקרים, תראה מאיפה הם הגיעו",
    visitors: "מבקרים",
    conversionExcellent: "זה שיעור המרה מעולה! 🎉",
    conversionGood: "זה שיעור המרה טוב.",
    conversionImprove: "יש מקום לשיפור - נסה לשפר את ה-CTA או את התוכן.",
    ofVisitorsClick: "מהמבקרים לוחצים לאמזון.",
    bringsClicks: "מביא",
    clicksWord: "לחיצות",
    ofAllClicks: "מכל הלחיצות",
  },
  en: {
    title: "Analytics Dashboard",
    subtitle: "Track Amazon clicks from your website",
    viewPage: "View GrandeLash Page",
    conversionFunnel: "Conversion Funnel",
    funnelDesc: "How many people visited the page and how many clicked to Amazon",
    pageViews: "Page Views",
    pageViewsDesc: "People who visited the GrandeLash page",
    amazonClicks: "Amazon Clicks",
    amazonClicksDesc: "People who clicked the Amazon button",
    conversion: "Conversion",
    views: "Views",
    clicks: "Clicks",
    quickSummary: "Quick Summary",
    totalClicks: "Total Amazon Clicks",
    totalClicksDesc: "Number of times someone clicked a button leading to Amazon",
    today: "Today",
    todayDesc: "Clicks received today",
    thisWeek: "This Week",
    thisWeekDesc: "Clicks in the last 7 days",
    bestButton: "Best Button",
    bestButtonDesc: "The button with the most clicks",
    noData: "No data",
    buttonPerformance: "Button Performance",
    buttonPerformanceDesc: "Which buttons on the page drive the most clicks? This helps you know where to focus",
    noClickData: "No click data yet",
    noClickDataDesc: "Once someone clicks an Amazon button, the data will appear here",
    insights: "Insights",
    insightsDesc: "What we can learn from the data",
    winningButton: "Winning Button",
    peakHour: "Peak Hour",
    peakHourDesc: "Most clicks come at",
    mobileTraffic: "Mobile Traffic",
    mobileClicksFrom: "clicks from the sticky mobile button",
    tip: "Tip",
    tipText: "Buttons at the end of the page (FAQ, Final CTA) show that people read all the content before deciding to buy",
    recentClicks: "Recent Clicks",
    recentClicksDesc: "Last 15 clicks in real-time",
    dateTime: "Date & Time",
    button: "Button",
    product: "Product",
    noClicksYet: "No clicks yet",
    noClicksYetDesc: "New clicks will appear here in real-time",
    dailyClicks: "Daily Clicks",
    dailyClicksDesc: "Daily click history",
    todayLabel: "Today",
    helpTitle: "What do these numbers mean?",
    helpClick: "Amazon Click",
    helpClickDesc: "Every time someone clicks a \"Buy Now\" button and goes to Amazon, it counts as a click. This doesn't mean they bought - just that they were interested enough to click.",
    helpWhyButton: "Why is button position important?",
    helpWhyButtonDesc: "If most clicks come from a specific button, focus more there. If a button isn't getting clicks, maybe change its position or text.",
    helpWorking: "How do I know it's working?",
    helpWorkingDesc: "If there are clicks, the page is working! Next step is to check your Amazon Associates account to see how many clicks became actual purchases.",
    helpPixel: "What about Facebook Pixel?",
    helpPixelDesc: "Every click is also sent to Facebook as a \"Lead\" event. You can see it in Events Manager and use it for retargeting.",
    trafficSources: "Traffic Sources",
    trafficSourcesDesc: "Where visitors came from",
    direct: "Direct",
    noTrafficData: "No traffic source data",
    noTrafficDataDesc: "Once visitors arrive, you'll see where they came from",
    visitors: "visitors",
    conversionExcellent: "That's an excellent conversion rate! 🎉",
    conversionGood: "That's a good conversion rate.",
    conversionImprove: "Room for improvement - try to improve the CTA or content.",
    ofVisitorsClick: "of visitors click to Amazon.",
    bringsClicks: "brings",
    clicksWord: "clicks",
    ofAllClicks: "of all clicks",
  },
};

// Button labels
const positionLabels: Record<string, { he: string; en: string; desc_he: string; desc_en: string }> = {
  "hero-main": {
    he: "כפתור ראשי (Hero)",
    en: "Main Button (Hero)",
    desc_he: "הכפתור הראשון שמופיע בראש העמוד",
    desc_en: "The first button at the top of the page",
  },
  "comparison-table": {
    he: "טבלת השוואה",
    en: "Comparison Table",
    desc_he: "הכפתור מתחת לטבלת ההשוואה",
    desc_en: "Button below the comparison table",
  },
  "benefits-card": {
    he: "כרטיס יתרונות",
    en: "Benefits Card",
    desc_he: "הכפתור בכרטיס היתרונות",
    desc_en: "Button in the benefits card",
  },
  "how-it-works": {
    he: "איך זה עובד",
    en: "How It Works",
    desc_he: "הכפתור אחרי סקשן 'איך זה עובד'",
    desc_en: "Button after 'How It Works' section",
  },
  "video-testimonials": {
    he: "סרטוני המלצות",
    en: "Video Testimonials",
    desc_he: "הכפתור אחרי סרטוני ההמלצות",
    desc_en: "Button after video testimonials",
  },
  "faq-section": {
    he: "שאלות נפוצות",
    en: "FAQ Section",
    desc_he: "הכפתור אחרי סקשן השאלות הנפוצות",
    desc_en: "Button after FAQ section",
  },
  "final-cta": {
    he: "CTA סופי",
    en: "Final CTA",
    desc_he: "הכפתור הגדול בסוף העמוד",
    desc_en: "The big button at the end of the page",
  },
  "sticky-mobile": {
    he: "כפתור צף (מובייל)",
    en: "Sticky Button (Mobile)",
    desc_he: "הכפתור הקבוע בתחתית המסך במובייל",
    desc_en: "Fixed button at bottom on mobile",
  },
};

export default function AnalyticsDashboard({
  views,
  totalClicks,
  todayClicks,
  weekClicks,
  bestButton,
  byPosition,
  byDay,
  recentClicks,
  peakHour,
  trafficSources,
}: Props) {
  const [lang, setLang] = useState<"he" | "en">("he");
  const [darkMode, setDarkMode] = useState(false);
  const t = translations[lang];
  const isRTL = lang === "he";
  const today = new Date().toISOString().split("T")[0];

  // Dark mode classes
  const dm = {
    bg: darkMode ? "bg-gray-900" : "bg-gray-50",
    headerBg: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
    cardBg: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
    text: darkMode ? "text-gray-100" : "text-gray-900",
    textMuted: darkMode ? "text-gray-400" : "text-gray-500",
    textLight: darkMode ? "text-gray-500" : "text-gray-400",
    tableBg: darkMode ? "bg-gray-700/50" : "bg-gray-50",
    tableHover: darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50",
    divider: darkMode ? "divide-gray-700" : "divide-gray-100",
    border: darkMode ? "border-gray-700" : "border-gray-200",
    barBg: darkMode ? "bg-gray-700" : "bg-gray-100",
    helpBg: darkMode ? "bg-gray-800" : "bg-gray-100",
  };

  const conversionRate = views > 0 ? ((totalClicks / views) * 100).toFixed(1) : "0";

  const getButtonLabel = (position: string) => {
    const label = positionLabels[position];
    if (!label) return { name: position, desc: "" };
    return {
      name: lang === "he" ? label.he : label.en,
      desc: lang === "he" ? label.desc_he : label.desc_en,
    };
  };

  return (
    <main className={`min-h-screen ${dm.bg} transition-colors duration-300`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className={`${dm.headerBg} border-b transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${dm.text}`}>{t.title}</h1>
              <p className={`${dm.textMuted} mt-1`}>{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === "he" ? "en" : "he")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                {lang === "he" ? "🇺🇸 English" : "🇮🇱 עברית"}
              </button>
              <Link
                href="/grandelash"
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-medium"
              >
                {t.viewPage} →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Conversion Funnel */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            {t.conversionFunnel}
          </h2>
          <p className={`text-sm ${dm.textMuted} mb-4`}>{t.funnelDesc}</p>

          <div className={`${dm.cardBg} rounded-xl border shadow-sm p-6 transition-colors duration-300`}>
            <div className="flex items-center justify-between gap-4">
              {/* Views */}
              <div className="flex-1 text-center">
                <div className={`text-4xl font-bold ${dm.text}`}>{views}</div>
                <div className={`text-sm ${dm.textMuted} mt-1`}>{t.pageViews}</div>
                <div className={`text-xs ${dm.textLight} mt-1`}>{t.pageViewsDesc}</div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center px-4">
                <svg
                  className={`w-8 h-8 ${darkMode ? "text-gray-600" : "text-gray-300"} ${isRTL ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="text-lg font-bold text-emerald-500 mt-1">{conversionRate}%</div>
                <div className={`text-xs ${dm.textLight}`}>{t.conversion}</div>
              </div>

              {/* Clicks */}
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-emerald-500">{totalClicks}</div>
                <div className={`text-sm ${dm.textMuted} mt-1`}>{t.amazonClicks}</div>
                <div className={`text-xs ${dm.textLight} mt-1`}>{t.amazonClicksDesc}</div>
              </div>
            </div>

            {/* Visual funnel bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-20 text-sm ${dm.textMuted}`}>{t.views}</div>
                <div className={`flex-1 h-8 ${dm.barBg} rounded-lg overflow-hidden`}>
                  <div className={`h-full ${darkMode ? "bg-gray-500" : "bg-gray-400"} rounded-lg`} style={{ width: "100%" }}></div>
                </div>
                <div className={`w-12 text-sm font-medium ${dm.text}`}>{views}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-20 text-sm ${dm.textMuted}`}>{t.clicks}</div>
                <div className={`flex-1 h-8 ${dm.barBg} rounded-lg overflow-hidden`}>
                  <div
                    className="h-full bg-emerald-500 rounded-lg transition-all duration-500"
                    style={{ width: `${views > 0 ? (totalClicks / views) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-emerald-500">{totalClicks}</div>
              </div>
            </div>

            {/* Interpretation */}
            {views > 0 && (
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

        {/* Traffic Sources */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            {t.trafficSources}
          </h2>
          <p className={`text-sm ${dm.textMuted} mb-4`}>{t.trafficSourcesDesc}</p>

          {Object.keys(trafficSources).length > 0 ? (
            <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
              <div className={`divide-y ${dm.divider}`}>
                {Object.entries(trafficSources)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count], index) => {
                    const percentage = views > 0 ? (count / views) * 100 : 0;
                    const isTop = index === 0;

                    // Map source names to display names
                    let displaySource = source;
                    if (source === "Direct") displaySource = t.direct;
                    else if (source === "fb" || source.includes("facebook")) displaySource = "Facebook";
                    else if (source === "ig" || source.includes("instagram")) displaySource = "Instagram";
                    else if (source.includes("google")) displaySource = "Google";
                    else if (source.includes("tiktok")) displaySource = "TikTok";

                    // Get icon for source
                    const getIcon = () => {
                      if (source === "fb" || source.includes("facebook")) {
                        return (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        );
                      }
                      if (source === "ig" || source.includes("instagram")) {
                        return (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                            <defs>
                              <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFDC80"/>
                                <stop offset="25%" stopColor="#F77737"/>
                                <stop offset="50%" stopColor="#E1306C"/>
                                <stop offset="75%" stopColor="#C13584"/>
                                <stop offset="100%" stopColor="#833AB4"/>
                              </linearGradient>
                            </defs>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        );
                      }
                      if (source.includes("google")) {
                        return (
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        );
                      }
                      if (source.includes("tiktok")) {
                        return (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                          </svg>
                        );
                      }
                      if (source === "Direct") {
                        return (
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        );
                      }
                      return (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      );
                    };

                    return (
                      <div key={source} className={`p-4 ${dm.tableHover} transition`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getIcon()}
                            {isTop && (
                              <span className={`text-xs px-2 py-0.5 rounded font-medium ${darkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                                #1
                              </span>
                            )}
                            <span className={`font-medium ${dm.text}`}>{displaySource}</span>
                          </div>
                          <div className={isRTL ? "text-left" : "text-right"}>
                            <div className={`font-bold ${dm.text}`}>{count}</div>
                            <div className={`text-xs ${dm.textMuted}`}>{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className={`h-2 ${dm.barBg} rounded-full overflow-hidden`}>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isTop
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : darkMode ? "bg-gradient-to-r from-gray-500 to-gray-600" : "bg-gradient-to-r from-gray-400 to-gray-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className={`${dm.cardBg} rounded-xl border p-8 text-center transition-colors duration-300`}>
              <div className={`${dm.textLight} text-4xl mb-3`}>🌐</div>
              <p className={dm.textMuted}>{t.noTrafficData}</p>
              <p className={`text-sm ${dm.textLight} mt-1`}>{t.noTrafficDataDesc}</p>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-4 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            {t.quickSummary}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`${dm.cardBg} rounded-xl p-5 border shadow-sm transition-colors duration-300`}>
              <div className={`text-sm ${dm.textMuted} mb-1`}>{t.totalClicks}</div>
              <div className={`text-3xl font-bold ${dm.text}`}>{totalClicks}</div>
              <div className={`text-xs ${dm.textLight} mt-2`}>{t.totalClicksDesc}</div>
            </div>
            <div className={`${dm.cardBg} rounded-xl p-5 border shadow-sm transition-colors duration-300`}>
              <div className={`text-sm ${dm.textMuted} mb-1`}>{t.today}</div>
              <div className="text-3xl font-bold text-green-500">{todayClicks}</div>
              <div className={`text-xs ${dm.textLight} mt-2`}>{t.todayDesc}</div>
            </div>
            <div className={`${dm.cardBg} rounded-xl p-5 border shadow-sm transition-colors duration-300`}>
              <div className={`text-sm ${dm.textMuted} mb-1`}>{t.thisWeek}</div>
              <div className="text-3xl font-bold text-blue-500">{weekClicks}</div>
              <div className={`text-xs ${dm.textLight} mt-2`}>{t.thisWeekDesc}</div>
            </div>
            <div className={`${dm.cardBg} rounded-xl p-5 border shadow-sm transition-colors duration-300`}>
              <div className={`text-sm ${dm.textMuted} mb-1`}>{t.bestButton}</div>
              <div className="text-lg font-bold text-purple-500 truncate">
                {bestButton ? getButtonLabel(bestButton).name : t.noData}
              </div>
              <div className={`text-xs ${dm.textLight} mt-2`}>{t.bestButtonDesc}</div>
            </div>
          </div>
        </section>

        {/* Button Performance */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {t.buttonPerformance}
          </h2>
          <p className={`text-sm ${dm.textMuted} mb-4`}>{t.buttonPerformanceDesc}</p>

          {Object.keys(byPosition).length > 0 ? (
            <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
              <div className={`divide-y ${dm.divider}`}>
                {Object.entries(byPosition)
                  .sort(([, a], [, b]) => b - a)
                  .map(([position, count], index) => {
                    const percentage = totalClicks > 0 ? (count / totalClicks) * 100 : 0;
                    const label = getButtonLabel(position);
                    const isTop = index === 0;

                    return (
                      <div key={position} className={`p-4 ${dm.tableHover} transition`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {isTop && (
                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${darkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-100 text-yellow-700"}`}>
                                  #1
                                </span>
                              )}
                              <span className={`font-medium ${dm.text}`}>{label.name}</span>
                            </div>
                            {label.desc && <p className={`text-xs ${dm.textMuted} mt-1`}>{label.desc}</p>}
                          </div>
                          <div className={isRTL ? "text-left" : "text-right"}>
                            <div className={`font-bold ${dm.text}`}>{count}</div>
                            <div className={`text-xs ${dm.textMuted}`}>{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className={`h-2 ${dm.barBg} rounded-full overflow-hidden`}>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isTop
                                ? "bg-gradient-to-r from-rose-500 to-pink-500"
                                : darkMode ? "bg-gradient-to-r from-gray-500 to-gray-600" : "bg-gradient-to-r from-gray-400 to-gray-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className={`${dm.cardBg} rounded-xl border p-8 text-center transition-colors duration-300`}>
              <div className={`${dm.textLight} text-4xl mb-3`}>📊</div>
              <p className={dm.textMuted}>{t.noClickData}</p>
              <p className={`text-sm ${dm.textLight} mt-1`}>{t.noClickDataDesc}</p>
            </div>
          )}
        </section>

        {/* Insights */}
        {totalClicks > 0 && (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {t.insights}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-4`}>{t.insightsDesc}</p>

            <div className="grid md:grid-cols-2 gap-4">
              {bestButton && (
                <div className={`rounded-xl p-5 border ${darkMode ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-800" : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? "text-green-300" : "text-green-800"}`}>{t.winningButton}</h3>
                      <p className={`text-sm ${darkMode ? "text-green-400" : "text-green-700"} mt-1`}>
                        <strong>{getButtonLabel(bestButton).name}</strong> {t.bringsClicks} {byPosition[bestButton]}{" "}
                        {t.clicksWord} ({((byPosition[bestButton] / totalClicks) * 100).toFixed(0)}% {t.ofAllClicks})
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {peakHour !== null && (
                <div className={`rounded-xl p-5 border ${darkMode ? "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-800" : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? "text-blue-300" : "text-blue-800"}`}>{t.peakHour}</h3>
                      <p className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-700"} mt-1`}>
                        {t.peakHourDesc} <strong>{peakHour}:00-{peakHour + 1}:00</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {byPosition["sticky-mobile"] && (
                <div className={`rounded-xl p-5 border ${darkMode ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-800" : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? "text-purple-300" : "text-purple-800"}`}>{t.mobileTraffic}</h3>
                      <p className={`text-sm ${darkMode ? "text-purple-400" : "text-purple-700"} mt-1`}>
                        {byPosition["sticky-mobile"]} {t.mobileClicksFrom} (
                        {((byPosition["sticky-mobile"] / totalClicks) * 100).toFixed(0)}%)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className={`rounded-xl p-5 border ${darkMode ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-800" : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"}`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? "text-amber-300" : "text-amber-800"}`}>{t.tip}</h3>
                    <p className={`text-sm ${darkMode ? "text-amber-400" : "text-amber-700"} mt-1`}>{t.tipText}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Clicks */}
        <section>
          <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {t.recentClicks}
          </h2>
          <p className={`text-sm ${dm.textMuted} mb-4`}>{t.recentClicksDesc}</p>

          {recentClicks.length > 0 ? (
            <div className={`${dm.cardBg} rounded-xl border shadow-sm overflow-hidden transition-colors duration-300`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${dm.tableBg} border-b ${dm.border}`}>
                    <tr>
                      <th className={`px-4 py-3 text-xs font-medium ${dm.textMuted} uppercase`}>{t.dateTime}</th>
                      <th className={`px-4 py-3 text-xs font-medium ${dm.textMuted} uppercase`}>{t.button}</th>
                      <th className={`px-4 py-3 text-xs font-medium ${dm.textMuted} uppercase`}>{t.product}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${dm.divider}`}>
                    {recentClicks.map((click, index) => {
                      const label = getButtonLabel(click.button_position);
                      const isRecent = index < 3;

                      return (
                        <tr key={click.id} className={isRecent ? (darkMode ? "bg-green-900/20" : "bg-green-50/50") : ""}>
                          <td className={`px-4 py-3 text-sm ${dm.textMuted}`}>
                            <div className="flex items-center gap-2">
                              {isRecent && (
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              )}
                              {new Date(click.timestamp).toLocaleString(lang === "he" ? "he-IL" : "en-US", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${darkMode ? "bg-rose-900/50 text-rose-300" : "bg-rose-100 text-rose-700"}`}>
                              {label.name}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${dm.textMuted}`}>{click.product_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={`${dm.cardBg} rounded-xl border p-8 text-center transition-colors duration-300`}>
              <div className={`${dm.textLight} text-4xl mb-3`}>🕐</div>
              <p className={dm.textMuted}>{t.noClicksYet}</p>
              <p className={`text-sm ${dm.textLight} mt-1`}>{t.noClicksYetDesc}</p>
            </div>
          )}
        </section>

        {/* Daily Breakdown */}
        {Object.keys(byDay).length > 0 && (
          <section>
            <h2 className={`text-lg font-semibold ${dm.text} mb-2 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              {t.dailyClicks}
            </h2>
            <p className={`text-sm ${dm.textMuted} mb-4`}>{t.dailyClicksDesc}</p>

            <div className={`${dm.cardBg} rounded-xl border shadow-sm p-4 transition-colors duration-300`}>
              <div className="space-y-2">
                {Object.entries(byDay)
                  .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                  .slice(0, 14)
                  .map(([day, count]) => {
                    const maxCount = Math.max(...Object.values(byDay));
                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    const isToday = day === today;
                    const date = new Date(day);
                    const dayName = date.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { weekday: "short" });

                    return (
                      <div key={day} className="flex items-center gap-3">
                        <div className={`w-20 text-sm ${dm.textMuted}`}>
                          {isToday ? (
                            <span className="text-green-500 font-medium">{t.todayLabel}</span>
                          ) : (
                            <>
                              {dayName}{" "}
                              {date.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </>
                          )}
                        </div>
                        <div className={`flex-1 h-6 ${dm.barBg} rounded overflow-hidden`}>
                          <div
                            className={`h-full rounded transition-all duration-500 ${
                              isToday ? "bg-green-500" : "bg-indigo-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className={`w-8 text-sm font-medium ${dm.text}`}>{count}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Help Section */}
        <section className={`${dm.helpBg} rounded-xl p-6 transition-colors duration-300`}>
          <h2 className={`text-lg font-semibold ${dm.text} mb-4`}>❓ {t.helpTitle}</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-1`}>{t.helpClick}</h3>
              <p className={dm.textMuted}>{t.helpClickDesc}</p>
            </div>
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-1`}>{t.helpWhyButton}</h3>
              <p className={dm.textMuted}>{t.helpWhyButtonDesc}</p>
            </div>
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-1`}>{t.helpWorking}</h3>
              <p className={dm.textMuted}>{t.helpWorkingDesc}</p>
            </div>
            <div>
              <h3 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-1`}>{t.helpPixel}</h3>
              <p className={dm.textMuted}>{t.helpPixelDesc}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
