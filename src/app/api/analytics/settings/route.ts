import { NextRequest, NextResponse } from "next/server";
import { supabase, isDatabaseAvailable } from "@/lib/db";

// Server-side persistence for dashboard settings (break-even inputs):
// the last saved value wins on every device. Open to any browser by the
// owner's request — worst case someone changes calculator inputs.
export async function POST(request: NextRequest) {
  if (!supabase || !(await isDatabaseAvailable())) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
  let value: unknown;
  try {
    value = (await request.json()).value;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { error } = await supabase
    .from("dashboard_settings")
    .upsert({ key: "break_even", value, updated_at: new Date().toISOString() });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
