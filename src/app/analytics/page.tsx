import { supabase, isDatabaseAvailable } from "@/lib/db";
import { normalizeSource } from "@/lib/normalizeSource";
import AnalyticsDashboard from "./AnalyticsDashboard";

// ONE timezone for the whole dashboard — read from the Facebook ad account
// itself (timezone_name) so our day buckets line up exactly with Ads Manager.
// Overwritten per request in AnalyticsPage once the account info arrives.
let DASH_TZ = "America/New_York";

function toNYDateString(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-CA", { timeZone: DASH_TZ });
}

function toNYHour(date: Date | string): number {
  const d = typeof date === "string" ? new Date(date) : date;
  return parseInt(d.toLocaleString("en-US", { timeZone: DASH_TZ, hour: "numeric", hour12: false }));
}

// Convert "YYYY-MM-DD" + local time-of-day in DASH_TZ to a UTC ISO instant,
// so Supabase timestamp filters use the same day boundaries as Facebook.
function zonedToUtcISO(dateStr: string, time: string): string {
  const guess = new Date(`${dateStr}T${time}Z`);
  const inTz = new Date(guess.toLocaleString("en-US", { timeZone: DASH_TZ }));
  const inUtc = new Date(guess.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(guess.getTime() - (inTz.getTime() - inUtc.getTime())).toISOString();
}
const rangeStartISO = (from: string) => zonedToUtcISO(from, "00:00:00");
const rangeEndISO = (to: string) => zonedToUtcISO(to, "23:59:59");

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
  visitor_id?: string | null;
};

export type FacebookCampaign = {
  campaign_name: string;
  spend: number;
  impressions: number;
  clicks: number;
  linkClicks: number;
  cpcLink: number;
  landingPageViews: number;
  conversions: number;
  costPerConversion: number;
  conversionEventName: string;
};

export type FacebookAdsData = {
  campaigns: FacebookCampaign[];
  // Today's per-campaign insights, independent of the selected date range —
  // powers the tab badges (FB Results today), so badges never mix sources.
  todayCampaigns: FacebookCampaign[];
  totalSpend: number;
  totalConversions: number;
  avgCostPerConversion: number;
  todaySpend: number;
  currency: string;
  timezone: string;
};

// Pages we track
// pinned: always visible in the dashboard even with zero activity (new pages)
const TRACKED_PAGES: { path: string; label: string; color: string; archived?: boolean; pinned?: boolean }[] = [
  { path: "/auraglow", label: "AuraGlow", color: "blue" },
  { path: "/grandelash", label: "GrandeLash", color: "rose" },
  { path: "/shark-flexstyle", label: "Shark FlexStyle", color: "amber", archived: true },
  { path: "/sharkflex", label: "SharkFlex (Sales)", color: "amber", archived: true },
  { path: "/BirkenstockArizona", label: "Birkenstock", color: "amber", archived: true },
  { path: "/BirkenstockTraffic", label: "Birkenstock (Traffic)", color: "amber", archived: true },
  { path: "/BirkenstockSales", label: "Birkenstock (Sales)", color: "amber", archived: true },
  { path: "/BirkenstockInstagram", label: "Birkenstock (Instagram)", color: "amber", archived: true },
  { path: "/BirkenstockAudience", label: "Birkenstock (Audience)", color: "amber", archived: true },
  { path: "/UggScuffette", label: "UGG Scuffette", color: "amber", pinned: true },
  { path: "/NewBalance928", label: "New Balance 928", color: "blue", pinned: true },
  { path: "/GrandeLashMD", label: "GrandeLash (New)", color: "rose", pinned: true },
  { path: "/GrandeLashInstagram", label: "GrandeLash (IG)", color: "rose", pinned: true },
  { path: "/GrandeLash65", label: "GrandeLash (Broad)", color: "rose", pinned: true },
];

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

