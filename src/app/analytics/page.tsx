import Link from "next/link";
import type { Metadata } from "next";
import { supabase, isDatabaseAvailable } from "@/lib/db";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Analytics Dashboard - AI Picks",
  description: "Track your affiliate performance - views, clicks, and conversions.",
};

type AmazonClick = {
  id: string;
  timestamp: string;
  product_name: string;
  button_position: string;
  page: string;
};

type PageView = {
  id: string;
  timestamp: string;
  page: string;
};

async function getAmazonClicks(): Promise<AmazonClick[]> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      const { data, error } = await supabase
        .from("amazon_clicks")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(1000);

      if (!error && data) {
        return data;
      }
    }
    return [];
  } catch {
    return [];
  }
}

async function getPageViews(page: string): Promise<number> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      const { count, error } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .eq("page", page);

      if (!error && count !== null) {
        return count;
      }
    }
    return 0;
  } catch {
    return 0;
  }
}

// Button position labels in Hebrew
const positionLabels: Record<string, { name: string; description: string }> = {
  "hero-main": {
    name: "כפתור ראשי (Hero)",
    description: "הכפתור הראשון שמופיע בראש העמוד",
  },
  "comparison-table": {
    name: "טבלת השוואה",
    description: "הכפתור מתחת לטבלת ההשוואה בין GrandLash להארכות",
  },
  "benefits-card": {
    name: "כרטיס יתרונות",
    description: "הכפתור בכרטיס היתרונות באמצע העמוד",
  },
  "how-it-works": {
    name: "איך זה עובד",
    description: "הכפתור אחרי סקשן 'איך זה עובד'",
  },
  "video-testimonials": {
    name: "סרטוני המלצות",
    description: "הכפתור אחרי סרטוני ההמלצות",
  },
  "faq-section": {
    name: "שאלות נפוצות",
    description: "הכפתור אחרי סקשן השאלות הנפוצות",
  },
  "final-cta": {
    name: "CTA סופי",
    description: "הכפתור הגדול בסוף העמוד (רקע ורוד)",
  },
  "sticky-mobile": {
    name: "כפתור צף (מובייל)",
    description: "הכפתור הקבוע בתחתית המסך במובייל",
  },
  unknown: {
    name: "לא מזוהה",
    description: "לחיצה ממקום לא מזוהה",
  },
};

function getClickStats(clicks: AmazonClick[], page?: string) {
  const filtered = page ? clicks.filter((c) => c.page === page) : clicks;

  const byPosition: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  const byHour: Record<number, number> = {};

  filtered.forEach((click) => {
    // Count by position
    byPosition[click.button_position] = (byPosition[click.button_position] || 0) + 1;

    // Count by day
    const day = click.timestamp.split("T")[0];
    byDay[day] = (byDay[day] || 0) + 1;

    // Count by hour
    const hour = new Date(click.timestamp).getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;
  });

  // Find best performing button
  const sortedPositions = Object.entries(byPosition).sort(([, a], [, b]) => b - a);
  const bestButton = sortedPositions[0]?.[0] || null;

  // Find peak hour
  const sortedHours = Object.entries(byHour).sort(([, a], [, b]) => b - a);
  const peakHour = sortedHours[0] ? parseInt(sortedHours[0][0]) : null;

  return {
    total: filtered.length,
    byPosition,
    byDay,
    byHour,
    bestButton,
    peakHour,
    recentClicks: filtered
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15),
  };
}

