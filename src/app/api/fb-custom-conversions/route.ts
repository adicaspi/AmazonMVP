import { NextRequest, NextResponse } from "next/server";

// Diagnostic: dump the ad account's Custom Conversions with their rules,
// so misconfigured URL rules (the classic silent killer of Results) are
// visible without digging through Events Manager. Owner-only (notrack cookie).
export async function GET(request: NextRequest) {
  if (request.cookies.get("aip_notrack")?.value !== "1") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const adAccountId = process.env.FACEBOOK_AD_ACCOUNT_ID;
  if (!accessToken || !adAccountId) {
    return NextResponse.json({ error: "Missing Facebook credentials" }, { status: 503 });
  }

  try {
    const url =
      `https://graph.facebook.com/v21.0/act_${adAccountId}/customconversions` +
      `?fields=id,name,rule,custom_event_type,event_source_type,is_archived,pixel{id,name}` +
      `&limit=50&access_token=${accessToken}`;
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: json?.error?.message || "Graph API error" }, { status: 502 });
    }

    // Pretty-print the rule JSON so it's readable in the browser
    const conversions = (json.data || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      pixel: c.pixel ? `${c.pixel.name} (${c.pixel.id})` : null,
      custom_event_type: c.custom_event_type || null,
      is_archived: c.is_archived ?? null,
      rule: c.rule ? JSON.parse(c.rule) : null,
    }));

    return NextResponse.json({ count: conversions.length, conversions }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
