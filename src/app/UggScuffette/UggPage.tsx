import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { OpenInAppLink } from "@/components/OpenInAppLink";
import { SizeFinder, SizeProvider, HeroSizeCta } from "./SizeFinder";
import type { AmazonProductData } from "@/lib/amazon-creators-api";

// UGG Scuffette II bridge page — editorial redesign (2026-08, owner brief):
// a premium lifestyle-magazine product recommendation, not an ecommerce
// landing page. Serif headlines, warm off-white ground, thin rules,
// destination-honest CTAs ("Check Price on Amazon →"). All original
// functionality is preserved: AmazonButton on every CTA (same pixel/CAPI
// AmazonClick + position tracking), PageViewTracker, OpenInAppLink,
// live API price/images with verified fallbacks. No comparison-vs-other-
// shoes section by owner request.
// ── Product constants ─────────────────────────────────────────────
// Owner's Facebook-campaign SiteStripe link (tag=ugg-fb-20, 2026-08-30) —
// DIRECT amazon.com URL only (NEVER amzn.to: the redirect hop breaks the
// Amazon-app handoff from in-app browsers).
const DEFAULT_AMAZON_LINK = "https://www.amazon.com/dp/B082HHR652?th=1&gaOptInStatus=true&psc=1&linkCode=ll2&tag=ugg-fb-20&linkId=b2a48f525f67b1985d255f4b1cba5b82&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
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

// Campaign creative supplied by the owner (2026-08) — stylized BRAND/campaign
// visuals in the chestnut palette. Per the truthful-marketing invariant they
// are used as editorial ambiance and never captioned as real-customer photos.
const IMG = {
  hero: { src: "/images/ugg/hero-studio.jpg", alt: "UGG Scuffette II slippers in chestnut suede with a sheepskin collar" },
  unboxing: { src: "/images/ugg/unboxing.jpg", alt: "A pair of chestnut UGG Scuffette II slippers being lifted out of the box" },
  entryway: { src: "/images/ugg/entryway.jpg", alt: "Slipping into UGG Scuffette II slippers on the entryway bench at home" },
  furDetail: { src: "/images/ugg/fur-detail.jpg", alt: "Close-up of the plush sheepskin collar of the UGG Scuffette II" },
  mirror: { src: "/images/ugg/mirror.jpg", alt: "Loungewear outfit finished with chestnut UGG Scuffette II slippers" },
  kitchen: { src: "/images/ugg/kitchen.jpg", alt: "Relaxed morning at home in UGG Scuffette II slippers" },
  evening: { src: "/images/ugg/evening.jpg", alt: "Cozy evening on the couch in UGG Scuffette II slippers" },
} as const;

// Official Amazon CDN images (stable URLs, fetched via the Creators API) —
// the guaranteed fallback when a live API fetch fails.
const FALLBACK_IMAGES = [
  "https://m.media-amazon.com/images/I/31KstO2FSiL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/316onCBt0ML._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/31a4zASQ53L._SL1000_.jpg",
];

// Small editorial arrow for text links
function Arrow() {
  return <span aria-hidden>→</span>;
}

