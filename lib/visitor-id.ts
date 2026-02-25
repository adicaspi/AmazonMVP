const VISITOR_ID_KEY = "aipicks_vid";

/**
 * Get or create a persistent visitor ID stored in localStorage.
 * This ID links page views with Amazon clicks in the analytics dashboard.
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let vid = localStorage.getItem(VISITOR_ID_KEY);
  if (!vid) {
    vid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(VISITOR_ID_KEY, vid);
  }
  return vid;
}
