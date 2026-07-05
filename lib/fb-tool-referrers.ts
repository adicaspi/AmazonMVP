// Facebook tool domains that mean "the site owner previewing/testing",
// never a real visitor: Events Manager test events, Ads Manager ad preview,
// Business Suite. Traffic referred from these should not count as analytics.
const FB_TOOL_HOSTS = [
  "eventsmanager.facebook.com",
  "adsmanager.facebook.com",
  "business.facebook.com",
];

export function isFbToolReferrer(referrer: string | null | undefined): boolean {
  if (!referrer) return false;
  try {
    const host = new URL(referrer).hostname.replace("www.", "").toLowerCase();
    return FB_TOOL_HOSTS.includes(host);
  } catch {
    return false;
  }
}
