import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { OpenInAppLink } from "@/components/OpenInAppLink";
import { HeroFade } from "../UggScuffette/HeroFade";
import { VideoCard } from "@/components/VideoCard";
import type { AmazonProductData } from "@/lib/amazon-creators-api";

// CRO bridge page for GrandeLASH-MD (/GrandeLash) — emotion-first funnel:
// attention → desire → proof (real before/after) → benefits →
// transformation → objections → trust → Amazon.
// Claims follow the listing's own wording ("longer, thicker,
// fuller-LOOKING lashes") — no medical/growth claims.
// ── Product constants ─────────────────────────────────────────────
// Owner's SiteStripe link for the 2mL listing (ASIN B00325D0WK,
// tag=aipicks20-20) — DIRECT amazon.com URL only (NEVER amzn.to: breaks
// the app handoff).
const DEFAULT_AMAZON_LINK = "https://www.amazon.com/dp/B00325D0WK?th=1&gaOptInStatus=true&linkCode=ll2&tag=aipicks20-20&linkId=f11f661ad5589b651536169a1d06f16a&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const PRICE_VALUE = 68;

// Verified on the live listing 2026-08-06 (user screenshot): 4.2★, 59,511
// ratings, #1 Best Seller in Eyelash Primers. No invented numbers, ever.
const STAR_RATING: number | null = 4.2;
const REVIEW_COUNT: number | null = 59511;

// Official Amazon CDN images (stable URLs via the Creators API) — the
// guaranteed fallback when a live API fetch fails.
const FALLBACK_IMAGES = [
  "https://m.media-amazon.com/images/I/41Rx7r18xFL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/518A6SDWd9L._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/41Ob8oijywL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/51VaIjFAJDL._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/51c2l+ps63L._SL1000_.jpg",
  "https://m.media-amazon.com/images/I/41GGmw92bxL._SL1000_.jpg",
];
const FALLBACK_PRICE_ANCHOR = "Around $68.00";

// Campaign creative supplied by the owner (2026-08) — stylized BRAND
// visuals. Per the truthful-marketing invariant they are captioned as
// brand imagery, never as real-customer photos; the "Real women" video
// section keeps real customer media only.
const BEFORE_AFTER_IMAGE = { src: "/images/grandelash/before-after-lashes.jpg", alt: "Sparse lashes compared with fuller-looking lashes — GrandeLASH-MD brand visual" };
const STORY_IMAGE = { src: "/images/grandelash/mirror-routine.jpg", alt: "Applying GrandeLASH-MD along the upper lash line in the nightly routine" };
const LIFESTYLE_IMAGES = [
  { src: "/images/grandelash/grand1.jpeg", alt: "GrandeLASH-MD serum" },
  { src: "/images/grandelash/grand2.jpeg", alt: "Applying GrandeLASH-MD like eyeliner" },
  { src: "/images/grandelash/grand3.jpeg", alt: "GrandeLASH-MD results" },
  { src: "/images/grandelash/real-lash-growth.jpg", alt: "Fuller-looking lashes with GrandeLASH-MD" },
  { src: "/images/grandelash/promo-solution.jpeg", alt: "GrandeLASH-MD Lash Enhancing Serum" },
  { src: "/images/grandelash/selfie-serum.jpg", alt: "Holding the GrandeLASH-MD serum tube" },
  { src: "/images/grandelash/eye-closeup-poster.jpg", alt: "GrandeLASH-MD brand visual with a lash close-up" },
  { src: "/images/grandelash/half-face-compare.jpg", alt: "Half-face lash comparison — GrandeLASH-MD brand visual" },
  { src: "/images/grandelash/selfie-duo.jpg", alt: "Two-panel brand visual with the GrandeLASH-MD serum tube" },
  { src: "/images/grandelash/mirror-selfie.jpg", alt: "Mirror selfie brand visual holding GrandeLASH-MD" },
];

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
        productName="GrandeLASH-MD Serum"
        priceValue={priceValue}
        position={position}
        className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
      >
        {label}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </AmazonButton>
    </div>
  );
}