export function UggPage({ trackingPage, amazonLink, product }: { trackingPage: string; amazonLink?: string; product?: AmazonProductData | null }) {
  const AMAZON_LINK = amazonLink ?? DEFAULT_AMAZON_LINK;
  // Live listing data from the Creators API, with verified manual fallbacks
  const starRating = product?.starRating ?? STAR_RATING;
  const reviewCount = product?.reviewCount ? roundedCount(product.reviewCount) : REVIEW_COUNT !== null ? roundedCount(REVIEW_COUNT) : null;
  const priceValue = product?.price?.amount || PRICE_VALUE;
  const priceAnchor = product?.price?.displayAmount ? `Around ${product.price.displayAmount}` : PRICE_ANCHOR;
  const alt = product?.title || "UGG Scuffette II Slipper";
  const liveImages = [product?.primaryImage, ...(product?.variantImages || [])]
    .map((img) => img?.large?.url)
    .filter((u): u is string => !!u)
    .map((u) => u.replace("._SL500_.", "._SL1000_."));
  const productShot = liveImages[0] ?? FALLBACK_IMAGES[0];

  return (
    <SizeProvider>
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900">
      <PageViewTracker page={trackingPage} />

      {/* Masthead — quiet editorial strip, not an ecommerce banner */}
      <div className="border-b border-stone-200 bg-[#FBF9F6]">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <span className="text-xs tracking-[0.22em] uppercase font-semibold text-stone-900">AiPicks</span>
          <span className="text-[11px] tracking-[0.18em] uppercase text-stone-500">Style &amp; Comfort</span>
        </div>
      </div>

      {/* 1. EDITORIAL HERO */}
      <section>
        <div className="max-w-3xl mx-auto px-5 pt-10 md:pt-16 pb-8">
          <p className="text-xs tracking-[0.22em] uppercase font-semibold text-amber-800 mb-4">Editor&apos;s Pick</p>
          <h1 className="font-serif text-[2.4rem] leading-[1.1] md:text-6xl md:leading-[1.06] tracking-tight mb-5">
            The UGG Slippers We Keep Coming Back To
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-4">
            UGG&apos;s Scuffette II combines the plush sheepskin comfort the brand is known
            for with an easy slip-on design made for everyday wear.
          </p>
          <p className="text-xs text-stone-400 mb-8">
            A product recommendation from AiPicks. If you buy through our links, we may earn a
            commission from Amazon — it never affects the price you pay.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.hero.src} alt={IMG.hero.alt} decoding="async" fetchPriority="high" className="w-full aspect-[4/5] md:aspect-[4/3] object-cover mb-6" />

          {/* Product identification + primary CTA */}
          <div className="border-t border-b border-stone-200 py-6">
            <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-1">UGG</p>
            <p className="font-serif text-2xl md:text-3xl mb-1">Women&apos;s Scuffette II Slipper</p>
            <p className="text-stone-500 mb-3">Chestnut</p>
            {starRating !== null && reviewCount !== null && (
              <p className="text-sm text-stone-600 mb-1">
                <span className="text-amber-700" aria-hidden>★★★★★</span>{" "}
                <strong className="text-stone-900">{starRating} out of 5</strong> · {reviewCount} Amazon ratings
              </p>
            )}
            {priceAnchor !== null && (
              <p className="text-sm text-stone-500 mb-5">{priceAnchor} — price varies by color &amp; size on Amazon.</p>
            )}
            {/* Size pills + size-aware CTA — shares state with the
                mid-page Find-your-size section via SizeProvider */}
            <HeroSizeCta amazonLink={AMAZON_LINK} priceValue={priceValue} />
            <OpenInAppLink href={AMAZON_LINK} productName="UGG Scuffette II" />
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL INTRODUCTION */}
      <section>
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-5">Why These UGG Slippers Stand Out</h2>
          <p className="text-stone-700 text-lg leading-relaxed mb-4">
            There&apos;s a short list of products that keep earning a place in our
            recommendations, and the Scuffette II sits near the top of it. It&apos;s the
            answer we give when someone asks for one genuinely comforting thing to add
            to their time at home.
          </p>
          <p className="text-stone-700 text-lg leading-relaxed mb-8">
            The appeal is simple. A soft suede upper. That unmistakable plush UGG
            lining. And an open-back design you can step into without a thought — no
            laces, no fuss, just the feeling of being home.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.unboxing.src} alt={IMG.unboxing.alt} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
        </div>
      </section>

      {/* 3. QUICK VERDICT */}
      <section>
        <div className="max-w-3xl mx-auto px-5 pb-10 md:pb-14">
          <div className="border border-stone-300 bg-white p-6 md:p-10">
            <p className="text-xs tracking-[0.22em] uppercase font-semibold text-amber-800 mb-6">Our Take</p>
            <div className="space-y-5 mb-7">
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-1">Best for</p>
                <p className="text-stone-800 text-lg">Everyday comfort at home</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-1">What we like</p>
                <ul className="text-stone-800 text-lg space-y-1">
                  <li>Plush sheepskin feel</li>
                  <li>Easy slip-on design</li>
                  <li>Classic UGG aesthetic</li>
                  <li>Premium suede construction</li>
                </ul>
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-stone-500 font-semibold mb-1">Worth knowing</p>
                <p className="text-stone-800 text-lg">
                  The plush lining can make them feel snug at first — it settles in with
                  wear. If you&apos;re between sizes, UGG&apos;s size chart is on the listing.
                </p>
              </div>
            </div>
            <AmazonButton
              href={AMAZON_LINK}
              productName="UGG Scuffette II"
              priceValue={priceValue}
              position="verdict"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-700 text-white font-semibold transition-colors"
            >
              <span>Check Price on Amazon</span>
              <Arrow />
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* 4. MADE FOR THE MOMENT YOU GET HOME */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.entryway.src} alt={IMG.entryway.alt} loading="lazy" decoding="async" className="w-full aspect-[4/5] md:aspect-[4/3] object-cover mb-7" />
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-5">Made for the Moment You Get Home</h2>
          <p className="text-stone-700 text-lg leading-relaxed mb-4">
            You&apos;ve been out all day. You come home, set down your bag, take off your
            shoes — and this is the part the Scuffette II was designed for.
          </p>
          <p className="text-stone-700 text-lg leading-relaxed">
            The lining is warm the second you step in, and the open back means
            they&apos;re on before you&apos;ve thought about it. It&apos;s a small upgrade that
            changes the feel of every evening — the difference between being back and
            being home.
          </p>
        </div>
      </section>

      {/* 5. WHY WE LIKE THEM — numbered editorial list */}
      <section>
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">Why We Like Them</h2>
          <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
            {[
              {
                n: "01",
                t: "Plush Comfort",
                d: "The collar and lining are the reason people fall for this slipper — soft, warm and cushioned in a way thin fleece never quite manages.",
              },
              {
                n: "02",
                t: "Effortless Slip-On Design",
                d: "The open-back construction is what makes them an around-the-house habit: on in a second, off at the door, no bending down.",
              },
              {
                n: "03",
                t: "Classic UGG Look",
                d: "The chestnut suede and understated shape are instantly recognizable without shouting — they go with whatever you're already wearing at home.",
              },
              {
                n: "04",
                t: "Premium Feel",
                d: "Real suede and a proper outsole set it apart from a disposable house slipper — this is the kind you keep, not the kind you replace every winter.",
              },
            ].map((item) => (
              <div key={item.n} className="py-6 md:py-7 md:grid md:grid-cols-[64px_1fr] md:gap-6">
                <p className="font-serif text-2xl text-amber-800 mb-2 md:mb-0">{item.n}</p>
                <div>
                  <h3 className="font-semibold text-xl mb-1.5">{item.t}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5 mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.furDetail.src} alt={IMG.furDetail.alt} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.mirror.src} alt={IMG.mirror.alt} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      {/* 6. FIND YOUR SIZE — qualification before Amazon */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
          <SizeFinder amazonLink={AMAZON_LINK} priceValue={priceValue} />
        </div>
      </section>

      {/* 7. SOCIAL PROOF — verified numbers only, no invented quotes */}
      <section>
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-5">What Amazon Customers Think</h2>
          {starRating !== null && reviewCount !== null ? (
            <>
              <p className="font-serif text-5xl md:text-6xl mb-2">
                {starRating}<span className="text-2xl text-stone-400"> / 5</span>
              </p>
              <p className="text-stone-600 text-lg mb-6">
                From {reviewCount} ratings on the Amazon listing.
              </p>
            </>
          ) : (
            <p className="text-stone-600 text-lg mb-6">See the current rating on the Amazon listing.</p>
          )}
          <p className="text-stone-700 text-lg leading-relaxed mb-6">
            We don&apos;t cherry-pick quotes here — the verified reviews on the listing are
            a better read than anything we could excerpt.
          </p>
          <AmazonButton
            href={AMAZON_LINK}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="reviews"
            className="inline-flex items-center gap-2 text-stone-900 font-semibold underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
          >
            <span>Read the reviews on Amazon</span>
            <Arrow />
          </AmazonButton>
        </div>
      </section>

      {/* 8. WHO WE'D RECOMMEND THEM FOR */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14 md:grid md:grid-cols-2 md:gap-10 md:items-center">
          <div className="mb-7 md:mb-0">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-5">Who We&apos;d Recommend Them For</h2>
            <ul className="space-y-3 text-stone-700 text-lg">
              {[
                "You prioritize comfort the moment you're home",
                "You appreciate premium, natural materials",
                "You already love the classic UGG aesthetic",
                "You want something you can slip on without thinking",
                "You'd rather own one classic pair than chase trends",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-800 mt-1" aria-hidden>—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.kitchen.src} alt={IMG.kitchen.alt} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover" />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section>
        <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.evening.src} alt={IMG.evening.alt} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover mb-8" />
          <div className="text-center">
            <p className="text-xs tracking-[0.22em] uppercase font-semibold text-stone-500 mb-3">UGG Scuffette II</p>
            <p className="font-serif text-2xl md:text-3xl leading-snug mb-7 max-w-2xl mx-auto">
              If you&apos;re looking for a classic, genuinely cozy house slipper with that
              unmistakable UGG feel, the Scuffette II is an easy one to recommend.
            </p>
            <AmazonButton
              href={AMAZON_LINK}
              productName="UGG Scuffette II"
              priceValue={priceValue}
              position="final-cta"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-stone-900 hover:bg-stone-700 text-white font-semibold text-lg transition-colors"
            >
              <span>Check Price &amp; Sizes on Amazon</span>
              <Arrow />
            </AmazonButton>
            <p className="text-sm text-stone-500 mt-3">See current availability, colors and pricing on Amazon.</p>
            <div className="mt-8 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productShot} alt={alt} loading="lazy" decoding="async" className="w-32 h-32 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <footer className="py-8 border-t border-stone-200 text-center px-5 bg-[#FBF9F6]">
        <p className="text-xs text-stone-500 max-w-2xl mx-auto leading-relaxed">
          As an Amazon Associate, we earn from qualifying purchases. Prices and availability are
          subject to change — always verify on Amazon.{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </footer>

      {/* Sticky mobile CTA — quiet editorial bar, same tracking as before */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FBF9F6]/95 backdrop-blur border-t border-stone-200 px-3 py-1.5 md:hidden z-[9999]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center leading-tight flex-shrink-0">
            {starRating !== null && <span className="text-xs font-bold text-stone-900">★ {starRating}</span>}
            <span className="text-[10px] text-stone-500 whitespace-nowrap">Amazon · Prime ✓</span>
          </div>
          <AmazonButton
            href={AMAZON_LINK}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-stone-900 hover:bg-stone-700 text-white font-semibold text-sm active:scale-[0.99] transition-transform whitespace-nowrap"
          >
            <span>Check Price on Amazon</span>
            <span aria-hidden>→</span>
          </AmazonButton>
        </div>
      </div>
      <div className="h-14 md:h-0"></div>
    </div>
    </SizeProvider>
  );
}
