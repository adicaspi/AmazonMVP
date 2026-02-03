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
  const amazonClicks = await getAmazonClicks();
  const grandeLashStats = getClickStats(amazonClicks, "/grandelash");
  let grandeLashViews = await getPageViews("/grandelash");

  // Fix: Views should always be >= clicks (can't click without viewing)
  if (grandeLashViews < grandeLashStats.total) {
    grandeLashViews = grandeLashStats.total;
  }

  const today = new Date().toISOString().split("T")[0];
  const todayClicks = grandeLashStats.byDay[today] || 0;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekClicks = Object.entries(grandeLashStats.byDay)
    .filter(([day]) => new Date(day) >= weekAgo)
    .reduce((sum, [, count]) => sum + count, 0);

  return (
    <AnalyticsDashboard
      views={grandeLashViews}
      totalClicks={grandeLashStats.total}
      todayClicks={todayClicks}
      weekClicks={weekClicks}
      bestButton={grandeLashStats.bestButton}
      byPosition={grandeLashStats.byPosition}
      byDay={grandeLashStats.byDay}
      recentClicks={grandeLashStats.recentClicks}
      peakHour={grandeLashStats.peakHour}
    />
  );
}
