import { supabase } from "@/lib/db";
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
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referer?: string;
};

async function getAmazonClicks(): Promise<AmazonClick[]> {
  try {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("amazon_clicks")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("Error fetching amazon clicks:", error);
      return [];
    }
    return data || [];
  } catch {
    return [];
  }
}

async function getPageViews(page: string): Promise<number> {
  try {
    if (!supabase) return 0;
    const { count, error } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .eq("page", page);

    if (error) {
      console.error("Error fetching page views:", error);
      return 0;
    }
    return count ?? 0;
  } catch {
    return 0;
  }
}

async function getTrafficSources(page: string): Promise<Record<string, number>> {
  try {
    if (!supabase) return {};
    const { data, error } = await supabase
      .from("page_views")
      .select("utm_source, referer")
      .eq("page", page)
      .limit(1000);

    if (error) {
      console.error("Error fetching traffic sources:", error);
      return {};
    }

    if (!data) return {};
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
  } catch {
    return {};
  }
}

function getClickStats(clicks: AmazonClick[], page?: string) {
  const filtered = page ? clicks.filter((c) => c.page === page) : clicks;

  const byPosition: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  const byHour: Record<number, number> = {};
  const clicksBySource: Record<string, number> = {};

  filtered.forEach((click) => {
    byPosition[click.button_position] = (byPosition[click.button_position] || 0) + 1;
    const day = click.timestamp.split("T")[0];
    byDay[day] = (byDay[day] || 0) + 1;
    const hour = new Date(click.timestamp).getHours();
    byHour[hour] = (byHour[hour] || 0) + 1;

    // Determine traffic source for this click
    let source = "Direct";
    if (click.utm_source) {
      source = click.utm_source;
    } else if (click.referer) {
      try {
        const url = new URL(click.referer);
        const hostname = url.hostname.replace("www.", "");
        // Don't count our own site as a source
        if (!hostname.includes("localhost") && !hostname.includes("aipicks") && !hostname.includes("vercel")) {
          source = hostname;
        }
      } catch {
        // keep as Direct
      }
    }
    clicksBySource[source] = (clicksBySource[source] || 0) + 1;
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
    clicksBySource,
    recentClicks: filtered
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15),
  };
}

function buildPageData(amazonClicks: AmazonClick[], pageViews: number, stats: ReturnType<typeof getClickStats>) {
  let views = pageViews;
  if (views < stats.total) {
    views = stats.total;
  }

  const today = new Date().toISOString().split("T")[0];
  const todayClicks = stats.byDay[today] || 0;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekClicks = Object.entries(stats.byDay)
    .filter(([day]) => new Date(day) >= weekAgo)
    .reduce((sum, [, count]) => sum + count, 0);

  return { views, totalClicks: stats.total, todayClicks, weekClicks, bestButton: stats.bestButton, byPosition: stats.byPosition, byDay: stats.byDay, recentClicks: stats.recentClicks, peakHour: stats.peakHour, clicksBySource: stats.clicksBySource };
}

export default async function AnalyticsPage() {
  const amazonClicks = await getAmazonClicks();

  // Grandelash data
  const grandeLashStats = getClickStats(amazonClicks, "/grandelash");
  const grandeLashViews = await getPageViews("/grandelash");
  const grandeLashTraffic = await getTrafficSources("/grandelash");
  const grandeLashData = buildPageData(amazonClicks, grandeLashViews, grandeLashStats);

  // Lashserum data
  const lashSerumStats = getClickStats(amazonClicks, "/lashserum");
  const lashSerumViews = await getPageViews("/lashserum");
  const lashSerumTraffic = await getTrafficSources("/lashserum");
  const lashSerumData = buildPageData(amazonClicks, lashSerumViews, lashSerumStats);

  return (
    <AnalyticsDashboard
      pages={[
        {
          id: "grandelash",
          label: "GrandeLash",
          path: "/grandelash",
          ...grandeLashData,
          trafficSources: grandeLashTraffic,
        },
        {
          id: "lashserum",
          label: "Lash Serum",
          path: "/lashserum",
          ...lashSerumData,
          trafficSources: lashSerumTraffic,
        },
      ]}
    />
  );
}
