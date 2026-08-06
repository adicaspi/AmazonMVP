import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { OpenInAppLink } from "@/components/OpenInAppLink";
import { HeroFade } from "../UggScuffette/HeroFade";
import type { AmazonProductData } from "@/lib/amazon-creators-api";

// CRO bridge page for the New Balance 928v3 walking shoe (/NewBalance928) —
// emotion-first funnel: attention → desire → social proof → benefits →
// transformation → objections → trust → Amazon.
// Comfort/support narrative only — no medical claims, ever.
// ── Product constants ─────────────────────────────────────────────
// User's SiteStripe link (tag=aipicks20-20 + linkId), cleaned of search
// params — DIRECT amazon.com URL only (NEVER amzn.to: breaks app handoff).
const DEFAULT_AMAZON_LINK = "https://www.amazon.com/New-Balance-Womens-928v3-Walking/dp/B01N553EY1?th=1&psc=1&linkCode=ll2&tag=aipicks20-20&linkId=fd074e39d3507e4f26bb208b00185bb2&language=en_US&ref_=as_li_ss_tl";
const PRICE_VALUE = 158;

// Verified on the live listing 2026-07-29 (user screenshot): 4.4★, 3,950
// ratings. The Creators API doesn't return the reviews resource, so these
// verified values are the display source. No invented numbers, ever.
const STAR_RATING: number | null = 4.4;
const REVIEW_COUNT: number | null = 3950;

// [USER ASSET] Real Amazon review quotes (verified via screenshots).
const REVIEW_QUOTES: { text: string; author: string }[] = [];

// Official Amazon CDN images (stable URLs, fetched via the Creators API) —
// the guaranteed fallback when a live API fetch fails, so the gallery NEVER
// degrades to the placeholder again.
const FALLBACK_IMAGES = [
  "https://m.media-amazon.com/images/I/31FScmxvWAL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31SU-Pv0s9L._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/41j3nBiUN2L._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31Y18ea2kXL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/219Me3tKA2L._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31mW+YLDGhL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/4141rhLr-pL._SL1000_.jpg",
];
// Listing price verified 2026-07-29 (user screenshot) — used when the API is down
const FALLBACK_PRICE_ANCHOR = "Around $159.95";

// Round DOWN so the claim is always true: 3,950 → "3,900+"
function roundedCount(n: number): string {
  if (n >= 10000) return `${(Math.floor(n / 1000) * 1000).toLocaleString("en-US")}+`;
  if (n >= 1000) return `${(Math.floor(n / 100) * 100).toLocaleString("en-US")}+`;
  return n.toLocaleString("en-US");
}

// Momentum line + CTA — every button gets a desire-reinforcing lead-in
function CtaBlock({
  href,
  position,
  lead,
  label,
  priceValue,
}: {
  href: string;
  position: string;
  lead: string;
  label: string;
  priceValue: number;
}) {
  return (
    <div className="text-center mt-8">
      <p className="text-sm md:text-base text-gray-600 mb-3">{lead}</p>
      <AmazonButton
        href={href}
        productName="New Balance 928v3"
        priceValue={priceValue}
        position={position}
        className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
      >
        {label}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </AmazonButton>
    </div>
  );
}

