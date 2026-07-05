import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";

// Deletes ONLY "Direct" first-party analytics rows for one page:
// page_views with no utm_source, no ad click-id (fbclid/gclid/ttclid) and no
// external referrer — the same classification the dashboard uses — plus the
// amazon_clicks made by visitors whose visits were exclusively Direct.
// Facebook/Google/TikTok-attributed data is never touched, and nothing on
// Facebook's side is affected (that data lives at Meta).

const ALLOWED_PAGES = ["/auraglow", "/grandelash", "/shark-flexstyle", "/sharkflex"];

type ViewRow = {
  id: string;
  visitor_id: string | null;
  utm_source: string | null;
  referer: string | null;
  full_url: string | null;
};

function isDirect(view: ViewRow): boolean {
  if (view.utm_source) return false;
  const fullUrl = view.full_url || "";
  if (fullUrl.includes("fbclid=") || fullUrl.includes("gclid=") || fullUrl.includes("ttclid=")) return false;
  if (view.referer) {
    try {
      const host = new URL(view.referer).hostname.replace("www.", "").toLowerCase();
      return host === "aipicks.co"; // self-referral counts as Direct
    } catch {
      return false; // unparsable referrer is classified by name, not Direct
    }
  }
  return true;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function POST(request: NextRequest) {
  // Only the site owner's browser (which carries the aip_notrack=1 cookie set
  // via ?notrack=1) may trigger deletion.
  if (request.cookies.get("aip_notrack")?.value !== "1") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  let page: string;
  try {
    const body = await request.json();
    page = body.page;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!ALLOWED_PAGES.includes(page)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 400 });
  }

  if (!supabase || !(await isDatabaseAvailable())) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  // Fetch all views for the page (paginated) and classify each one
  const views: ViewRow[] = [];
  const PAGE_SIZE = 1000;
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("page_views")
      .select("id, visitor_id, utm_source, referer, full_url")
      .eq("page", page)
      .range(offset, offset + PAGE_SIZE - 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) break;
    views.push(...(data as ViewRow[]));
    if (data.length < PAGE_SIZE) break;
  }

  const directIds: string[] = [];
  const directVisitors = new Set<string>();
  const nonDirectVisitors = new Set<string>();
  for (const v of views) {
    if (isDirect(v)) {
      directIds.push(v.id);
      if (v.visitor_id) directVisitors.add(v.visitor_id);
    } else if (v.visitor_id) {
      nonDirectVisitors.add(v.visitor_id);
    }
  }

  // Visitors who ONLY ever arrived Direct — their clicks go too.
  // Visitors with any ad-attributed visit keep their clicks.
  const directOnlyVisitors = [...directVisitors].filter((id) => !nonDirectVisitors.has(id));

  // .select("id") makes the delete return the actually-deleted rows, so a
  // silent RLS block (success with 0 rows) is detectable instead of invisible
  let deletedClicks = 0;
  for (const ids of chunk(directOnlyVisitors, 200)) {
    const { data, error } = await supabase
      .from("amazon_clicks")
      .delete()
      .eq("page", page)
      .in("visitor_id", ids)
      .select("id");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    deletedClicks += data?.length || 0;
  }

  let deletedViews = 0;
  for (const ids of chunk(directIds, 200)) {
    const { data, error } = await supabase
      .from("page_views")
      .delete()
      .in("id", ids)
      .select("id");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    deletedViews += data?.length || 0;
  }

  return NextResponse.json({
    page,
    totalRows: views.length,
    foundDirectViews: directIds.length,
    deletedViews,
    deletedClicks,
    // Deletes matched rows but removed none → the DB blocked them (RLS
    // without a DELETE policy / anon key instead of service role)
    permissionProblem: directIds.length > 0 && deletedViews === 0,
    // Nothing classified Direct → show how the rows look so we can see why
    sample: directIds.length === 0
      ? views.slice(0, 5).map((v) => ({
          utm: v.utm_source || null,
          referer: v.referer || null,
          url: v.full_url ? v.full_url.slice(0, 120) : null,
        }))
      : undefined,
  });
}
