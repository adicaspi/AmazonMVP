import type { Metadata } from "next";
import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { HeroFade } from "./HeroFade";

export const metadata: Metadata = {
  title: "Birkenstock Arizona Soft Footbed | The Original Two-Strap Sandal",
  description:
    "The iconic Birkenstock Arizona with the legendary contoured cork footbed that molds to your feet. Comfort that lasts for years — with free Prime shipping and returns.",
  openGraph: {
    title: "Birkenstock Arizona — The Original Since 1774",
    description:
      "The contoured cork footbed molds to your feet over time. One sandal, years of comfort.",
    images: [
      {
        url: "https://www.aipicks.co/images/birkenstock/hero-airport.jpg",
        width: 800,
        height: 1200,
        alt: "Birkenstock Arizona Soft Footbed Sandals",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birkenstock Arizona — The Original Since 1774",
    description: "The contoured cork footbed molds to your feet over time.",
    images: ["https://www.aipicks.co/images/birkenstock/hero-airport.jpg"],
  },
};

// ── Product constants ─────────────────────────────────────────────
const ASIN = "B000K9YUSE";
// Official SiteStripe affiliate link (tag=aipicks20-20 credits the commission)
const AMAZON_LINK = `https://www.amazon.com/Birkenstock-Womens-Arizona-Birko-Flo-Sandals/dp/${ASIN}?th=1&psc=1&linkCode=ll2&tag=aipicks20-20&linkId=755143f5a48c80129aae27bd92b45a5d&language=en_US&ref_=as_li_ss_tl`;
// Pixel value only — no price is shown on the page
const PRICE_VALUE = 117;

// [USER ASSET] Verify on the live listing and fill in — the rating block
// stays hidden until BOTH values are set (no invented numbers, ever):
const STAR_RATING: number | null = 4.5; // verified on listing 2026-07-12
const REVIEW_COUNT: string | null = "13,000+"; // 13,173 on listing 2026-07-12

const TRACKING_PAGE = "/BirkenstockArizona";


const FAQS = [
  {
    q: "Are Birkenstocks really worth the price?",
    a: "The contoured cork-latex footbed is the reason people wear the same pair for 5–10 years. It molds to the shape of your foot over the first weeks, so the sandal ends up custom-fitted to you — something foam slides can't do.",
  },
  {
    q: "What's the difference between Soft Footbed and the classic?",
    a: "This is the Soft Footbed version — it adds an extra layer of foam cushioning on top of the classic anatomical cork core. Same legendary support, but comfortable from the very first wear, with little to no break-in.",
  },
  {
    q: "How do I pick my size?",
    a: "Birkenstock uses EU sizing — the Amazon listing has a size chart and both Regular and Narrow widths. If you're between sizes, most wearers size down. And with free Prime returns, an exchange costs you nothing.",
  },
  {
    q: "What is Birko-Flor?",
    a: "Birkenstock's signature upper material: a skin-friendly, leather-look finish that's durable, easy to wipe clean, and vegan-friendlier than leather — at a lower price than the leather versions.",
  },
];

export default function BirkenstockArizonaPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageViewTracker page={TRACKING_PAGE} />

      {/* Sticky trust bar */}
      <div className="sticky top-0 z-40 bg-stone-900 text-white text-center py-2 md:py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold md:tracking-wide">
          <span>Prime Shipping · Free Returns · Secure Amazon Checkout</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-100 via-white to-amber-100">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 lg:px-10 py-8 md:py-14">
          <div className="grid gap-6 md:gap-12 items-center md:grid-cols-2">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                ✓ Worn Worldwide Since 1774
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-gray-900 mb-4">
                The Sandals You&apos;ll <span className="text-amber-700">Wear For Years</span>
              </h1>

              {STAR_RATING !== null && REVIEW_COUNT !== null && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-6 h-6 ${i < Math.round(STAR_RATING) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{STAR_RATING}/5</span>
                  <span className="text-gray-600">Loved by {REVIEW_COUNT} Amazon Customers</span>
                </div>
              )}

              <ul className="space-y-2 mb-6 inline-block text-left">
                {[
                  "Soft Footbed — extra cushioning, comfortable from day one",
                  "Contoured cork core that shapes itself to YOUR foot",
                  "One pair lasts for years, not one summer",
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-base md:text-lg text-gray-800">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[13px] font-bold">✓</span>
                    <strong>{b}</strong>
                  </li>
                ))}
              </ul>

              <div className="max-w-md mx-auto md:mx-0">
                <p className="text-center md:text-left text-base text-gray-800 mb-1">
                  <span className="font-bold">Typically around $117</span>
                  <span className="text-gray-400">*</span>
                </p>
                <p className="text-center md:text-left text-xs text-gray-600 mb-3">✓ Prime Shipping&ensp;✓ Free Returns&ensp;✓ Secure Amazon Checkout</p>
                <AmazonButton
                  href={AMAZON_LINK}
                  productName="Birkenstock Arizona"
                  priceValue={PRICE_VALUE}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-2xl shadow-amber-900/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>See Today&apos;s Price on Amazon</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                <p className="text-center md:text-left text-xs text-gray-600 mt-2">Popular colors tend to sell out during summer.</p>
                <p className="text-center md:text-left text-[10px] text-gray-400 mt-0.5">*Price may vary on Amazon</p>
              </div>
            </div>

            <div className="order-1 md:order-2 max-w-[260px] md:max-w-[420px] mx-auto w-full">
              <HeroFade />
            </div>
          </div>
        </div>
      </section>

      {/* Why this sandal */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why Millions Choose Birkenstock
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "🦶", title: "Custom Fit Over Time", text: "The cork-latex footbed softens and molds to your unique foot shape" },
              { icon: "🏛️", title: "250 Years of Craft", text: "Made by Birkenstock since 1774 — the original, not a lookalike" },
              { icon: "🔧", title: "Adjustable Straps", text: "Two individually adjustable buckles for a precise fit" },
              { icon: "♻️", title: "Built To Last", text: "Resoleable and repairable — one pair, many summers" },
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
              productName="Birkenstock Arizona"
              priceValue={PRICE_VALUE}
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

      {/* The footbed story + unboxing shot */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 md:grid md:grid-cols-2 md:gap-12 md:items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 mb-6 md:mb-0 max-w-md mx-auto md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/birkenstock/unboxing.jpg" alt="Unboxing a fresh pair of Birkenstock Arizona sandals" loading="lazy" decoding="async" className="w-full h-auto" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
              The secret is under your feet
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3">
              Every Arizona is built on Birkenstock&apos;s legendary <strong>contoured cork-latex footbed</strong> —
              a deep heel cup, real arch support, and a roomy toe box. The Soft Footbed version adds an
              extra cushioning layer, so it feels great from the very first step.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              That&apos;s why people don&apos;t just &quot;own&quot; Birkenstocks — they live in them,
              and refuse to wear anything else all summer.
            </p>
          </div>
        </div>
      </section>

      {/* Birkenstock vs generic sandals */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why not just buy cheap sandals?
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="bg-white border-2 border-amber-300 rounded-2xl p-4 md:p-6 shadow-md">
              <div className="text-sm md:text-base font-black text-amber-800 mb-3">Birkenstock Arizona</div>
              <ul className="space-y-2.5">
                {[
                  "Contoured cork footbed with real arch support",
                  "Molds to the shape of your foot",
                  "Lasts for years — resoleable & repairable",
                  "Gets more comfortable with wear",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-800">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <div className="text-sm md:text-base font-bold text-gray-500 mb-3">Generic Sandals</div>
              <ul className="space-y-2.5">
                {[
                  "Flat foam sole, no support",
                  "Loses shape within weeks",
                  "New pair needed every season",
                  "Comfort fades as the foam flattens",
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

      {/* Lifestyle strip */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            From coffee runs to weekend getaways
          </h2>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {[
              { src: "/images/birkenstock/cafe.jpg", alt: "Sidewalk cafe mornings in Birkenstock Arizona" },
              { src: "/images/birkenstock/market.jpg", alt: "Farmers market strolls in Birkenstock Arizona" },
              { src: "/images/birkenstock/dog-walk-1.jpg", alt: "Everyday dog walks in Birkenstock Arizona" },
              { src: "/images/birkenstock/street-europe.jpg", alt: "City trips in Birkenstock Arizona" },
              { src: "/images/birkenstock/canal.jpg", alt: "Vacation days in Birkenstock Arizona" },
              { src: "/images/birkenstock/airport-3.jpg", alt: "Travel-ready in Birkenstock Arizona" },
            ].map((img, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={i} src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full aspect-[2/3] object-cover rounded-xl md:rounded-2xl shadow-md ring-1 ring-black/5" />
            ))}
          </div>
          <div className="text-center mt-8">
            <AmazonButton
              href={AMAZON_LINK}
              productName="Birkenstock Arizona"
              priceValue={PRICE_VALUE}
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
            Your Feet Will Thank You For Years.
          </h2>
          <p className="text-amber-100 mb-6">Check the current price and available colors on Amazon.</p>
          <AmazonButton
            href={AMAZON_LINK}
            productName="Birkenstock Arizona"
            priceValue={PRICE_VALUE}
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
            <span className="text-xs font-bold text-gray-900">★ 4.5</span>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Amazon · Prime ✓</span>
          </div>
          <AmazonButton
            href={AMAZON_LINK}
            productName="Birkenstock Arizona"
            priceValue={PRICE_VALUE}
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
