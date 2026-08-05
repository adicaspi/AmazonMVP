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
  `blur` means a system dialog is up (app-confirm OR invalid-address alert)
  — it must PAUSE the fallback until focus returns, never count as success
  and never race the user with a timer.
- Owner's rules: app users' browser stays on OUR page (no web navigation at
  all); no-app users get Amazon web in a NEW tab and must NEVER see
  Safari's "address is invalid" alert. Since iOS pops that alert on any
  unhandled scheme attempt (unsuppressible), the scheme runs ONLY in Meta
  in-app browsers (isMetaInApp — the ad traffic, near-universal app
  ownership, webviews don't show the Safari alert). Regular iOS
  Safari/Chrome: plain target=_blank anchor, no scheme ever.
  In-app fallback NEVER navigates our tab — the "Continue to Amazon"
  sheet's tap (a fresh gesture) opens the web. Post-focus grace is 1300ms:
  tapping "Open" on the app-confirm regains focus BEFORE the app switch,
  and a shorter grace races it and web-navigates on top of the launch.
- window.stop() MUST be called when the app takes over and again on
  pageshow: Safari re-issues the pending scheme navigation on tab resume
  without a user gesture, which pops the "address is invalid" alert at
  users returning FROM the app. Do not remove the cancelPending calls.

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