export function NBPage({ trackingPage, amazonLink, product }: { trackingPage: string; amazonLink?: string; product?: AmazonProductData | null }) {
  const AMAZON_LINK = amazonLink ?? DEFAULT_AMAZON_LINK;
  const starRating = product?.starRating ?? STAR_RATING;
  const reviewCount = product?.reviewCount
    ? roundedCount(product.reviewCount)
    : REVIEW_COUNT !== null ? roundedCount(REVIEW_COUNT) : null;
  const hasRating = starRating !== null && reviewCount !== null;
  const priceValue = product?.price?.amount || PRICE_VALUE;
  const priceAnchor = product?.price?.displayAmount ? `Around ${product.price.displayAmount}` : FALLBACK_PRICE_ANCHOR;
  const alt = product?.title || "New Balance Women's 928v3 Walking Shoe";
  const liveImages = [product?.primaryImage, ...(product?.variantImages || [])]
    .map((img) => img?.large?.url)
    .filter((u): u is string => !!u)
    .map((u) => ({ url: u.replace("._SL500_.", "._SL1000_."), alt }));
  const apiImages = liveImages.length > 0 ? liveImages : FALLBACK_IMAGES.map((url) => ({ url, alt }));

  return (
    <div className="min-h-screen bg-white">
      <PageViewTracker page={trackingPage} />

      {/* Sticky trust bar */}
      <div className="sticky top-0 z-40 bg-slate-900 text-white text-center py-2 md:py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold md:tracking-wide">
          <span>Prime Shipping · Free Returns · Secure Amazon Checkout</span>
        </div>
      </div>

      {/* 1. HERO — desire above the fold */}
      <section className="bg-white">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 lg:px-10 py-8 md:py-14">
          <div className="grid gap-6 md:gap-10 items-center md:items-stretch md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="order-2 text-center md:text-left md:flex md:flex-col">
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🚶‍♀️ The walking shoe with a devoted following
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-gray-900 mb-4">
                Walk All Day. <span className="text-blue-800">Feel It Nowhere.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-4">
                The New Balance 928v3 is built for one thing: hours on your feet
                without spending a second thinking about your feet.
              </p>

              {hasRating && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-6 h-6 ${i < Math.round(starRating!) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{starRating}/5</span>
                  <span className="text-gray-600">{reviewCount} Amazon ratings</span>
                </div>
              )}

              <div className="max-w-md mx-auto md:mx-0 md:mt-auto">
                {priceAnchor && (
                  <p className="text-center md:text-left text-base text-gray-800 mb-1">
                    <span className="font-bold">{priceAnchor}</span>
                    <span className="text-gray-400">*</span>
                  </p>
                )}
                <p className="text-center md:text-left text-xs text-gray-600 mb-3">✓ Prime Shipping&ensp;✓ Free Returns&ensp;✓ Multiple Widths Available</p>
                <AmazonButton
                  href={AMAZON_LINK}
                  productName="New Balance 928v3"
                  priceValue={priceValue}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-slate-900 text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-2xl shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Check Today&apos;s Amazon Price</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                <p className="text-center md:text-left text-xs text-gray-600 mt-2">Popular sizes and widths sell out — availability varies by color.</p>
                <OpenInAppLink href={AMAZON_LINK} productName="New Balance 928v3" />
                {priceAnchor && (
                  <p className="text-center md:text-left text-[10px] text-gray-400 mt-0.5">*Price varies by color, size &amp; width on Amazon</p>
                )}
              </div>
            </div>

            <div className="order-1 w-full max-w-[520px] md:max-w-none mx-auto">
              <HeroFade apiImages={apiImages} placeholderEmoji="👟" placeholderTitle="New Balance 928v3" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / TRUST — right after the hero */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 mb-6">
            {hasRating ? `${reviewCount} walkers can't all be wrong` : "The quiet favorite of serious walkers"}
          </h2>
          <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto">
            {hasRating ? (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-black text-blue-900">{starRating}★</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Average rating</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-black text-blue-900">{reviewCount}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Amazon ratings</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-black text-blue-900">4</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Width options</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-black text-blue-900">🥾</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Genuine leather build</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-black text-blue-900">📏</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Narrow to extra-wide widths</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-black text-blue-900">↩️</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Free Prime returns</div>
                </div>
              </>
            )}
          </div>
          {REVIEW_QUOTES.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 mt-6 text-left">
              {REVIEW_QUOTES.map((q, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">&quot;{q.text}&quot;</p>
                  <p className="text-xs text-gray-500 mt-2">— {q.author}, Amazon customer</p>
                </div>
              ))}
            </div>
          )}
          <CtaBlock
            href={AMAZON_LINK}
            position="social-proof"
            priceValue={priceValue}
            lead="See what everyday walkers are saying."
            label="Read the Amazon Reviews"
          />
        </div>
      </section>

      {/* 3. LIFESTYLE — sell the feeling */}
      <section className="py-10 md:py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-3">
            Imagine ending the day with energy left over
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            The morning loop around the neighborhood. Errands that turn into five stores.
            A whole day on your feet — and none of it on your mind.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "🌅", title: "Morning Walks", text: "The route you love, with support that lasts every step" },
              { icon: "🛒", title: "Errand Marathons", text: "Five stops, zero complaints from your feet" },
              { icon: "🧍‍♀️", title: "On Your Feet All Day", text: "Standing hours feel shorter in the right shoes" },
              { icon: "✈️", title: "Travel Days", text: "Airports and city tours without counting the miles" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-sm md:text-base font-bold text-gray-900 mb-1">{c.title}</div>
                <div className="text-xs md:text-sm text-gray-600 leading-snug">{c.text}</div>
              </div>
            ))}
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="lifestyle"
            priceValue={priceValue}
            lead="Ready to stop planning your day around your feet?"
            label="See Colors & Widths on Amazon"
          />
        </div>
      </section>

      {/* 4. TRANSFORMATION — before vs after */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Your day, before &amp; after
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <div className="text-sm md:text-base font-bold text-gray-500 mb-3">Before</div>
              <ul className="space-y-2.5">
                {[
                  "Tired feet halfway through the errands",
                  "Flat, flimsy sneakers with zero support",
                  "Cutting walks short",
                  "Shoes that never come in your width",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-500">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-blue-300 rounded-2xl p-4 md:p-6 shadow-md">
              <div className="text-sm md:text-base font-black text-blue-900 mb-3">After</div>
              <ul className="space-y-2.5">
                {[
                  "Steady, cushioned support from step one",
                  "A stable base that keeps you moving",
                  "Longer walks, by choice",
                  "A true fit — narrow to extra-wide",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="transformation"
            priceValue={priceValue}
            lead="Better days start from the ground up."
            label="View Current Availability"
          />
        </div>
      </section>

      {/* 5. WHY CUSTOMERS LOVE THEM — emotional benefits */}
      <section className="py-10 md:py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why walkers swear by the 928
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "🦶", title: "Serious Support", text: "New Balance's ROLLBAR stability system keeps every step steady" },
              { icon: "☁️", title: "Cushioned Comfort", text: "Plush underfoot feel that holds up hour after hour" },
              { icon: "🥾", title: "Real Leather Build", text: "A sturdy upper that supports — and lasts" },
              { icon: "📏", title: "A Fit That's Yours", text: "Four widths on Amazon, from narrow to extra-wide" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-sm md:text-base font-bold text-gray-900 mb-1">{c.title}</div>
                <div className="text-xs md:text-sm text-gray-600 leading-snug">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPARISON — justify the price */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-2">
            Why not just any sneaker?
          </h2>
          <p className="text-center text-gray-600 mb-8">Because fashion sneakers were never built for your miles.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-gray-500 font-semibold"></th>
                  <th className="py-3 px-2 text-blue-900 font-black">NB 928v3</th>
                  <th className="py-3 px-2 text-gray-500 font-semibold">Fashion sneakers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Support", "ROLLBAR stability system", "Flat foam midsole"],
                  ["Comfort", "Built for all-day wear", "Fades by lunchtime"],
                  ["Materials", "Genuine leather upper", "Thin mesh & glue"],
                  ["Fit", "4 widths, narrow to extra-wide", "One width fits some"],
                  ["Longevity", "Made for daily miles", "A season, maybe two"],
                ].map(([row, nb, gen], i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3 font-semibold text-gray-900">{row}</td>
                    <td className="py-3 px-2 text-center text-gray-800 bg-blue-50/60">{nb}</td>
                    <td className="py-3 px-2 text-center text-gray-500">{gen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="comparison"
            priceValue={priceValue}
            lead="Your feet work hard. Give them real equipment."
            label="Check Today's Amazon Price"
          />
        </div>
      </section>

      {/* 7. PERFECT FOR — self-identification */}
      <section className="py-10 md:py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            These are for you if…
          </h2>
          <ul className="space-y-3">
            {[
              "Walking is your daily exercise — and you want to keep it that way",
              "Your job keeps you standing for hours",
              "Regular sneakers never come in your width",
              "You choose comfort and support over trends",
              "You're shopping for a parent who deserves better shoes",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 text-sm md:text-base text-gray-800">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-[13px] font-bold">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. FAQ — remove objections */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Still on the fence?
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is it really worth this price?",
                a: "A genuine leather walking shoe with a real stability system is equipment, not fashion. It's built for daily miles over years — most cheap sneakers give up in months.",
              },
              {
                q: "How do I get the right size and width?",
                a: "The Amazon listing carries four widths from narrow to extra-wide with New Balance's size chart. Unsure between two? Order both — free Prime returns make the exchange cost nothing.",
              },
              {
                q: "Is it good for standing all day?",
                a: "That's exactly what it's designed for — cushioning plus a stable base for long hours on your feet, walking or standing.",
              },
              {
                q: "Why check now?",
                a: "Honestly: Amazon prices change, and specific size-and-width combinations regularly go out of stock. Looking today costs nothing.",
              },
            ].map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 md:p-5">
                <div className="font-bold text-gray-900 mb-1.5">{f.q}</div>
                <div className="text-sm md:text-base text-gray-600 leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="faq"
            priceValue={priceValue}
            lead="Every remaining question is answered in the reviews."
            label="See the Listing on Amazon"
          />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-800 to-slate-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Your next walk decides.
          </h2>
          <p className="text-blue-100 mb-6">
            Check today&apos;s price and find your size and width while they&apos;re in stock.
          </p>
          <AmazonButton
            href={AMAZON_LINK}
            productName="New Balance 928v3"
            priceValue={priceValue}
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white hover:bg-slate-100 text-blue-900 font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Check Today&apos;s Amazon Price
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <div className="flex items-center justify-center gap-4 mt-5 text-blue-100 text-xs">
            <span>✓ Prime Shipping</span>
            <span>✓ Free Returns</span>
            <span>✓ Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <footer className="py-6 bg-slate-900 text-center px-4">
        <p className="text-xs text-slate-400 max-w-2xl mx-auto">
          As an Amazon Associate, we earn from qualifying purchases. Prices and availability are
          subject to change — always verify on Amazon.{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 px-3 py-1.5 md:hidden z-[9999] shadow-[0_-2px_12px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center leading-tight flex-shrink-0">
            {hasRating && <span className="text-xs font-bold text-gray-900">★ {starRating}</span>}
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Amazon · Prime ✓</span>
          </div>
          <AmazonButton
            href={AMAZON_LINK}
            productName="New Balance 928v3"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded-lg shadow-sm active:scale-[0.98] transition-transform whitespace-nowrap"
          >
            <span>Check Today&apos;s Price</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
        </div>
      </div>
      <div className="h-14 md:h-0"></div>
    </div>
  );
}