export default async function AnalyticsPage() {
  const amazonClicks = await getAmazonClicks();
  const grandeLashStats = getClickStats(amazonClicks, "/grandelash");
  const grandeLashViews = await getPageViews("/grandelash");

  // Calculate conversion rate
  const conversionRate = grandeLashViews > 0
    ? ((grandeLashStats.total / grandeLashViews) * 100).toFixed(1)
    : "0";

  // Calculate today's clicks
  const today = new Date().toISOString().split("T")[0];
  const todayClicks = grandeLashStats.byDay[today] || 0;

  // Calculate this week's clicks
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekClicks = Object.entries(grandeLashStats.byDay)
    .filter(([day]) => new Date(day) >= weekAgo)
    .reduce((sum, [, count]) => sum + count, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-500 mt-1">מעקב אחרי לחיצות לאמזון מהאתר שלך</p>
            </div>
            <Link
              href="/grandelash"
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-medium"
            >
              צפה בעמוד GrandeLash →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Conversion Funnel */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            משפך המרה
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            כמה אנשים ביקרו בעמוד וכמה מהם לחצו לאמזון
          </p>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between gap-4">
              {/* Views */}
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-gray-900">{grandeLashViews}</div>
                <div className="text-sm text-gray-500 mt-1">צפיות בעמוד</div>
                <div className="text-xs text-gray-400 mt-1">אנשים שנכנסו לעמוד GrandeLash</div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center px-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="text-lg font-bold text-emerald-600 mt-1">{conversionRate}%</div>
                <div className="text-xs text-gray-400">המרה</div>
              </div>

              {/* Clicks */}
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-emerald-600">{grandeLashStats.total}</div>
                <div className="text-sm text-gray-500 mt-1">לחיצות לאמזון</div>
                <div className="text-xs text-gray-400 mt-1">אנשים שלחצו על כפתור לאמזון</div>
              </div>
            </div>

            {/* Visual funnel bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-20 text-sm text-gray-500 text-right">צפיות</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-lg" style={{ width: "100%" }}></div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-700">{grandeLashViews}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 text-sm text-gray-500 text-right">לחיצות</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-lg transition-all duration-500"
                    style={{ width: `${grandeLashViews > 0 ? (grandeLashStats.total / grandeLashViews) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-emerald-600">{grandeLashStats.total}</div>
              </div>
            </div>

            {/* Interpretation */}
            {grandeLashViews > 0 && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  <strong>{conversionRate}%</strong> מהמבקרים לוחצים לאמזון.
                  {parseFloat(conversionRate) >= 30 && " זה שיעור המרה מעולה! 🎉"}
                  {parseFloat(conversionRate) >= 15 && parseFloat(conversionRate) < 30 && " זה שיעור המרה טוב."}
                  {parseFloat(conversionRate) < 15 && " יש מקום לשיפור - נסה לשפר את ה-CTA או את התוכן."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            סיכום מהיר
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Clicks */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">סה״כ לחיצות לאמזון</div>
              <div className="text-3xl font-bold text-gray-900">{grandeLashStats.total}</div>
              <div className="text-xs text-gray-400 mt-2">
                מספר הפעמים שמישהו לחץ על כפתור שמוביל לאמזון
              </div>
            </div>

            {/* Today */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">היום</div>
              <div className="text-3xl font-bold text-green-600">{todayClicks}</div>
              <div className="text-xs text-gray-400 mt-2">לחיצות שהתקבלו היום</div>
            </div>

            {/* This Week */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">השבוע</div>
              <div className="text-3xl font-bold text-blue-600">{weekClicks}</div>
              <div className="text-xs text-gray-400 mt-2">לחיצות ב-7 הימים האחרונים</div>
            </div>

            {/* Best Button */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">הכפתור הכי טוב</div>
              <div className="text-lg font-bold text-purple-600 truncate">
                {grandeLashStats.bestButton
                  ? positionLabels[grandeLashStats.bestButton]?.name || grandeLashStats.bestButton
                  : "אין נתונים"}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                הכפתור שמקבל הכי הרבה לחיצות
              </div>
            </div>
          </div>
        </section>

        {/* Button Performance */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            ביצועים לפי כפתור
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            איזה כפתורים בעמוד מביאים הכי הרבה לחיצות? ככה תדע איפה לשים את הדגש
          </p>

          {Object.keys(grandeLashStats.byPosition).length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {Object.entries(grandeLashStats.byPosition)
                  .sort(([, a], [, b]) => b - a)
                  .map(([position, count], index) => {
                    const percentage =
                      grandeLashStats.total > 0 ? (count / grandeLashStats.total) * 100 : 0;
                    const label = positionLabels[position] || {
                      name: position,
                      description: "",
                    };
                    const isTop = index === 0;

                    return (
                      <div key={position} className="p-4 hover:bg-gray-50 transition">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {isTop && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">
                                  #1
                                </span>
                              )}
                              <span className="font-medium text-gray-900">{label.name}</span>
                            </div>
                            {label.description && (
                              <p className="text-xs text-gray-500 mt-1">{label.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{count}</div>
                            <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isTop
                                ? "bg-gradient-to-r from-rose-500 to-pink-500"
                                : "bg-gradient-to-r from-gray-400 to-gray-500"
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
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-gray-400 text-4xl mb-3">📊</div>
              <p className="text-gray-500">עדיין אין נתונים על לחיצות</p>
              <p className="text-sm text-gray-400 mt-1">
                ברגע שמישהו ילחץ על כפתור לאמזון, הנתונים יופיעו כאן
              </p>
            </div>
          )}
        </section>

        {/* Insights */}
        {grandeLashStats.total > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              תובנות
            </h2>
            <p className="text-sm text-gray-500 mb-4">מה אפשר ללמוד מהנתונים</p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Best Performing Button Insight */}
              {grandeLashStats.bestButton && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h3 className="font-semibold text-green-800">הכפתור המנצח</h3>
                      <p className="text-sm text-green-700 mt-1">
                        <strong>
                          {positionLabels[grandeLashStats.bestButton]?.name ||
                            grandeLashStats.bestButton}
                        </strong>{" "}
                        מביא {grandeLashStats.byPosition[grandeLashStats.bestButton]} לחיצות (
                        {(
                          (grandeLashStats.byPosition[grandeLashStats.bestButton] /
                            grandeLashStats.total) *
                          100
                        ).toFixed(0)}
                        % מכל הלחיצות)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Peak Hour Insight */}
              {grandeLashStats.peakHour !== null && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <h3 className="font-semibold text-blue-800">שעת השיא</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        רוב הלחיצות מגיעות בשעה{" "}
                        <strong>
                          {grandeLashStats.peakHour}:00-{grandeLashStats.peakHour + 1}:00
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile vs Desktop Hint */}
              {grandeLashStats.byPosition["sticky-mobile"] && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h3 className="font-semibold text-purple-800">תנועה ממובייל</h3>
                      <p className="text-sm text-purple-700 mt-1">
                        {grandeLashStats.byPosition["sticky-mobile"]} לחיצות מהכפתור הצף במובייל (
                        {(
                          (grandeLashStats.byPosition["sticky-mobile"] / grandeLashStats.total) *
                          100
                        ).toFixed(0)}
                        %)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Conversion Path */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h3 className="font-semibold text-amber-800">טיפ</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      כפתורים בסוף העמוד (FAQ, Final CTA) מראים שאנשים קוראים את כל התוכן לפני
                      שמחליטים לקנות
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Clicks */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            לחיצות אחרונות
          </h2>
          <p className="text-sm text-gray-500 mb-4">15 הלחיצות האחרונות בזמן אמת</p>

          {grandeLashStats.recentClicks.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        תאריך ושעה
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        כפתור
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        מוצר
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {grandeLashStats.recentClicks.map((click, index) => {
                      const label = positionLabels[click.button_position] || {
                        name: click.button_position,
                      };
                      const isRecent = index < 3;

                      return (
                        <tr key={click.id} className={isRecent ? "bg-green-50/50" : ""}>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              {isRecent && (
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              )}
                              {new Date(click.timestamp).toLocaleString("he-IL", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex px-2 py-1 rounded-md bg-rose-100 text-rose-700 text-xs font-medium">
                              {label.name}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{click.product_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-gray-400 text-4xl mb-3">🕐</div>
              <p className="text-gray-500">אין לחיצות עדיין</p>
              <p className="text-sm text-gray-400 mt-1">לחיצות חדשות יופיעו כאן בזמן אמת</p>
            </div>
          )}
        </section>

        {/* Daily Breakdown */}
        {Object.keys(grandeLashStats.byDay).length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              לחיצות לפי יום
            </h2>
            <p className="text-sm text-gray-500 mb-4">היסטוריית לחיצות יומית</p>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="space-y-2">
                {Object.entries(grandeLashStats.byDay)
                  .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                  .slice(0, 14)
                  .map(([day, count]) => {
                    const maxCount = Math.max(...Object.values(grandeLashStats.byDay));
                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    const isToday = day === today;
                    const date = new Date(day);
                    const dayName = date.toLocaleDateString("he-IL", { weekday: "short" });

                    return (
                      <div key={day} className="flex items-center gap-3">
                        <div className="w-20 text-sm text-gray-500 text-right">
                          {isToday ? (
                            <span className="text-green-600 font-medium">היום</span>
                          ) : (
                            <>
                              {dayName}{" "}
                              {date.toLocaleDateString("he-IL", {
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </>
                          )}
                        </div>
                        <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                          <div
                            className={`h-full rounded transition-all duration-500 ${
                              isToday ? "bg-green-500" : "bg-indigo-400"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-8 text-sm font-medium text-gray-700 text-left">
                          {count}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Help Section */}
        <section className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">❓ מה המספרים האלה אומרים?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-800 mb-1">לחיצה לאמזון</h3>
              <p className="text-gray-600">
                כל פעם שמישהו לוחץ על כפתור &quot;Buy Now&quot; ועובר לאמזון, זה נספר כלחיצה. זה לא
                אומר שהוא קנה - רק שהוא התעניין מספיק כדי ללחוץ.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">למה חשוב לדעת איזה כפתור?</h3>
              <p className="text-gray-600">
                אם רוב הלחיצות מגיעות מכפתור מסוים, כדאי לשים שם יותר דגש. אם כפתור לא מקבל
                לחיצות, אולי צריך לשנות את המיקום או הטקסט שלו.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">איך לדעת אם זה עובד?</h3>
              <p className="text-gray-600">
                אם יש לחיצות, העמוד עובד! הצעד הבא הוא לבדוק בחשבון Amazon Associates כמה מהלחיצות
                האלה הפכו לרכישות בפועל.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">מה עם Facebook Pixel?</h3>
              <p className="text-gray-600">
                כל לחיצה נשלחת גם ל-Facebook כ-&quot;Lead&quot;. אפשר לראות את זה ב-Events Manager
                ולהשתמש בזה לretargeting.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
