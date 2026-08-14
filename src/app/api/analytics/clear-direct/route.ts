import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";
import { isFbToolReferrer } from "@/lib/fb-tool-referrers";
import { isBotUserAgent } from "@/lib/bot-detect";

// Deletes ONLY "Direct" first-party analytics rows for one page:
// page_views with no utm_source, no ad click-id (fbclid/gclid/ttclid) and no
// external referrer — the same classification the dashboard uses — plus the
// amazon_clicks made by visitors whose visits were exclusively Direct.
// Facebook/Google/TikTok-attributed data is never touched, and nothing on
// Facebook's side is affected (that data lives at Meta).

const ALLOWED_PAGES = ["/auraglow", "/shark-flexstyle", "/sharkflex", "/BirkenstockArizona", "/BirkenstockTraffic", "/BirkenstockSales", "/BirkenstockInstagram", "/BirkenstockAudience", "/UggScuffette", "/NewBalance928", "/GrandeLashMD"];

type ViewRow = {
  id: string;
  visitor_id: string | null;
  utm_source: string | null;
  referer: string | null;
  full_url: string | null;
  user_agent: string | null;
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

// Removable: Direct (owner) visits, Events Manager test previews, and bot
// crawls (Meta ad-review bots carry fbclid so they'd otherwise look like
// ad traffic — the user-agent gives them away).
function isRemovable(view: ViewRow): boolean {
  return isDirect(view) || isFbToolReferrer(view.referer) || isBotUserAgent(view.user_agent);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function POST(request: NextRequest) {
  // Ungated by owner request (notrack retired) — deletes only direct/test
  // rows, and the dashboard button asks for confirmation first.
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
      .select("id, visitor_id, utm_source, referer, full_url, user_agent")
      .eq("page", page)
      .range(offset, offset + PAGE_SIZE - 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) break;
    views.push(...(data as ViewRow[]));
    if (data.length < PAGE_SIZE) break;
  }

  const directIds: string[] = [];
  const nonDirectVisitors = new Set<string>();
  const removableVisitors = new Set<string>();
  for (const v of views) {
    if (isRemovable(v)) {
      directIds.push(v.id);
      if (v.visitor_id) removableVisitors.add(v.visitor_id);
    } else if (v.visitor_id) {
      nonDirectVisitors.add(v.visitor_id);
    }
  }
  // A visitor is only "removable" if ALL their views are — one real
  // ad-attributed view keeps every click of theirs.
  nonDirectVisitors.forEach((id) => removableVisitors.delete(id));

  // Clicks to remove — CONSERVATIVE (a previous version deleted real ad
  // clicks: whole "burst" visitors and anyone without a matching view):
  // 1. Clicks of visitors whose ENTIRE view history here is direct/test/bot.
  // 2. Duplicate taps: a click within 1.5s of the SAME visitor's previous
  //    click deletes only the duplicate, never the visitor's other clicks.
  // Clicks with no visitor id or no view rows at all are KEPT — they may be
  // real traffic whose view simply wasn't recorded.
  const { data: clickRows, error: clickErr } = await supabase
    .from("amazon_clicks")
    .select("id, visitor_id, timestamp")
    .eq("page", page);
  if (clickErr) return NextResponse.json({ error: clickErr.message }, { status: 500 });

  const clickIdsToDelete: string[] = [];
  const byVisitor = new Map<string, { id: string; t: number }[]>();
  for (const c of clickRows || []) {
    if (c.visitor_id && removableVisitors.has(c.visitor_id)) {
      clickIdsToDelete.push(c.id);
      continue;
    }
    if (!c.visitor_id) continue;
    const arr = byVisitor.get(c.visitor_id) || [];
    arr.push({ id: c.id, t: new Date(c.timestamp).getTime() });
    byVisitor.set(c.visitor_id, arr);
  }
  for (const [, arr] of byVisitor) {
    arr.sort((a, b) => a.t - b.t);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].t - arr[i - 1].t < 1500) clickIdsToDelete.push(arr[i].id);
    }
  }

  // .select("id") makes the delete return the actually-deleted rows, so a
  // silent RLS block (success with 0 rows) is detectable instead of invisible
  let deletedClicks = 0;
  for (const ids of chunk(clickIdsToDelete, 200)) {
    const { data, error } = await supabase
      .from("amazon_clicks")
      .delete()
      .in("id", ids)
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
