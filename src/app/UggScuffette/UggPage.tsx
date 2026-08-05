import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { OpenInAppLink } from "@/components/OpenInAppLink";
import { HeroFade } from "./HeroFade";
import type { AmazonProductData } from "@/lib/amazon-creators-api";

// Shared UGG Scuffette II bridge page — one-to-one clone of the Birkenstock
// page structure. Rendered by /UggScuffette; future channel routes can pass
// their own trackingPage + amazonLink exactly like the Birkenstock family.
// ── Product constants ─────────────────────────────────────────────
// Default affiliate link with the account's main tag (aipicks20-20, as
// returned by the Creators API detailPageURL). [USER ASSET] Swap for the
// campaign-specific SiteStripe link when provided — resolved to a DIRECT
// amazon.com URL (NEVER amzn.to: the redirect hop breaks the Amazon-app
// handoff from in-app browsers).
const DEFAULT_AMAZON_LINK = "https://www.amazon.com/dp/B082HHR652?tag=aipicks20-20&linkCode=ogi&th=1&psc=1";
// Pixel value only — no price is shown on the page
const PRICE_VALUE = 90;

// Verified on the live listing 2026-07-29 (user screenshot): 4.7★, 23,437
// ratings. The Creators API doesn't return the reviews resource, so these
// verified values are the display source; price still comes live from the
// API when available.
const STAR_RATING: number | null = 4.7;
const REVIEW_COUNT: number | null = 23437;
const PRICE_ANCHOR: string | null = "Around $99.95";

// 13,182 → "13,000+" — round down so the claim is always true
function roundedCount(n: number): string {
  if (n >= 1000) return `${(Math.floor(n / 1000) * 1000).toLocaleString("en-US")}+`;
  return n.toLocaleString("en-US");
}

// [USER ASSET] Lifestyle photos pending — fill to show the strip + story image
const STORY_IMAGE: { src: string; alt: string } | null = null;
const LIFESTYLE_IMAGES: { src: string; alt: string }[] = [];

// Official Amazon CDN images (stable URLs, fetched via the Creators API) —
// the guaranteed fallback when a live API fetch fails, so the gallery NEVER
// degrades to the placeholder again.
const FALLBACK_IMAGES = [
  "https://m.media-amazon.com/images/I/31KstO2FSiL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/316onCBt0ML._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31a4zASQ53L._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31Uaka6V-oL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31XSW7iTpzL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31L+PhAyzGL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31nQDJYvXDL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31YxvBnMW7L._SL1000_.jpg",
];

const FAQS = [
  {
    q: "Are UGG slippers really worth the price?",
    a: "You're paying for genuine UGG materials — a soft suede upper and a plush wool lining — instead of the synthetic fleece in lookalike slippers. That's why a pair keeps its shape and coziness season after season instead of flattening out in a month.",
  },
  {
    q: "Can I wear them outside?",
    a: "Yes — the Scuffette II has a real outsole, so quick trips to the porch, the mailbox or the car are no problem. They're house slippers first, though — not rain boots.",
  },
  {
    q: "How do I pick my size?",
    a: "The Amazon listing has UGG's official size chart. If you're unsure between two sizes, order both — with free Prime returns the exchange costs you nothing.",
  },
  {
    q: "How do I keep the suede looking new?",
    a: "Spot-clean with a soft brush or a suede-specific cleaner and let them air-dry — never machine wash. A quick brush now and then keeps the nap fresh for years.",
  },
];

