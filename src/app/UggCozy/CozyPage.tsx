import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { HeroFade } from "../UggScuffette/HeroFade";
import type { AmazonProductData } from "@/lib/amazon-creators-api";

// CRO-optimized UGG Scuffette II bridge page (/UggCozy) — emotion-first,
// lifestyle-driven, purchase-intent funnel: attention → desire → social
// proof → benefits → transformation → objections → trust → Amazon.
// Same infrastructure as /UggScuffette (Creators API data, AmazonButton
// app deep-linking, tracking); different narrative + campaign binding.
// ── Product constants ─────────────────────────────────────────────
// [USER ASSET] Swap for the campaign-specific SiteStripe link when provided —
// DIRECT amazon.com URL only (NEVER amzn.to: breaks Amazon-app handoff).
const DEFAULT_AMAZON_LINK = "https://www.amazon.com/dp/B082HHR652?tag=aipicks20-20&linkCode=ogi&th=1&psc=1";
const PRICE_VALUE = 90;

// Verified on the live listing 2026-07-29 (user screenshot): 4.7★, 23,437
// ratings, "50+ bought in past month". No invented numbers, ever.
const STAR_RATING = 4.7;
const REVIEW_COUNT = 23437;

// [USER ASSET] Real Amazon review quotes (with screenshots to verify) go
// here — the quotes row stays hidden until then. Shape: { text, author }.
const REVIEW_QUOTES: { text: string; author: string }[] = [];

function roundedCount(n: number): string {
  if (n >= 1000) return `${(Math.floor(n / 1000) * 1000).toLocaleString("en-US")}+`;
  return n.toLocaleString("en-US");
}

// Momentum line + CTA — every button gets a desire-reinforcing lead-in
function CtaBlock({
  href,
  position,
  lead,
  label,
  priceValue,
  variant = "solid",
}: {
  href: string;
  position: string;
  lead: string;
  label: string;
  priceValue: number;
  variant?: "solid" | "light";
}) {
  return (
    <div className="text-center mt-8">
      <p className="text-sm md:text-base text-gray-600 mb-3">{lead}</p>
      <AmazonButton
        href={href}
        productName="UGG Scuffette II"
        priceValue={priceValue}
        position={position}
        className={
          variant === "solid"
            ? "inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            : "inline-flex items-center justify-center gap-2 px-10 py-4 bg-white hover:bg-stone-100 text-amber-800 font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
        }
      >
        {label}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </AmazonButton>
    </div>
  );
}

