// Detects crawler/bot user-agents so they never pollute analytics.
// Meta's ad-review and link crawlers (facebookexternalhit, meta-externalagent)
// load landing pages repeatedly when a campaign launches — they showed up as
// dozens of phantom "page views" that no human ever made.
const BOT_UA_PATTERN =
  /bot|crawler|spider|crawling|facebookexternalhit|meta-externalagent|facebookcatalog|headless|phantomjs|slurp|bingpreview|whatsapp|telegram|skypeuripreview|pinterest|vkshare|lighthouse|gtmetrix|pagespeed|dataminr|python-requests|curl\/|wget\//i;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return false;
  return BOT_UA_PATTERN.test(ua);
}
