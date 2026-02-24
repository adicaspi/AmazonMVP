import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";
import { generateEventId, getFbCookies } from "@/lib/fb-conversions";

// Map page paths to their dedicated Facebook Pixel IDs
const PAGE_PIXEL_MAP: Record<string, string> = {
  "/auraglow": "2679443682454721",
  "/grandelash": "876318711699041",
};

function getPixelIdForPage(page: string): string | null {
  for (const [prefix, pixelId] of Object.entries(PAGE_PIXEL_MAP)) {
    if (page.startsWith(prefix)) return pixelId;
  }
  return null;
}

async function sendCAPIPageView(
  pixelId: string,
  eventSourceUrl: string,
  fbc: string | null,
  fbp: string | null,
  clientIp: string | null,
  clientUa: string | null,
) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!accessToken) return;

  const userData: Record<string, string | null> = {};
  if (fbc) userData.fbc = fbc;
  if (fbp) userData.fbp = fbp;
  if (clientIp) userData.client_ip_address = clientIp;
  if (clientUa) userData.client_user_agent = clientUa;

  const event = {
    event_name: "PageView",
    event_time: Math.floor(Date.now() / 1000),
    event_id: generateEventId(),
    event_source_url: eventSourceUrl,
    action_source: "website",
    user_data: userData,
  };

  const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE || null;
  const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;
  const payload: Record<string, unknown> = { data: [event] };
  if (testEventCode) payload.test_event_code = testEventCode;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Don't block the page view response
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, full_url, utm_source, utm_medium, utm_campaign, utm_content } = body;

    if (!page) {
      return NextResponse.json(
        { error: "Missing page field" },
        { status: 400 }
      );
    }

    // Detect device type from user-agent
    const ua = request.headers.get("user-agent") || "";
    let device_type = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      device_type = "tablet";
    } else if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) {
      device_type = "mobile";
    }

    const view = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      page: page,
      user_agent: ua || null,
      referer: request.headers.get("referer") || null,
      full_url: full_url || null,
      device_type,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
    };

    // Save to Supabase
    if (supabase && (await isDatabaseAvailable())) {
      const { error } = await supabase.from("page_views").insert(view);

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    // Send PageView to Facebook CAPI (server-side, bypasses ad blockers)
    const pixelId = getPixelIdForPage(page);
    if (pixelId) {
      const { fbc, fbp } = getFbCookies(request.headers.get("cookie"));
      const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
      sendCAPIPageView(pixelId, full_url || `https://aipicks.co${page}`, fbc, fbp, clientIp, ua);
    }

    return NextResponse.json({ success: true, viewId: view.id });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!supabase || !(await isDatabaseAvailable())) {
      return NextResponse.json({ views: [], total: 0, sources: {} });
    }

    let query = supabase
      .from("page_views")
      .select("*", { count: "exact" })
      .order("timestamp", { ascending: false })
      .limit(1000);

    if (page) {
      query = query.eq("page", page);
    }

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    // Calculate traffic sources
    const sources: Record<string, number> = {};
    data?.forEach((view: any) => {
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

    return NextResponse.json({
      views: data || [],
      total: count || 0,
      sources,
    });
  } catch (error) {
    console.error("Error reading page views:", error);
    return NextResponse.json(
      { error: "Failed to read views" },
      { status: 500 }
    );
  }
}