export function CozyPage({ trackingPage, amazonLink, product }: { trackingPage: string; amazonLink?: string; product?: AmazonProductData | null }) {
  const AMAZON_LINK = amazonLink ?? DEFAULT_AMAZON_LINK;
  const starRating = product?.starRating ?? STAR_RATING;
  const reviewCount = roundedCount(product?.reviewCount ?? REVIEW_COUNT);
  const priceValue = product?.price?.amount || PRICE_VALUE;
  const priceAnchor = product?.price?.displayAmount ? `Around ${product.price.displayAmount}` : null;
  const alt = product?.title || "UGG Scuffette II Slipper";
  const apiImages = [product?.primaryImage, ...(product?.variantImages || [])]
    .map((img) => img?.large?.url)
    .filter((u): u is string => !!u)
    .map((u) => ({ url: u.replace("._SL500_.", "._SL1000_."), alt }));

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
      <section className="bg-gradient-to-br from-amber-50 via-white to-stone-100">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 lg:px-10 py-8 md:py-14">
          <div className="grid gap-6 md:gap-12 items-center md:grid-cols-2">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🧡 The slippers women keep coming back for
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-gray-900 mb-4">
                The Cozy Upgrade Your Feet <span className="text-amber-700">Have Been Waiting For</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-4">
                Slip in once — and you&apos;ll get why so many women refuse to wear anything else at home.
              </p>

              {/* Rating right in the hero — instant social proof */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-6 h-6 ${i < Math.round(starRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">{starRating}/5</span>
                <span className="text-gray-600">{reviewCount} Amazon ratings</span>
              </div>

              <div className="max-w-md mx-auto md:mx-0">
                {priceAnchor && (
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
                  <span>Check Today&apos;s Amazon Price</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                <p className="text-center md:text-left text-xs text-gray-600 mt-2">Popular colors often sell out as the weather cools.</p>
                {priceAnchor && (
                  <p className="text-center md:text-left text-[10px] text-gray-400 mt-0.5">*Price varies by color &amp; size on Amazon</p>
                )}
              </div>
            </div>

            <div className="order-1 md:order-2 max-w-[260px] md:max-w-[420px] mx-auto w-full">
              <HeroFade apiImages={apiImages} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF — right after the hero */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 mb-6">
            {reviewCount} women can&apos;t all be wrong
          </h2>
          <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-black text-amber-800">{starRating}★</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">Average rating</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-black text-amber-800">{reviewCount}</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">Amazon ratings</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-black text-amber-800">5</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1">Color options</div>
            </div>
          </div>
          {REVIEW_QUOTES.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 mt-6 text-left">
              {REVIEW_QUOTES.map((q, i) => (
                <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
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
            lead="See what thousands of verified buyers are saying."
            label="Read the Amazon Reviews"
          />
        </div>
      </section>

      {/* 3. LIFESTYLE — sell the feeling */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-3">
            Imagine your coldest morning — warm
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            First coffee on the couch. Working from home on a freezing floor. That exhale
            when you finally get back and kick off your shoes. This is what the Scuffette II is for.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "☕", title: "Slow Mornings", text: "Coffee tastes better when your feet are warm" },
              { icon: "💻", title: "Work From Home", text: "Cold floors stop being part of your workday" },
              { icon: "🛋️", title: "Evenings Off", text: "The moment you slip them on, the day is over" },
              { icon: "🎁", title: "The Gift That Wins", text: "The cozy classic everyone hopes to unwrap" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-sm">
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
            lead="Ready to make cold floors someone else's problem?"
            label="See Available Colors on Amazon"
          />
        </div>
      </section>

      {/* 4. TRANSFORMATION — before vs after */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Life before &amp; after UGG
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <div className="text-sm md:text-base font-bold text-gray-500 mb-3">Before</div>
              <ul className="space-y-2.5">
                {[
                  "Cold feet from October to March",
                  "Cheap slippers that flatten in weeks",
                  "A new disposable pair every winter",
                  "“Comfort” that never really feels good",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-500">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-2xl p-4 md:p-6 shadow-md">
              <div className="text-sm md:text-base font-black text-amber-800 mb-3">After</div>
              <ul className="space-y-2.5">
                {[
                  "Warm from the very first step",
                  "Plush wool that keeps its shape",
                  "One quality pair, season after season",
                  "The little luxury you feel every day",
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
            lead="The upgrade takes about two clicks."
            label="View Current Availability"
          />
        </div>
      </section>

      {/* 5. WHY CUSTOMERS LOVE THEM — emotional benefits */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            Why customers love them
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: "☁️", title: "Soft From Day One", text: "No breaking in — plush comfort from the first wear" },
              { icon: "🔥", title: "Warm, Never Sweaty", text: "Real wool breathes — cozy without overheating" },
              { icon: "✨", title: "Actually Stylish", text: "Cute enough for the door, the porch, the coffee run" },
              { icon: "💪", title: "Built To Last", text: "Genuine suede and a real outsole for daily wear" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-sm">
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
            Why pay more than $15 slippers?
          </h2>
          <p className="text-center text-gray-600 mb-8">Because you keep buying the $15 ones every year.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 text-gray-500 font-semibold"></th>
                  <th className="py-3 px-2 text-amber-800 font-black">UGG Scuffette II</th>
                  <th className="py-3 px-2 text-gray-500 font-semibold">Generic slippers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Warmth", "Real wool lining", "Thin synthetic fleece"],
                  ["Comfort", "Cushioned, holds its shape", "Flattens within weeks"],
                  ["Materials", "Genuine suede", "Plastic-feel fabric"],
                  ["Durability", "Season after season", "Replaced every winter"],
                  ["Style", "The iconic UGG look", "Stays hidden at home"],
                  ["Rating", `${starRating}★ · ${reviewCount} ratings`, "—"],
                ].map(([row, ugg, gen], i) => (
                  <tr key={i} className="border-b border-stone-100">
                    <td className="py-3 font-semibold text-gray-900">{row}</td>
                    <td className="py-3 px-2 text-center text-gray-800 bg-amber-50/60">{ugg}</td>
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
            lead="One good pair beats five disposable ones."
            label="Check Today's Amazon Price"
          />
        </div>
      </section>

      {/* 7. PERFECT FOR — self-identification */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 text-center mb-8">
            These are for you if…
          </h2>
          <ul className="space-y-3">
            {[
              "You work from home and the floor is always freezing",
              "You love slow, cozy mornings",
              "You'd rather buy one great pair than replace cheap ones",
              "You want a gift that will actually get used every day",
              "You believe comfort at home should feel a little luxurious",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 bg-white border border-stone-200 rounded-xl p-4 text-sm md:text-base text-gray-800">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[13px] font-bold">✓</span>
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
                q: "Are they really worth the price?",
                a: "Genuine suede and real wool cost more than synthetic fleece — and last years longer. One pair of UGGs typically outlives several cheap pairs, and feels better every single day in between.",
              },
              {
                q: "What if the size isn't right?",
                a: "Free Prime returns mean an exchange costs you nothing. Order two sizes if you're unsure and send one back.",
              },
              {
                q: "Can I wear them outside?",
                a: "Yes — there's a real outsole, so the porch, the mailbox and the driveway are all fair game.",
              },
              {
                q: "Why buy now?",
                a: "Honestly: Amazon prices change, and popular colors regularly sell out as the cold season picks up. Checking today costs nothing.",
              },
            ].map((f, i) => (
              <div key={i} className="border border-stone-200 rounded-xl p-4 md:p-5">
                <div className="font-bold text-gray-900 mb-1.5">{f.q}</div>
                <div className="text-sm md:text-base text-gray-600 leading-relaxed">{f.a}</div>
              </div>
            ))}
          </div>
          <CtaBlock
            href={AMAZON_LINK}
            position="faq"
            priceValue={priceValue}
            lead="Every question left is answered by the reviews."
            label="See the Listing on Amazon"
          />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Your feet already know.
          </h2>
          <p className="text-amber-100 mb-6">
            {starRating}★ from {reviewCount} Amazon customers. Check today&apos;s price and grab your color while it&apos;s in stock.
          </p>
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
            <span className="text-xs font-bold text-gray-900">★ {starRating}</span>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Amazon · Prime ✓</span>
          </div>
          <AmazonButton
            href={AMAZON_LINK}
            productName="UGG Scuffette II"
            priceValue={priceValue}
            position="sticky-mobile"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-sm active:scale-[0.98] transition-transform whitespace-nowrap"
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
