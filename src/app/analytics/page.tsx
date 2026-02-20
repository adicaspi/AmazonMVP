import { supabase, isDatabaseAvailable } from "@/lib/db";
import AnalyticsDashboard from "./AnalyticsDashboard";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
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

// Pages we track
const TRACKED_PAGES = [
  { path: "/auraglow", label: "AuraGlow", color: "blue" },
  { path: "/grandelash", label: "GrandeLash", color: "rose" },
] as const;

async function getAmazonClicks(): Promise<AmazonClick[]> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      const { data, error } = await supabase
        .from("amazon_clicks")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(2000);

      if (!error && data) return data;
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

      if (!error && count !== null) return count;
    }
    return 0;
  } catch {
    return 0;
  }
}

async function getTrafficSources(page: string): Promise<Record<string, number>> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      const { data, error } = await supabase
        .from("page_views")
        .select("utm_source, referer")
        .eq("page", page)
        .limit(1000);

      if (!error && data) {
        const sources: Record<string, number> = {};
        data.forEach((view: any) => {
          let source = "Direct";
          if (view.utm_source) {
            source = view.utm_source;
          } else if (view.referer) {
            try {
              const url = new URL(view.referer);
              source = url.hostname.replace("www.", "");
            } catch {
              source = view.referer;
            }
          }
          sources[source] = (sources[source] || 0) + 1;
        });
        return sources;
      }
    }
    return {};
  } catch {
    return {};
  }
}

function getClickStats(clicks: AmazonClick[], page?: string) {
  const filtered = page ? clicks.filter((c) => c.page === page) : clicks;

  const byPosition: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  const byHour: Record<number, number> = {};

  filtered.forEach((click) => {
    byPosition[click.button_position] = (byPosition[click.button_position] || 0) + 1;
    const day = click.timestamp.split("T")[0];
    byDay[day] = (byDay[day] || 0) + 1;
    const hour = new Date(click.timestamp).getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;
  });

  const sortedPositions = Object.entries(byPosition).sort(([, a], [, b]) => b - a);
  const bestButton = sortedPositions[0]?.[0] || null;
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
  const allClicks = await getAmazonClicks();
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  // Build page data for each tracked page
  const pagesData = await Promise.all(
    TRACKED_PAGES.map(async ({ path, label, color }) => {
      const stats = getClickStats(allClicks, path);
      let views = await getPageViews(path);
      const trafficSources = await getTrafficSources(path);

      // Fix: Views should always be >= clicks
      if (views < stats.total) views = stats.total;

      const todayClicks = stats.byDay[today] || 0;
      const weekClicks = Object.entries(stats.byDay)
        .filter(([day]) => new Date(day) >= weekAgo)
        .reduce((sum, [, count]) => sum + count, 0);

      return {
        page: path,
        label,
        color,
        views,
        totalClicks: stats.total,
        todayClicks,
        weekClicks,
        bestButton: stats.bestButton,
        byPosition: stats.byPosition,
        byDay: stats.byDay,
        recentClicks: stats.recentClicks,
        peakHour: stats.peakHour,
        trafficSources,
      };
    })
  );

  // Build "All" aggregate
  const allStats = getClickStats(allClicks);
  let allViews = pagesData.reduce((sum, p) => sum + p.views, 0);
  if (allViews < allStats.total) allViews = allStats.total;

  const allTrafficSources: Record<string, number> = {};
  pagesData.forEach((p) => {
    Object.entries(p.trafficSources).forEach(([source, count]) => {
      allTrafficSources[source] = (allTrafficSources[source] || 0) + count;
    });
  });

  const allTodayClicks = allStats.byDay[today] || 0;
  const allWeekClicks = Object.entries(allStats.byDay)
    .filter(([day]) => new Date(day) >= weekAgo)
    .reduce((sum, [, count]) => sum + count, 0);

  const allPageData = {
    page: "all",
    label: "All Pages",
    color: "emerald" as const,
    views: allViews,
    totalClicks: allStats.total,
    todayClicks: allTodayClicks,
    weekClicks: allWeekClicks,
    bestButton: allStats.bestButton,
    byPosition: allStats.byPosition,
    byDay: allStats.byDay,
    recentClicks: allStats.recentClicks,
    peakHour: allStats.peakHour,
    trafficSources: allTrafficSources,
  };

  return <AnalyticsDashboard allData={allPageData} pagesData={pagesData} />;
}
