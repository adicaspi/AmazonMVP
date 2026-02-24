import { supabase, isDatabaseAvailable } from "@/lib/db";
import { normalizeSource } from "@/lib/normalizeSource";
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
  device_type?: string;
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

type RecentVisit = {
  id: string;
  timestamp: string;
  page: string;
  utm_source: string | null;
  device_type: string;
  full_url: string | null;
};

type TrafficSourceData = {
  sources: Record<string, number>;
  deviceCounts: Record<string, number>;
  sourceDeviceBreakdown: Record<string, Record<string, number>>;
  recentVisits: RecentVisit[];
};

async function getTrafficSources(page: string): Promise<TrafficSourceData> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      const { data, error } = await supabase
        .from("page_views")
        .select("id, timestamp, page, utm_source, referer, device_type, full_url")
        .eq("page", page)
        .order("timestamp", { ascending: false })
        .limit(1000);

      if (!error && data) {
        const sources: Record<string, number> = {};
        const deviceCounts: Record<string, number> = {};
        const sourceDeviceBreakdown: Record<string, Record<string, number>> = {};

        data.forEach((view: any) => {
          let source = "Direct";
          if (view.utm_source) {
            source = normalizeSource(view.utm_source);
          } else if (view.referer) {
            try {
              const host = new URL(view.referer).hostname.replace("www.", "").toLowerCase();
              // Skip self-referrals
              if (host === "aipicks.co") {
                source = "Direct";
              } else {
                source = normalizeSource(host);
              }
            } catch {
              source = normalizeSource(view.referer);
            }
          }
          sources[source] = (sources[source] || 0) + 1;

          const device = view.device_type || "unknown";
          deviceCounts[device] = (deviceCounts[device] || 0) + 1;

          if (!sourceDeviceBreakdown[source]) sourceDeviceBreakdown[source] = {};
          sourceDeviceBreakdown[source][device] = (sourceDeviceBreakdown[source][device] || 0) + 1;
        });
        const recentVisits: RecentVisit[] = data.slice(0, 30).map((v: any) => ({
          id: v.id,
          timestamp: v.timestamp,
          page: v.page || page,
          utm_source: v.utm_source || null,
          device_type: v.device_type || "unknown",
          full_url: v.full_url || null,
        }));

        return { sources, deviceCounts, sourceDeviceBreakdown, recentVisits };
      }
    }
    return { sources: {}, deviceCounts: {}, sourceDeviceBreakdown: {}, recentVisits: [] };
  } catch {
    return { sources: {}, deviceCounts: {}, sourceDeviceBreakdown: {}, recentVisits: [] };
  }
}

function getClickStats(clicks: AmazonClick[], page?: string) {
  const filtered = page ? clicks.filter((c) => c.page === page) : clicks;

  const byPosition: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  const byHour: Record<number, number> = {};
  const byDevice: Record<string, number> = {};
  const byPositionDevice: Record<string, Record<string, number>> = {};

  filtered.forEach((click) => {
    byPosition[click.button_position] = (byPosition[click.button_position] || 0) + 1;
    const day = click.timestamp.split("T")[0];
    byDay[day] = (byDay[day] || 0) + 1;
    const hour = new Date(click.timestamp).getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;

    const device = click.device_type || "unknown";
    byDevice[device] = (byDevice[device] || 0) + 1;

    if (!byPositionDevice[click.button_position]) byPositionDevice[click.button_position] = {};
    byPositionDevice[click.button_position][device] = (byPositionDevice[click.button_position][device] || 0) + 1;
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
    byDevice,
    byPositionDevice,
    bestButton,
    peakHour,
    recentClicks: filtered
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 30),
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
      const trafficData = await getTrafficSources(path);

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
        byPositionDevice: stats.byPositionDevice,
        byDay: stats.byDay,
        byDevice: stats.byDevice,
        recentClicks: stats.recentClicks,
        peakHour: stats.peakHour,
        trafficSources: trafficData.sources,
        viewDeviceCounts: trafficData.deviceCounts,
        sourceDeviceBreakdown: trafficData.sourceDeviceBreakdown,
        recentVisits: trafficData.recentVisits,
      };
    })
  );

  // Build "All" aggregate
  const allStats = getClickStats(allClicks);
  let allViews = pagesData.reduce((sum, p) => sum + p.views, 0);
  if (allViews < allStats.total) allViews = allStats.total;

  const allTrafficSources: Record<string, number> = {};
  const allViewDeviceCounts: Record<string, number> = {};
  const allSourceDeviceBreakdown: Record<string, Record<string, number>> = {};
  let allRecentVisits: RecentVisit[] = [];
  pagesData.forEach((p) => {
    allRecentVisits = allRecentVisits.concat(p.recentVisits);
    Object.entries(p.trafficSources).forEach(([source, count]) => {
      allTrafficSources[source] = (allTrafficSources[source] || 0) + count;
    });
    Object.entries(p.viewDeviceCounts).forEach(([device, count]) => {
      allViewDeviceCounts[device] = (allViewDeviceCounts[device] || 0) + count;
    });
    Object.entries(p.sourceDeviceBreakdown).forEach(([source, devices]) => {
      if (!allSourceDeviceBreakdown[source]) allSourceDeviceBreakdown[source] = {};
      Object.entries(devices).forEach(([device, count]) => {
        allSourceDeviceBreakdown[source][device] = (allSourceDeviceBreakdown[source][device] || 0) + count;
      });
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
    byPositionDevice: allStats.byPositionDevice,
    byDay: allStats.byDay,
    byDevice: allStats.byDevice,
    recentClicks: allStats.recentClicks,
    peakHour: allStats.peakHour,
    trafficSources: allTrafficSources,
    viewDeviceCounts: allViewDeviceCounts,
    sourceDeviceBreakdown: allSourceDeviceBreakdown,
    recentVisits: allRecentVisits
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 30),
  };

  return <AnalyticsDashboard allData={allPageData} pagesData={pagesData} />;
}
