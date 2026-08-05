# AmazonMVP — project notes

## CRITICAL INVARIANTS — do not break these

### 1. Amazon app deep-linking (conversion-critical!)
`components/AmazonButton.tsx` gets every mobile click into the Amazon APP —
users land logged-in with 1-click buy. THE conversion driver. Mechanics:
- iOS Safari/Chrome (non-in-app): UNIVERSAL LINKS. Amazon's AASA at
  /.well-known/apple-app-site-association DOES include `/dp/??????????`
  and `/*/dp/...` product paths (verified 2026-08 — an older session
  wrongly concluded it excludes them; only `ref=nodl_*` paths are
  excluded). A plain SAME-TAB anchor tap on a direct /dp/ URL silently
  opens the app when installed (our page stays put!), or just loads
  amazon.com when not — no scheme, so the "address is invalid" alert can
  NEVER appear. Requirements: real anchor tap (no preventDefault, no JS
  location), same-tab (target=_blank kills the handoff), direct
  amazon.com URL (amzn.to redirect hop kills it too).
  Per-device caveat: if a user once chose "open in browser" for amazon
  links, iOS remembers and skips the app — re-enable by long-pressing a
  link → Open in "Amazon". OpenInAppLink (scheme, opt-in) is the manual
  backup for such users.
- Meta in-app browsers (isMetaInApp — FB/IG/Messenger, the ad traffic):
  universal links don't escape webviews, so the
  `com.amazon.mobile.shopping.web://` scheme runs there (no Safari alert
  exists in webviews). Fallback rules for the scheme path:
  - ONLY visibilitychange/pagehide mean "app opened"; `blur` = a system
    dialog is up — PAUSE until focus returns (1300ms grace: focus returns
    BEFORE the app switch after tapping "Open").
  - Fallback never navigates our tab — the "Continue to Amazon" sheet's
    tap (fresh gesture) does.
  - window.stop() on app-takeover and on pageshow, or Safari replays the
    pending scheme navigation gesture-less and pops the alert on return.
- Android: `intent://` with browser_fallback_url (silent fallback).
- Desktop: target=_blank.
- Every Amazon CTA on every page MUST use `AmazonButton` — never raw <a>.
- Tracking fetches use `keepalive: true` so they survive navigation.

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