async function getPageViews(page: string, from?: string, to?: string): Promise<number> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      let query = supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .eq("page", page);

      if (from) query = query.gte("timestamp", rangeStartISO(from));
      if (to) query = query.lte("timestamp", rangeEndISO(to));

      const { count, error } = await query;
      if (!error && count !== null) return count;
    }
    return 0;
  } catch {
    return 0;
  }
}

async function getTodayPageViews(page: string): Promise<number> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      const todayStr = toNYDateString(new Date());
      const { count, error } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .eq("page", page)
        .gte("timestamp", rangeStartISO(todayStr));

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
  referer: string | null;
  device_type: string;
  full_url: string | null;
  visitor_id: string | null;
  clicked_amazon: boolean;
};

type TrafficSourceData = {
  sources: Record<string, number>;
  deviceCounts: Record<string, number>;
  sourceDeviceBreakdown: Record<string, Record<string, number>>;
  recentVisits: RecentVisit[];
  adViews: Record<string, number>;
  visitorAdMap: Record<string, string>;
  uniqueVisitors: number;
};

async function getTrafficSources(page: string, clickedVisitorIds: Set<string>, from?: string, to?: string): Promise<TrafficSourceData> {
  try {
    if (supabase && (await isDatabaseAvailable())) {
      // Filter by the SAME date range as the page-view count so percentages line up
      let query = supabase
        .from("page_views")
        .select("id, timestamp, page, utm_source, referer, device_type, full_url, visitor_id")
        .eq("page", page);
      if (from) query = query.gte("timestamp", rangeStartISO(from));
      if (to) query = query.lte("timestamp", rangeEndISO(to));

      const { data, error } = await query
        .order("timestamp", { ascending: false })
        .limit(1000);

      if (!error && data) {
        const sources: Record<string, number> = {};
        const deviceCounts: Record<string, number> = {};
        const sourceDeviceBreakdown: Record<string, Record<string, number>> = {};
        const adViews: Record<string, number> = {};
        const visitorAdMap: Record<string, string> = {};
        // People, not page loads: back-from-Amazon and reloads create extra
        // rows for the same person — Facebook's LPV counts landings, so we
        // count distinct visitors (rows without visitor_id count as one each)
        const visitorSet = new Set<string>();

        data.forEach((view: any) => {
          visitorSet.add(view.visitor_id || view.id);
          let source = "Direct";
          const fullUrl = view.full_url || "";
          if (view.utm_source) {
            source = normalizeSource(view.utm_source);
          } else if (fullUrl.includes("fbclid=")) {
            source = normalizeSource("fb");
          } else if (fullUrl.includes("gclid=")) {
            source = normalizeSource("google");
          } else if (fullUrl.includes("ttclid=")) {
            source = normalizeSource("tiktok");
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

          // Per-ad attribution: ?name=... appended by the Facebook ad URL
          try {
            const adName = fullUrl ? new URL(fullUrl).searchParams.get("name") : null;
            if (adName) {
              adViews[adName] = (adViews[adName] || 0) + 1;
              if (view.visitor_id && !visitorAdMap[view.visitor_id]) visitorAdMap[view.visitor_id] = adName;
            }
          } catch {
            // ignore malformed URLs
          }
        });
        const recentVisits: RecentVisit[] = data.slice(0, 30).map((v: any) => ({
          id: v.id,
          timestamp: v.timestamp,
          page: v.page || page,
          utm_source: v.utm_source || null,
          referer: v.referer || null,
          device_type: v.device_type || "unknown",
          full_url: v.full_url || null,
          visitor_id: v.visitor_id || null,
          clicked_amazon: v.visitor_id ? clickedVisitorIds.has(v.visitor_id) : false,
        }));

        return { sources, deviceCounts, sourceDeviceBreakdown, recentVisits, adViews, visitorAdMap, uniqueVisitors: visitorSet.size };
      }
    }
    return { sources: {}, deviceCounts: {}, sourceDeviceBreakdown: {}, recentVisits: [], adViews: {}, visitorAdMap: {}, uniqueVisitors: 0 };
  } catch {
    return { sources: {}, deviceCounts: {}, sourceDeviceBreakdown: {}, recentVisits: [], adViews: {}, visitorAdMap: {}, uniqueVisitors: 0 };
  }
}

function parseFbInsights(rows: any[]): FacebookCampaign[] {
  return rows.map((row) => {
    const actions: any[] = row.actions || [];
    const costPerAction: any[] = row.cost_per_action_type || [];
    // Numerator = Facebook's own "Results" metric (exactly what Ads Manager
    // shows per campaign). Fallback: first true pixel conversion action —
    // engagement actions must not masquerade as conversions.
    let conversions = 0;
    let conversionType = "";
    const resultEntry = Array.isArray(row.results) ? row.results[0] : null;
    const resultValue = resultEntry?.values?.[0]?.value;
    if (resultValue !== undefined && resultValue !== null) {
      conversions = parseInt(resultValue) || 0;
      conversionType = String(resultEntry.indicator || "results").replace("actions:", "");
    } else {
      const conversionAction = actions.find(
        (a: any) => typeof a.action_type === "string" && a.action_type.startsWith("offsite_conversion")
      );
      conversions = conversionAction ? parseInt(conversionAction.value) : 0;
      conversionType = conversionAction?.action_type || "";
    }
    const costEntry = costPerAction.find((c: any) => c.action_type === conversionType);
    const costPerConversion = costEntry ? parseFloat(costEntry.value) : 0;
    const lpvEntry = actions.find((a: any) => a.action_type === "landing_page_view");

    return {
      campaign_name: row.campaign_name || "Unknown",
      spend: parseFloat(row.spend || "0"),
      impressions: parseInt(row.impressions || "0"),
      clicks: parseInt(row.clicks || "0"),
      linkClicks: parseInt(row.inline_link_clicks || "0"),
      cpcLink: parseFloat(row.cost_per_inline_link_click || "0"),
      landingPageViews: lpvEntry ? parseInt(lpvEntry.value) : 0,
      conversions,
      costPerConversion,
      conversionEventName: conversionType,
    };
  });
}

async function getFacebookAdsData(from?: string, to?: string): Promise<FacebookAdsData | null> {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const adAccountId = process.env.FACEBOOK_AD_ACCOUNT_ID;
    if (!accessToken || !adAccountId) return null;

    const baseUrl = `https://graph.facebook.com/v21.0/act_${adAccountId}/insights`;
    const fields = "campaign_id,campaign_name,actions,results,cost_per_action_type,spend,impressions,clicks,inline_link_clicks,cost_per_inline_link_click";
    // Match the dashboard's selected date range; fall back to last 7 days
    const dateParam = from && to
      ? `time_range=${encodeURIComponent(JSON.stringify({ since: from, until: to }))}`
      : "date_preset=last_7d";

    // Fetch the selected range (by campaign), today's per-campaign insights,
    // and campaign statuses in parallel — Off campaigns are hidden
    const [weekRes, todayRes, statusRes] = await Promise.all([
      fetch(`${baseUrl}?fields=${fields}&level=campaign&${dateParam}&limit=50&access_token=${accessToken}`),
      fetch(`${baseUrl}?fields=${fields}&level=campaign&date_preset=today&limit=50&access_token=${accessToken}`),
      fetch(`https://graph.facebook.com/v21.0/act_${adAccountId}/campaigns?fields=id,effective_status&limit=200&access_token=${accessToken}`),
    ]);

    let weekOk = weekRes;
    if (!weekRes.ok) {
      console.error("Facebook Ads API error (with results field):", await weekRes.text());
      // Some accounts/levels reject `results` — retry without it
      const fallbackFields = fields.replace(",results", "");
      weekOk = await fetch(`${baseUrl}?fields=${fallbackFields}&level=campaign&${dateParam}&limit=50&access_token=${accessToken}`);
      if (!weekOk.ok) {
        console.error("Facebook Ads API error:", await weekOk.text());
        return null;
      }
    }

    const weekJson = await weekOk.json();

    // Same `results` fallback for the today fetch
    let todayOk = todayRes;
    if (!todayRes.ok) {
      const fallbackFields = fields.replace(",results", "");
      todayOk = await fetch(`${baseUrl}?fields=${fallbackFields}&level=campaign&date_preset=today&limit=50&access_token=${accessToken}`);
    }
    const todayJson = todayOk.ok ? await todayOk.json() : { data: [] };

    // Only ACTIVE campaigns are shown; if the status fetch fails, show all
    let rows: any[] = weekJson.data || [];
    let todayRows: any[] = todayJson.data || [];
    if (statusRes.ok) {
      const statusJson = await statusRes.json();
      const activeIds = new Set(
        (statusJson.data || [])
          .filter((c: any) => c.effective_status === "ACTIVE")
          .map((c: any) => c.id)
      );
      if (activeIds.size > 0) {
        rows = rows.filter((r: any) => activeIds.has(r.campaign_id));
        todayRows = todayRows.filter((r: any) => activeIds.has(r.campaign_id));
      }
    }

    const campaigns = parseFbInsights(rows);
    const todayCampaigns = parseFbInsights(todayRows);
    const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
    const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
    const avgCostPerConversion = totalConversions > 0 ? totalSpend / totalConversions : 0;
    const todaySpend = todayCampaigns.reduce((s, c) => s + c.spend, 0);

    // Detect currency + timezone from account info (timezone must match the
    // dashboard's Asia/Jerusalem assumption for day buckets to line up)
    let currency = "ILS";
    let timezone = "";
    try {
      const acctRes = await fetch(`https://graph.facebook.com/v21.0/act_${adAccountId}?fields=currency,timezone_name&access_token=${accessToken}`);
      if (acctRes.ok) {
        const acctJson = await acctRes.json();
        currency = acctJson.currency || "ILS";
        timezone = acctJson.timezone_name || "";
      }
    } catch { /* fallback to ILS */ }

    return { campaigns, todayCampaigns, totalSpend, totalConversions, avgCostPerConversion, todaySpend, currency, timezone };
  } catch (err) {
    console.error("Failed to fetch Facebook Ads data:", err);
    return null;
  }
}