export function UggPage({ trackingPage, amazonLink, product }: { trackingPage: string; amazonLink?: string; product?: AmazonProductData | null }) {
  const AMAZON_LINK = amazonLink ?? DEFAULT_AMAZON_LINK;
  // Live listing data from the Creators API, with manual fallbacks
  const starRating = product?.starRating ?? STAR_RATING;
  const reviewCount = product?.reviewCount ? roundedCount(product.reviewCount) : REVIEW_COUNT !== null ? roundedCount(REVIEW_COUNT) : null;
  const priceValue = product?.price?.amount || PRICE_VALUE;
  const priceAnchor = product?.price?.displayAmount ? `Around ${product.price.displayAmount}` : PRICE_ANCHOR;
  // All official Amazon images: primary + variants. _SL500_ → _SL1000_ for
  // retina sharpness (Amazon's CDN resizes on the fly).
  const alt = product?.title || "UGG Scuffette II Slipper";
  const liveImages = [product?.primaryImage, ...(product?.variantImages || [])]
    .map((img) => img?.large?.url)
    .filter((u): u is string => !!u)
    .map((u) => ({ url: u.replace("._SL500_.", "._SL1000_."), alt }));
  const apiImages = liveImages.length > 0 ? liveImages : FALLBACK_IMAGES.map((url) => ({ url, alt }));
  // Story + lifestyle slots run on the official Amazon images until real
  // lifestyle photos replace them (studio shots render uncropped on white)
  const storyImage = STORY_IMAGE ?? (apiImages[1] ? { src: apiImages[1].url, alt } : null);
  const usingApiLifestyle = LIFESTYLE_IMAGES.length === 0;
  const lifestyleImages = usingApiLifestyle
    ? apiImages.slice(2, 8).map((i) => ({ src: i.url, alt: i.alt }))
    : LIFESTYLE_IMAGES;
  return (
    <div className="min-h-screen bg-white">
      <PageViewTracker page={trackingPage} />

      {/* Sticky trust bar */}
      <div className="sticky top-0 z-40 bg-stone-900 text-white text-center py-2 md:py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold md:tracking-wide">
          <span>Prime Shipping · Free Returns · Secure Amazon Checkout</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 lg:px-10 py-8 md:py-14">
          <div className="grid gap-6 md:gap-10 items-center md:items-start md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="order-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                ✓ The Original UGG — Loved Worldwide
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-gray-900 mb-4">
                The Slippers You&apos;ll <span className="text-amber-700">Never Want To Take Off</span>
              </h1>

              {starRating !== null && reviewCount !== null && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-6 h-6 ${i < Math.round(starRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{starRating}/5</span>
                  <span className="text-gray-600">Loved by {reviewCount} Amazon Customers</span>
                </div>
              )}

              <ul className="space-y-2 mb-6 inline-block text-left">
                {[
                  "Plush wool lining — cozy from the second you slip in",
                  "Genuine soft suede upper with the iconic UGG look",
                  "Real outsole — made for the couch AND quick trips outside",
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-base md:text-lg text-gray-800">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[13px] font-bold">✓</span>
                    <strong>{b}</strong>
                  </li>
                ))}
              </ul>

              <div className="max-w-md mx-auto md:mx-0">
                {priceAnchor !== null && (
                  <p className="text-center md:text-left text-base text-gray-800 mb-1">
                    <span className="font-bold">{priceAnchor}</span>
                    <span className="text-gray-400">*</span>
                  </p>
                )}
                <p className="text-center md:text-left text-xs text-gray-600 mb-3">✓ Prime Shipping&ensp;✓ Free Returns&ensp;✓ Secure Amazon Checkout</p>
                <AmazonButton
                  href={AMAZON_LINK}
                  productName="UGG Scuffette II"
                  priceValue={priceValue}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-2xl shadow-amber-900/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>See Today&apos;s Price on Amazon</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                <p className="text-center md:text-left text-xs text-gray-600 mt-2">Popular colors tend to sell out as the weather cools.</p>
                <OpenInAppLink href={AMAZON_LINK} productName="UGG Scuffette II" />
                {priceAnchor !== null && (
                  <p className="text-center md:text-left text-[10px] text-gray-400 mt-0.5">*Price varies by color &amp; size on Amazon</p>
                )}
              </div>
            </div>

            <div className="order-1 w-full max-w-[520px] md:max-w-none mx-auto">
              <HeroFade apiImages={apiImages} />
            </div>
          </div>
        </div>
      </section>

      {/* Why this slipper */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why Millions Choose UGG
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "🐑", title: "Plush Wool Lining", text: "Soft, breathable wool keeps feet warm without overheating" },
              { icon: "🏷️", title: "The Real UGG", text: "Made by UGG — the original, not a lookalike" },
              { icon: "🏠", title: "In & Outdoor Sole", text: "A real outsole that handles the porch and the driveway" },
              { icon: "✨", title: "The Iconic Look", text: "The slip-on classic that goes with everything, every season" },
            ].map((c, i) => (
              <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-sm md:text-base font-bold text-gray-900 mb-1">{c.title}</div>
                <div className="text-xs md:text-sm text-gray-600 leading-snug">{c.text}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <AmazonButton
              href={AMAZON_LINK}
              productName="UGG Scuffette II"
              priceValue={priceValue}
              position="benefits"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              See Price on Amazon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* The lining story + photo */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className={`max-w-5xl mx-auto px-4 ${storyImage ? "md:grid md:grid-cols-2 md:gap-12 md:items-center" : ""}`}>
          {storyImage && (
            <div className={`mb-6 md:mb-0 max-w-md mx-auto md:max-w-none ${STORY_IMAGE ? "rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={storyImage.src} alt={storyImage.alt} loading="lazy" decoding="async" className="w-full h-auto" />
            </div>
          )}
          <div className={storyImage ? "text-center md:text-left" : "text-center max-w-2xl mx-auto"}>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
              The secret is in the lining
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3">
              Every Scuffette II is lined with UGG&apos;s signature <strong>plush wool</strong> — the same
              cozy comfort the brand is famous for. Wool breathes, so your feet stay warm on cold
              mornings without getting sweaty by noon.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              That&apos;s why people don&apos;t just &quot;own&quot; UGG slippers — they live in them,
              from the first coffee of the morning to the last episode of the night.
            </p>
          </div>
        </div>
      </section>

      {/* UGG vs generic slippers */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why not just buy cheap slippers?
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="bg-white border-2 border-amber-300 rounded-2xl p-4 md:p-6 shadow-md">
              <div className="text-sm md:text-base font-black text-amber-800 mb-3">UGG Scuffette II</div>
              <ul className="space-y-2.5">
                {[
                  "Genuine suede upper + plush wool lining",
                  "Breathable — warm without the sweat",
                  "Real outsole for indoors and out",
                  "Keeps its shape season after season",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <div className="text-sm md:text-base font-bold text-gray-500 mb-3">Generic Slippers</div>
              <ul className="space-y-2.5">
                {[
                  "Synthetic fleece that traps sweat",
                  "Flattens out within weeks",
                  "Soft sole — indoors only",
                  "New pair needed every winter",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-500">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle strip — [USER ASSET] appears once photos are added above */}
      {lifestyleImages.length > 0 && (
        <section className="py-10 md:py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
              {usingApiLifestyle ? "The Scuffette II, from every angle" : "From slow mornings to cozy nights in"}
            </h2>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {lifestyleImages.map((img, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={i} src={img.src} alt={img.alt} loading="lazy" decoding="async" className={`w-full ${usingApiLifestyle ? "aspect-[4/3] object-contain bg-white" : "aspect-[2/3] object-cover rounded-xl md:rounded-2xl shadow-md ring-1 ring-black/5"}`} />
              ))}
            </div>
            <div className="text-center mt-8">
              <AmazonButton
                href={AMAZON_LINK}
                productName="UGG Scuffette II"
                priceValue={priceValue}
                position="lifestyle"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                See Price on Amazon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </AmazonButton>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Quick answers
          </h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div key={i} className="border border-stone-200 rounded-xl p-4 md:p-5">
                <div className="font-bold text-gray-900 mb-1.5">{f.q}</div>
                <div className="text-sm md:text-base text-gray-600 leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Your Coziest Season Starts Now.
          </h2>
          <p className="text-amber-100 mb-6">Check the current price and available colors on Amazon.</p>
          <AmazonButton
            href={AMAZON_LINK}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white hover:bg-stone-100 text-amber-800 font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Check Today&apos;s Amazon Price
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <div className="flex items-center justify-center gap-4 mt-5 text-amber-100 text-xs">
            <span>✓ Prime Shipping</span>
            <span>✓ Free Returns</span>
            <span>✓ Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <footer className="py-6 bg-stone-900 text-center px-4">
        <p className="text-xs text-stone-400 max-w-2xl mx-auto">
          As an Amazon Associate, we earn from qualifying purchases. Prices and availability are
          subject to change — always verify on Amazon.{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 px-3 py-1.5 md:hidden z-[9999] shadow-[0_-2px_12px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center leading-tight flex-shrink-0">
            {starRating !== null && <span className="text-xs font-bold text-gray-900">★ {starRating}</span>}
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Amazon · Prime ✓</span>
          </div>
          <AmazonButton
            href={AMAZON_LINK}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-sm active:scale-[0.98] transition-transform whitespace-nowrap"
          >
            <span>See Price on Amazon</span>
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