export function GLPage({ trackingPage, amazonLink, product }: { trackingPage: string; amazonLink?: string; product?: AmazonProductData | null }) {
  const AMAZON_LINK = amazonLink ?? DEFAULT_AMAZON_LINK;
  const starRating = product?.starRating ?? STAR_RATING;
  const reviewCount = product?.reviewCount
    ? roundedCount(product.reviewCount)
    : REVIEW_COUNT !== null ? roundedCount(REVIEW_COUNT) : null;
  const hasRating = starRating !== null && reviewCount !== null;
  const priceValue = product?.price?.amount || PRICE_VALUE;
  const priceAnchor = product?.price?.displayAmount ? `Around ${product.price.displayAmount}` : FALLBACK_PRICE_ANCHOR;
  const alt = product?.title || "GrandeLASH-MD Lash Enhancing Serum";
  const liveImages = [product?.primaryImage, ...(product?.variantImages || [])]
    .map((img) => img?.large?.url)
    .filter((u): u is string => !!u)
    .map((u) => ({ url: u.replace("._SL500_.", "._SL1000_."), alt }));
  // The old hand-saved 1500px set showed the 4mL Jumbo box; the 2mL
  // listing (B00325D0WK) is displayed from the live API images (500px)
  // with the static list above as the guaranteed fallback.
  const apiImages = liveImages.length > 0 ? liveImages : FALLBACK_IMAGES.map((url) => ({ url, alt }));

  return (
    <div className="min-h-screen bg-white">
      <PageViewTracker page={trackingPage} />

      {/* Sticky trust bar */}
      <div className="sticky top-0 z-40 bg-stone-900 text-white text-center py-2 md:py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold md:tracking-wide">
          <span>Prime Shipping · Free Returns · Secure Amazon Checkout</span>
        </div>
      </div>

      {/* 1. HERO — desire above the fold */}
      <section className="bg-white">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 lg:px-10 py-8 md:py-14">
          <div className="grid gap-6 md:gap-10 items-center md:items-stretch md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="order-2 text-center md:text-left md:flex md:flex-col">
              <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🏆 #1 Best Seller on Amazon — Eyelash Primers
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-gray-900 mb-4">
                The Lash Look <span className="text-rose-600">Mascara Can&apos;t Give You</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-4">
                One swipe a night of GrandeLASH-MD&apos;s peptide &amp; vitamin serum — for
                longer, thicker, fuller-looking lashes that are all yours.
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
                    <span className="text-sm text-gray-600"> — a 3-month supply</span>
                  </p>
                )}
                <p className="text-center md:text-left text-xs text-gray-600 mb-3">✓ Prime Shipping&ensp;✓ Free Returns&ensp;✓ Ophthalmologist Tested&ensp;✓ Cruelty-Free</p>
                <AmazonButton
                  href={AMAZON_LINK}
                  productName="GrandeLASH-MD Serum"
                  priceValue={priceValue}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-2xl shadow-rose-900/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Check Today&apos;s Amazon Price</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                <p className="text-center md:text-left text-xs text-gray-600 mt-2">Amazon prices and coupons change — today&apos;s deal may not last.</p>
                {priceAnchor && (
                  <p className="text-center md:text-left text-[10px] text-gray-400 mt-0.5">*Price varies by size on Amazon</p>
                )}
                <OpenInAppLink href={AMAZON_LINK} productName="GrandeLASH-MD Serum" />
              </div>
            </div>

            <div className="order-1 w-full max-w-[520px] md:max-w-none mx-auto">
              <HeroFade
                apiImages={apiImages}
                videos={[
                  { src: "https://res.cloudinary.com/dzkgopplv/video/upload/v1770125538/WhatsApp_Video_2026-02-03_at_09.47.39_y4luwi.mp4", poster: "https://res.cloudinary.com/dzkgopplv/image/upload/v1770125476/WhatsApp_Image_2026-02-03_at_09.47.22_qin8v4.jpg" },
                  { src: "https://res.cloudinary.com/dzkgopplv/video/upload/v1770125528/WhatsApp_Video_2026-02-01_at_18.10.00_ayx8jr.mp4", poster: "https://res.cloudinary.com/dzkgopplv/image/upload/v1770125473/WhatsApp_Image_2026-02-03_at_09.49.37_sian5m.jpg" },
                ]}
                placeholderEmoji="👁️"
                placeholderTitle="GrandeLASH-MD"
                frameAspect="square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 mb-6">
            {reviewCount} lash routines can&apos;t all be wrong
          </h2>
          <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-black text-rose-700">{starRating}★</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">Average rating</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-black text-rose-700">{reviewCount}</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">Amazon ratings</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-black text-rose-700">#1</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">Best Seller — Eyelash Primers</div>
            </div>
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="social-proof"
            priceValue={priceValue}
            lead="See what tens of thousands of verified buyers are saying."
            label="Read the Amazon Reviews"
          />
        </div>
      </section>

      {/* 3. BEFORE / AFTER — the proof section */}
      <section className="py-10 md:py-14 bg-rose-50/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-3">
            See the difference for yourself
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Brand results with consistent nightly use. Individual results vary — that&apos;s
            what free returns are for.
          </p>
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl overflow-hidden shadow-lg ring-2 ring-rose-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BEFORE_AFTER_IMAGE.src} alt={BEFORE_AFTER_IMAGE.alt} loading="lazy" decoding="async" className="w-full h-auto" />
            </div>
            <div className="mt-2 text-sm">
              <span className="font-bold text-gray-500">Before (top)</span>
              <span className="text-gray-400"> · </span>
              <span className="font-black text-rose-600">After (bottom)</span>
            </div>
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="before-after"
            priceValue={priceValue}
            lead="Your before photo starts tonight."
            label="View Current Availability"
          />
        </div>
      </section>

      {/* 3.5 VIDEO REVIEWS — carried over from the original page */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-3">
            Real women. Real results. No filters.
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Watch 20-second transformations from real customers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-sm md:max-w-2xl mx-auto">
            <VideoCard
              src="https://res.cloudinary.com/dzkgopplv/video/upload/v1770125538/WhatsApp_Video_2026-02-03_at_09.47.39_y4luwi.mp4"
              poster="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125476/WhatsApp_Image_2026-02-03_at_09.47.22_qin8v4.jpg"
              title="Real Customer Review"
              sub="Amazing results in 8 weeks!"
            />
            <VideoCard
              src="https://res.cloudinary.com/dzkgopplv/video/upload/v1770125528/WhatsApp_Video_2026-02-01_at_18.10.00_ayx8jr.mp4"
              poster="https://res.cloudinary.com/dzkgopplv/image/upload/v1770125473/WhatsApp_Image_2026-02-03_at_09.49.37_sian5m.jpg"
              title="Before &amp; After"
              sub="See the transformation!"
            />
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="video-reviews"
            priceValue={priceValue}
            lead="Ready to start your own transformation?"
            label="Check Today's Amazon Price"
          />
        </div>
      </section>

      {/* 4. THE ROUTINE — sell the simplicity */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:grid md:grid-cols-2 md:gap-12 md:items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 mb-6 md:mb-0 max-w-md mx-auto md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={STORY_IMAGE.src} alt={STORY_IMAGE.alt} loading="lazy" decoding="async" className="w-full h-auto" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
              One swipe. That&apos;s the whole routine.
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3">
              Apply like eyeliner along the upper lash line once a night. The
              <strong> peptide &amp; vitamin-infused formula</strong> does the rest while
              you sleep — no falsies, no extensions appointment, no glue.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              One 2mL bottle is a <strong>3-month supply</strong> — about the cost of a
              single lash-extension refill, lasting a whole season.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY CUSTOMERS LOVE IT */}
      <section className="py-10 md:py-14 bg-rose-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why it has a cult following
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "👁️", title: "Ophthalmologist Tested", text: "Formulated and tested for use near the eyes" },
              { icon: "🐰", title: "Cruelty-Free", text: "Never tested on animals" },
              { icon: "⏱️", title: "Seconds a Day", text: "One swipe at night — easier than removing mascara" },
              { icon: "💄", title: "Your Own Lashes", text: "The fuller look without falsies or extensions" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-rose-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-sm md:text-base font-bold text-gray-900 mb-1">{c.title}</div>
                <div className="text-xs md:text-sm text-gray-600 leading-snug">{c.text}</div>
              </div>
            ))}
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="benefits"
            priceValue={priceValue}
            lead="Ready to retire the falsies?"
            label="Check Today's Amazon Price"
          />
        </div>
      </section>

      {/* 6. LIFESTYLE STRIP — carried over from the original page */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
            {LIFESTYLE_IMAGES.map((img, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={i} src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full aspect-square object-cover rounded-xl md:rounded-2xl shadow-md ring-1 ring-black/5" />
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPARISON — justify the price */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-2">
            Serum vs. the alternatives
          </h2>
          <p className="text-center text-gray-600 mb-8">Three months of serum costs less than one month of extensions.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-rose-100">
                  <th className="text-left py-3 text-gray-500 font-semibold"></th>
                  <th className="py-3 px-2 text-rose-700 font-black">GrandeLASH-MD</th>
                  <th className="py-3 px-2 text-gray-500 font-semibold">Extensions / falsies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cost over 3 months", "One bottle", "Refills every 2–3 weeks"],
                  ["Daily effort", "One swipe at night", "Glue, removal, touch-ups"],
                  ["Your real lashes", "Enhanced look", "Often damaged underneath"],
                  ["Sleep, swim, shower", "No restrictions", "Careful… always"],
                  ["Rating", `${starRating}★ · ${reviewCount} ratings`, "—"],
                ].map(([row, gl, alt2], i) => (
                  <tr key={i} className="border-b border-rose-50">
                    <td className="py-3 font-semibold text-gray-900">{row}</td>
                    <td className="py-3 px-2 text-center text-gray-800 bg-rose-50/60">{gl}</td>
                    <td className="py-3 px-2 text-center text-gray-500">{alt2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="comparison"
            priceValue={priceValue}
            lead="Do the math your lashes deserve."
            label="See the Listing on Amazon"
          />
        </div>
      </section>

      {/* 8. FAQ — remove objections */}
      <section className="py-10 md:py-14 bg-rose-50/50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Still on the fence?
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I use it?",
                a: "Once a night, swipe the applicator along your upper lash line like liquid eyeliner — on clean, dry skin. That's it. Consistency is what makes the difference.",
              },
              {
                q: "Is it safe for my eyes?",
                a: "The formula is ophthalmologist tested and cruelty-free. As with any eye-area product, check the ingredient list if you have sensitivities, and stop if irritation occurs.",
              },
              {
                q: "Is it worth $68?",
                a: "The 2mL bottle is a 3-month supply — around 75 cents a day, less than a single set of lash extensions that lasts three weeks. And Amazon coupons frequently knock the price down further.",
              },
              {
                q: "What if it doesn't work for me?",
                a: "Results vary from person to person — that's exactly what Amazon's free returns are for. Check the current return window on the listing.",
              },
            ].map((f, i) => (
              <div key={i} className="border border-rose-100 bg-white rounded-xl p-4 md:p-5">
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
            label="Read Thousands of Amazon Reviews"
          />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-rose-600 to-rose-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Three months from now, you&apos;ll wish you started tonight.
          </h2>
          <p className="text-rose-100 mb-6">
            {starRating}★ from {reviewCount} Amazon customers. Check today&apos;s price and any active coupon.
          </p>
          <AmazonButton
            href={AMAZON_LINK}
            productName="GrandeLASH-MD Serum"
            priceValue={priceValue}
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white hover:bg-rose-50 text-rose-700 font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Check Today&apos;s Amazon Price
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <div className="flex items-center justify-center gap-4 mt-5 text-rose-100 text-xs">
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
            {hasRating && <span className="text-xs font-bold text-gray-900">★ {starRating}</span>}
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Amazon · Prime ✓</span>
          </div>
          <AmazonButton
            href={AMAZON_LINK}
            productName="GrandeLASH-MD Serum"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg shadow-sm active:scale-[0.98] transition-transform whitespace-nowrap"
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