// Live USD→ILS rate for displaying Facebook's ILS spend in dollars.
// Free keyless API, cached for an hour; null falls back to the default.
async function getUsdIlsRate(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const rate = (await res.json())?.rates?.ILS;
    return typeof rate === "number" && rate > 0 ? rate : null;
  } catch {
    return null;
  }
}

// Break-even inputs saved by the owner — server-side, so every device sees
// the last saved values. Missing table / no row → null (defaults apply).
async function getBeSettings(): Promise<Record<string, unknown> | null> {
  try {
    if (!supabase || !(await isDatabaseAvailable())) return null;
    const { data, error } = await supabase
      .from("dashboard_settings")
      .select("value")
      .eq("key", "break_even")
      .maybeSingle();
    if (error || !data) return null;
    return data.value as Record<string, unknown>;
  } catch {
    return null;
  }
}

// ── Conversion funnel: ONE honest methodology ─────────────────────────
// Both stages come from full-range DB queries (paginated, no row caps) and
// count PEOPLE. A clicker enters the rate only if they also VISITED in
// range, so conversion can never exceed 100%. Everything else (raw loads,
// total click events, out-of-range clickers) is reported separately for
// transparency instead of silently polluting the rate.
export type FunnelData = {
  people: number;        // distinct visitors in range (no-id rows count once each)
  rawViews: number;      // raw page loads in range
  clickers: number;      // distinct visitors who visited AND clicked in range
  orphanClickers: number;// clicked in range but have no visit in range
  totalClicks: number;   // all click events in range (multi-clicks included)
  noIdClicks: number;    // click events with no visitor id
};

