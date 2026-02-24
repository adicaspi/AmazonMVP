// Facebook Conversions API helper functions

/**
 * Generate a unique event ID for deduplication between browser pixel and server CAPI.
 * Both the browser fbq() call and the server POST use the same event_id,
 * so Facebook knows they're the same event and doesn't double-count.
 */
export function generateEventId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Extract Facebook cookies (_fbc and _fbp) from a cookie header string.
 * These cookies improve matching quality in the Conversions API.
 */
export function getFbCookies(cookieHeader: string | null): {
  fbc: string | null;
  fbp: string | null;
} {
  if (!cookieHeader) return { fbc: null, fbp: null };

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, ...val] = cookie.trim().split("=");
      acc[key] = val.join("=");
      return acc;
    },
    {} as Record<string, string>
  );

  return {
    fbc: cookies["_fbc"] || null,
    fbp: cookies["_fbp"] || null,
  };
}
