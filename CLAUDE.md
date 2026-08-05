# AmazonMVP — project notes

## CRITICAL INVARIANTS — do not break these

### 1. Amazon app deep-linking (conversion-critical!)
`components/AmazonButton.tsx` deep-links every mobile click into the Amazon
APP (iOS: `com.amazon.mobile.shopping.web://` scheme; Android: `intent://`
with fallback). This is THE conversion driver — users land logged-in with
1-click buy. Rules:
- Every Amazon CTA on every page MUST use `AmazonButton` — never a raw <a>.
- Amazon links must be DIRECT `https://www.amazon.com/...` URLs (with tag +
  linkId). NEVER amzn.to shortlinks — the redirect hop breaks app handoff.
- Mobile navigates same-tab (no target=_blank on mobile) — new tabs never
  hand off to the app. Desktop keeps _blank.
- Tracking fetches use `keepalive: true` so they survive navigation.
- Amazon's AASA excludes product pages, so the scheme (with iOS's one-time
  dialog) is the ONLY way to open the app; do not "simplify" back to plain
  links on mobile.
- iOS fallback detection: ONLY visibilitychange/pagehide mean "app opened".
  NEVER add `blur` — Safari's "address is invalid" alert (no app installed)
  fires blur while the page stays visible, which cancels the web fallback
  and strands the user. Fallback timer stays short (~1.2s).

### 2. Truthful marketing only
Page claims (rating, review count, price anchors) must match the live
Amazon listing. No fake scarcity/countdowns/viewers, no invented
testimonials, no AI imagery presented as real customers.

### 3. Analytics separation
Facebook-sourced numbers and first-party numbers are never mixed in one
metric. FB conversions come from the official `results` insights field.

### 4. Tracking pages
New product pages must be wired in: AmazonButton maps (pixel/product/click
events), MetaPixelInit, api/page-view maps, analytics TRACKED_PAGES,
clear-direct ALLOWED_PAGES, and campaign keyword binding in
AnalyticsDashboard. Every landing route also needs its own layout.tsx
(copy from any Birkenstock route) that hides the global site header.