async function fetchAllRows<T>(
  table: string,
  columns: string,
  page: string,
  from?: string,
  to?: string
): Promise<T[]> {
  if (!supabase || !(await isDatabaseAvailable())) return [];
  const rows: T[] = [];
  const PAGE_SIZE = 1000;
  for (let offset = 0; ; offset += PAGE_SIZE) {
    let q = supabase.from(table).select(columns).eq("page", page);
    if (from) q = q.gte("timestamp", rangeStartISO(from));
    if (to) q = q.lte("timestamp", rangeEndISO(to));
    const { data, error } = await q.range(offset, offset + PAGE_SIZE - 1);
    if (error || !data || data.length === 0) break;
    rows.push(...(data as T[]));
    if (data.length < PAGE_SIZE) break;
  }
  return rows;
}

async function getFunnelData(page: string, from?: string, to?: string): Promise<FunnelData> {
  try {
    const [viewRows, clickRows] = await Promise.all([
      fetchAllRows<{ id: string; visitor_id: string | null }>("page_views", "id, visitor_id", page, from, to),
      fetchAllRows<{ id: string; visitor_id: string | null }>("amazon_clicks", "id, visitor_id", page, from, to),
    ]);
    const visitors = new Set<string>();
    viewRows.forEach((v) => visitors.add(v.visitor_id || v.id));
    const clickerIds = new Set<string>();
    let noIdClicks = 0;
    clickRows.forEach((c) => {
      if (c.visitor_id) clickerIds.add(c.visitor_id);
      else noIdClicks++;
    });
    let clickers = 0;
    let orphanClickers = 0;
    clickerIds.forEach((id) => (visitors.has(id) ? clickers++ : orphanClickers++));
    return {
      people: visitors.size,
      rawViews: viewRows.length,
      clickers,
      orphanClickers,
      totalClicks: clickRows.length,
      noIdClicks,
    };
  } catch {
    return { people: 0, rawViews: 0, clickers: 0, orphanClickers: 0, totalClicks: 0, noIdClicks: 0 };
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
    const day = toNYDateString(click.timestamp);
    byDay[day] = (byDay[day] || 0) + 1;
    const hour = toNYHour(click.timestamp);
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

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const params = await searchParams;
  const dateFrom = params.from || undefined;
  const dateTo = params.to || undefined;

  const [allClicks, facebookAdsData, usdIlsRate, beSettings] = await Promise.all([
    getAmazonClicks(),
    getFacebookAdsData(dateFrom, dateTo),
    getUsdIlsRate(),
    getBeSettings(),
  ]);
  // Align ALL date bucketing to the ad account's timezone (before any use)
  if (facebookAdsData?.timezone) DASH_TZ = facebookAdsData.timezone;
  const today = toNYDateString(new Date());
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  // Filter clicks by date range if provided
  const filteredClicks = (dateFrom || dateTo) ? allClicks.filter((click) => {
    const clickDate = toNYDateString(click.timestamp);
    if (dateFrom && clickDate < dateFrom) return false;
    if (dateTo && clickDate > dateTo) return false;
    return true;
  }) : allClicks;

  // Build page data for each tracked page
  const pagesData = await Promise.all(
    TRACKED_PAGES.map(async ({ path, label, color, archived, pinned }) => {
      const stats = getClickStats(filteredClicks, path);
      const rawViews = await getPageViews(path, dateFrom, dateTo);
      const todayViews = await getTodayPageViews(path);
      // "Clicked Amazon" flag: only clicks on THIS page within the selected
      // range — a click on another page must not mark visits here as clicked
      const clickedVisitorIds = new Set<string>();
      let clicksWithoutVisitor = 0;
      filteredClicks.forEach((click) => {
        if (click.page !== path) return;
        if (click.visitor_id) clickedVisitorIds.add(click.visitor_id);
        else clicksWithoutVisitor++;
      });
      const [trafficData, funnel] = await Promise.all([
        getTrafficSources(path, clickedVisitorIds, dateFrom, dateTo),
        getFunnelData(path, dateFrom, dateTo),
      ]);
      // "Views" = distinct PEOPLE (like Facebook's landing page views), not
      // raw page loads — reloads/back-from-Amazon don't inflate the funnel.
      const views = trafficData.uniqueVisitors > 0 ? trafficData.uniqueVisitors : rawViews;
      const uniqueClickers = clickedVisitorIds.size + clicksWithoutVisitor;

      const todayClicks = stats.byDay[today] || 0;
      const weekClicks = Object.entries(stats.byDay)
        .filter(([day]) => new Date(day) >= weekAgo)
        .reduce((sum, [, count]) => sum + count, 0);

      // Per-ad funnel: views by ?name=, clicks attributed by the visitor's ad
      const adFunnel: Record<string, { views: number; clicks: number }> = {};
      Object.entries(trafficData.adViews).forEach(([ad, v]) => {
        adFunnel[ad] = { views: v, clicks: 0 };
      });
      filteredClicks
        .filter((c) => c.page === path && c.visitor_id)
        .forEach((c) => {
          const ad = trafficData.visitorAdMap[c.visitor_id as string];
          if (ad) {
            if (!adFunnel[ad]) adFunnel[ad] = { views: 0, clicks: 0 };
            adFunnel[ad].clicks += 1;
          }
        });

      return {
        page: path,
        label,
        color,
        archived: archived ?? false,
        pinned: pinned ?? false,
        funnel,
        views,
        uniqueClickers,
        todayViews,
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
        adFunnel,
      };
    })
  );

  // Build "All" aggregate — active (non-archived) pages only
  const activePagesData = pagesData.filter((p) => !p.archived);
  const activePaths = new Set(activePagesData.map((p) => p.page));
  const allStats = getClickStats(filteredClicks.filter((c) => activePaths.has(c.page)));
  const allViews = activePagesData.reduce((sum, p) => sum + p.views, 0);
  const allTodayViews = activePagesData.reduce((sum, p) => sum + p.todayViews, 0);

  const allAdFunnel: Record<string, { views: number; clicks: number }> = {};
  const allTrafficSources: Record<string, number> = {};
  const allViewDeviceCounts: Record<string, number> = {};
  const allSourceDeviceBreakdown: Record<string, Record<string, number>> = {};
  let allRecentVisits: RecentVisit[] = [];
  activePagesData.forEach((p) => {
    allRecentVisits = allRecentVisits.concat(p.recentVisits);
    Object.entries(p.adFunnel).forEach(([ad, f]) => {
      if (!allAdFunnel[ad]) allAdFunnel[ad] = { views: 0, clicks: 0 };
      allAdFunnel[ad].views += f.views;
      allAdFunnel[ad].clicks += f.clicks;
    });
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
    // Aggregate funnel = sum over active (non-archived) pages; a person
    // visiting two pages counts once per page
    funnel: activePagesData.reduce(
      (acc, p) => ({
        people: acc.people + p.funnel.people,
        rawViews: acc.rawViews + p.funnel.rawViews,
        clickers: acc.clickers + p.funnel.clickers,
        orphanClickers: acc.orphanClickers + p.funnel.orphanClickers,
        totalClicks: acc.totalClicks + p.funnel.totalClicks,
        noIdClicks: acc.noIdClicks + p.funnel.noIdClicks,
      }),
      { people: 0, rawViews: 0, clickers: 0, orphanClickers: 0, totalClicks: 0, noIdClicks: 0 }
    ),
    views: allViews,
    uniqueClickers: activePagesData.reduce((sum, p) => sum + p.uniqueClickers, 0),
    todayViews: allTodayViews,
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
    adFunnel: allAdFunnel,
  };

  return <AnalyticsDashboard allData={allPageData} pagesData={pagesData} facebookAdsData={facebookAdsData} usdIlsRate={usdIlsRate} beSettings={beSettings} dateFrom={dateFrom} dateTo={dateTo} />;
}
