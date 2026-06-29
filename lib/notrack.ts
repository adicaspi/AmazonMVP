// Lets the site owner exclude their OWN visits/clicks from analytics & pixels.
// Visit any page with ?notrack=1 once to set a long-lived cookie on your browser;
// from then on, your traffic is never counted. Visit with ?notrack=0 to re-enable.

const COOKIE = "aip_notrack";

export function isNotrackEnabled(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c === `${COOKIE}=1`);
}

// Reads ?notrack from the URL, persists the choice as a cookie, and returns
// whether tracking should be skipped for this browser.
export function resolveNotrack(): boolean {
  if (typeof window === "undefined") return false;
  const value = new URLSearchParams(window.location.search).get("notrack");
  if (value === "1") {
    document.cookie = `${COOKIE}=1; max-age=31536000; path=/`;
    return true;
  }
  if (value === "0") {
    document.cookie = `${COOKIE}=; max-age=0; path=/`;
    return false;
  }
  return isNotrackEnabled();
}
