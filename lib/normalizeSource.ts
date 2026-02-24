export function normalizeSource(raw: string): string {
  const s = raw.toLowerCase().trim();
  if (s === "fb" || s === "facebook" || s.includes("facebook")) return "facebook";
  if (s === "ig" || s === "instagram" || s.includes("instagram")) return "instagram";
  if (s === "an") return "audience_network";
  if (s.includes("google")) return "google";
  if (s.includes("tiktok")) return "tiktok";
  if (s === "campaign") return "campaign";
  return s;
}
