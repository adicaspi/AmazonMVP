// Shared Shark FlexStyle bridge page. Rendered by two routes with separate
// tracking: /shark-flexstyle and /sharkflex (per-campaign attribution).
import Link from "next/link";
import { HeroMedia } from "./HeroMedia";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";



const ASIN = "B0B89P16MC";

// [USER ASSET] Real verbatim Amazon review quotes. Paste 3-4 short quotes copied
// word-for-word from Verified Purchase reviews on the Amazon listing:
// { stars: 5, text: "…", name: "First name as shown", date: "March 2026" }
// The section renders the aggregate rating only until these are provided —
// never invent quotes.
const REAL_REVIEWS: { stars: number; text: string; name: string; date?: string }[] = [];

// Comparison uses price *tiers*, not exact competitor prices (those go stale).
const VS_ROWS = [
  { label: "Coanda auto-wrap curls", shark: "✓", dyson: "✓", old: "✗" },
  { label: "Styles with air, less extreme heat", shark: "✓", dyson: "✓", old: "✗" },
  { label: "Dries + styles wet hair", shark: "✓", dyson: "✗", old: "✗" },
  { label: "5 attachments included", shark: "✓", dyson: "Fewer included", old: "✗" },
  { label: "Typical price tier", shark: "$$", dyson: "$$$$ (~3x more)", old: "$$" },
];

const getCachedProduct = unstable_cache(
  async (): Promise<AmazonProductData | null> => {
    try {
      const products = await getProductsByASIN([ASIN]);
      if (products.length > 0) return products[0];
    } catch (err) {
      console.error("Failed to fetch Shark FlexStyle data from Amazon Creators API:", err);
    }
    return null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 }
);

export async function SharkPage({ trackingPage }: { trackingPage: string }) {
  const product = await getCachedProduct();
  // Official Amazon SiteStripe affiliate link (tag=aipicks20-20 credits the commission)
  const amazonLink =
    "https://www.amazon.com/Shark-HD430-Multi-Styler-Concentrator-Attachment/dp/B0B89P16MC?th=1&linkCode=ll2&tag=aipicks20-20&linkId=389748d8d6071f3ffcc339db218dbd9d&language=en_US&ref_=as_li_ss_tl";

  // Price value for pixel events only (no specific price shown on the page)
  const priceAmount = product?.price?.amount || 229;
  const reviewCount = product?.reviewCount || 6500;
  const starRating = product?.starRating || 4.3;

  return (
    <div className="min-h-screen bg-white">
      <PageViewTracker page={trackingPage} />
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="preload" as="image" href="/images/shark-flexstyle/transformation.jpg" />

      {/* Urgency Announcement Bar */}
      <div className="bg-gray-900 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold">
          <span>🔥</span>
          <span>20K+ Bought Last Month on Amazon</span>
          <span>🔥</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-16">
          {/* Mobile hero — headline > proof > CTA; the video peeks right below (curiosity) */}
          <div className="md:hidden mb-3">
            <h2 className="text-[26px] font-black tracking-tight leading-[1.05] text-gray-900 mb-2.5">
              Salon Blowouts <span className="text-amber-600">At Home</span> In Minutes
            </h2>

            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.round(starRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-base font-extrabold text-gray-900">{starRating}/5</span>
              <span className="text-xs text-gray-500">({reviewCount.toLocaleString()}+ Amazon Reviews)</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-900 text-white text-[10px] font-medium px-2 py-0.5 rounded">Amazon&apos;s Choice</span>
              <h1 className="text-[10px] text-gray-400 font-medium">Shark FlexStyle HD430 · 5-in-1 Hair Styler</h1>
            </div>

            <ul className="space-y-0.5 mb-3">
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <strong>Dyson Results. Half the Price.</strong>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <strong>Less Heat Damage</strong>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <strong>5 Styling Attachments Included</strong>
              </li>
            </ul>

            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="hero-mobile-top"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-lg rounded-2xl transition-all shadow-xl active:scale-[0.98]"
            >
              <span>Check Today&apos;s Amazon Price</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>

            <div className="flex items-center justify-center gap-5 mt-2 mb-1 text-xs text-gray-600">
              <span>🚚 Prime</span>
              <span>↩️ Free Returns</span>
              <span>⚡ Ships Today</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Hero visual: auto-playing demo video, then rotates to images (60% width on desktop) */}
            <div className="order-1 md:order-2 md:col-span-7 md:scale-[1.05] max-md:-mx-2">
              <HeroMedia />
            </div>

            {/* Content */}
            <div className="order-2 md:order-1 md:col-span-5">
              {/* Desktop only: badges and headline */}
              <div className="hidden md:block">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
                    <span>🏆</span>
                    #1 Best Seller
                  </div>
                </div>

                <h1 className="text-4xl lg:text-[44px] font-black tracking-tight leading-[1.08] text-gray-900 mb-4">
                  Salon Blowouts <span className="text-amber-600">At Home</span> In Minutes
                </h1>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-6 h-6 ${i < Math.round(starRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{starRating} / 5</span>
                  <span className="text-gray-600">{reviewCount.toLocaleString()}+ Amazon Reviews</span>
                  <span className="bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded">Amazon&apos;s Choice</span>
                </div>

                <p className="text-xl text-gray-600 mb-2 leading-relaxed">
                  Dries + styles in one pass, with far less heat damage. The Dyson alternative — at <strong className="text-gray-900">half the price</strong>.
                </p>

              </div>

              {/* CTA Button */}
              <div className="mb-4">
                <AmazonButton
                  href={amazonLink}
                  productName="Shark FlexStyle"
                  priceValue={priceAmount}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-lg md:text-xl whitespace-nowrap rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Check Today&apos;s Amazon Price</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                {/* Mobile-only quick trust badges */}
                <div className="flex items-center justify-center gap-4 mt-3 md:hidden">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Free Shipping
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> 30-Day Returns
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Prime
                  </span>
                </div>
                <p className="hidden md:block text-center text-xs text-gray-400 mt-2">Takes you to Amazon.com · Free returns for Prime members</p>
              </div>

              {/* Slim trust row - Desktop only */}
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 mt-1">
                <span>🚚 Prime Shipping</span>
                <span>🔄 Free Returns</span>
                <span>⚡ Ships Today</span>
              </div>

              {/* Benefit cards - Desktop only, below the CTA */}
              <div className="hidden md:grid grid-cols-3 gap-3 mt-5">
                {[
                  { icon: "🟢", label: "One-Step Styling" },
                  { icon: "🛡️", label: "Less Heat Damage" },
                  { icon: "✨", label: "5 Attachments Included" },
                ].map((b, i) => (
                  <div key={i} className="bg-white border border-amber-100 rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl mb-1.5">{b.icon}</div>
                    <div className="text-sm font-semibold text-gray-700 leading-tight">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile: 3 benefit cards — below the video (video sells; cards support) */}
          <div className="md:hidden grid grid-cols-3 gap-2 mt-4 mb-1">
            {[
              { icon: "💨", label: "Dries + Styles at Once" },
              { icon: "🛡️", label: "Less Heat Damage" },
              { icon: "🎯", label: "5 Tools in 1" },
            ].map((b, i) => (
              <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-1.5 text-center">
                <div className="text-xl">{b.icon}</div>
                <div className="text-[10px] font-semibold text-gray-700 leading-tight mt-0.5">{b.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Before/After — strongest proof, right after the hero video */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/shark-flexstyle/ugc-before-after.jpeg"
              alt="Salon results at home — before and after with the Shark FlexStyle"
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* UGC proof — minimal, emotional */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-7 md:mb-10">
            <div className="flex justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">Real women. Real results.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/shark-flexstyle/ugc-selfie.jpeg" alt="My hair hasn't looked this good in years — Shark FlexStyle result" loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover rounded-2xl shadow-lg ring-1 ring-black/5" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/shark-flexstyle/ugc-talking.jpeg" alt="Women can't stop talking about the Shark FlexStyle" loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover rounded-2xl shadow-lg ring-1 ring-black/5" />
          </div>
        </div>
      </section>

      {/* Product Video Demo */}
      <section className="py-10 md:py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              What&apos;s in the Box
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Get the Full Kit — 5 Attachments Included
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Auto-wrap curlers, oval brush, paddle brush &amp; concentrator — everything in one box.
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2">
            {[
              { icon: "🌀", label: "2× Auto-Wrap Curlers" },
              { icon: "🪮", label: "Oval Brush" },
              { icon: "🖌️", label: "Paddle Brush" },
              { icon: "💨", label: "Concentrator" },
            ].map((a, i) => (
              <div key={i} className="bg-white border border-amber-100 rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl mb-1">{a.icon}</div>
                <div className="text-xs font-semibold text-gray-700 leading-tight">{a.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Shark vs. The Alternatives */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Shark FlexStyle vs. The Alternatives</h2>
            <p className="text-sm md:text-lg text-gray-600">Same Coanda air technology as the premium option — at a fraction of the price.</p>
          </div>

          {/* Mobile: cards */}
          <div className="md:hidden space-y-3">
            {VS_ROWS.map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500 mb-2 font-medium">{row.label}</div>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <div className="text-[10px] text-amber-700 font-bold mb-0.5">FlexStyle</div>
                    <div className="text-green-600 font-bold text-xs">{row.shark}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500 mb-0.5">Dyson Airwrap</div>
                    <div className="text-gray-600 text-xs">{row.dyson}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500 mb-0.5">Dryer + Curler</div>
                    <div className="text-gray-500 text-xs">{row.old}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-gray-500 font-medium"></th>
                  <th className="px-6 py-4 text-center bg-amber-50">
                    <div className="flex flex-col items-center gap-1">
                      <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">OUR PICK</span>
                      <span className="text-amber-700 font-bold text-lg">Shark FlexStyle</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center"><span className="text-gray-600 font-bold">Dyson Airwrap</span></th>
                  <th className="px-6 py-4 text-center"><span className="text-gray-600 font-bold">Dryer + Curling Iron</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {VS_ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                    <td className="px-6 py-4 text-gray-700 font-medium">{row.label}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600 bg-amber-50/60">{row.shark}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row.dyson}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{row.old}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="vs-competition"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              See Why It&apos;s the Smart Buy
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-10 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">What 6,500+ Buyers Say</h2>
            <p className="text-sm md:text-lg text-gray-600">Real ratings from Amazon — see them all before you decide</p>
          </div>

          {/* Aggregate rating block */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-center md:text-left">
            <div>
              <div className="text-5xl font-black text-gray-900">{starRating}<span className="text-2xl text-gray-400">/5</span></div>
              <div className="flex justify-center md:justify-start mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < Math.round(starRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="text-gray-600">
              <p className="font-semibold text-gray-900">{reviewCount.toLocaleString()}+ ratings on Amazon</p>
              <p className="text-sm">Amazon&apos;s Choice · 20K+ bought in the past month</p>
            </div>
          </div>

          {/* Real verbatim Amazon quotes — populated from REAL_REVIEWS when provided */}
          {REAL_REVIEWS.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
              {REAL_REVIEWS.map((review, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.stars)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">&quot;{review.text}&quot;</p>
                  <p className="text-xs text-gray-500 font-medium">{review.name}{review.date ? ` · ${review.date}` : ""} · <span className="text-green-600">Verified Purchase</span></p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-2 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 mb-6 md:mb-12">
            Everything you need to know about the Shark FlexStyle
          </p>

          <div className="space-y-3 md:space-y-4">
            {[
              {
                q: "What's included in the box?",
                a: "The Shark FlexStyle comes as a complete kit with the styling unit plus multiple attachments — auto-wrap curlers, a paddle brush, an oval brush and a styling concentrator — so you can dry, curl, smooth and volumize right out of the box. (Exact attachments depend on the kit you choose on Amazon.)",
                showMobile: true,
              },
              {
                q: "Does it really cause less damage than a curling iron?",
                a: "Yes. The FlexStyle styles primarily with high-velocity airflow rather than extreme contact heat, which helps reduce the heat damage associated with traditional flat irons and curling wands.",
                showMobile: true,
              },
              {
                q: "Will it work on my hair type?",
                a: "It's designed to work across a wide range of hair types and lengths. Fine, medium and thick hair can all achieve volume, curls and a smooth blowout by choosing the right attachment.",
                showMobile: true,
              },
              {
                q: "How long does it take to style?",
                a: "Because it dries and styles at the same time, most users cut their routine roughly in half compared with using a separate dryer and curler.",
                showMobile: true,
              },
              {
                q: "Can I use it as just a hair dryer?",
                a: "Absolutely. Attach the concentrator and it doubles as a powerful, fast dryer — then switch attachments to style.",
                showMobile: false,
              },
              {
                q: "How is it different from the Dyson Airwrap?",
                a: "Both use the Coanda air effect to wrap and style hair with airflow instead of extreme heat. The FlexStyle also works on wet hair (dry + style in one pass) and costs a fraction of the price; the Airwrap is a premium device with its own strengths. For most people the results are comparable — check the current price and reviews on Amazon and decide what's right for you.",
                showMobile: true,
              },
              {
                q: "Will it work on curly or fine hair?",
                a: "Yes — that's what the interchangeable attachments are for. The diffuser-style airflow and brushes work across curly, coily, fine and thick hair; reviewers with fine hair especially like that it styles without the fried feeling of a hot iron.",
                showMobile: true,
              },
              {
                q: "How loud is it?",
                a: "About the same as a standard hair dryer — noticeable but normal. It's not a quiet device, but no louder than what you already use.",
                showMobile: false,
              },
              {
                q: "Is it heavy to hold?",
                a: "No — it's around 1.5 lbs (roughly 700g), lighter than most dryer-plus-brush combos, and balanced for styling the back of your head.",
                showMobile: false,
              },
              {
                q: "What warranty does it come with?",
                a: "It's covered by Shark's manufacturer warranty when bought from Amazon, on top of Amazon's 30-day return window and A-Z Guarantee.",
                showMobile: false,
              },
              {
                q: "What's the return policy?",
                a: "You're covered by Amazon's standard 30-day return policy. If it's not for you, returns are simple and free for Prime members.",
                showMobile: false,
              },
            ].map((faq, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${!faq.showMobile ? "hidden md:block" : ""}`}>
                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2">{faq.q}</h3>
                <p className="text-sm md:text-base text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-700 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Amazon&apos;s Choice — Thousands Bought Last Month!
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            One Tool. Endless Styles. Get Yours Today!
          </h2>
          <p className="text-xl text-amber-50 mb-4 max-w-2xl mx-auto">
            Join thousands of women getting salon blowouts at home with the Shark FlexStyle.
          </p>

          <AmazonButton
            href={amazonLink}
            productName="Shark FlexStyle"
            priceValue={priceAmount}
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-white text-amber-700 font-bold text-xl rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Check Today&apos;s Amazon Price
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            {["Amazon A-Z Guarantee", "Prime 2-Day Shipping", "30-Day Free Returns"].map((b, i) => (
              <span key={i} className="bg-white/15 backdrop-blur rounded-full px-4 py-2 text-sm font-semibold">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-gray-100 py-6 md:py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Secure Checkout via Amazon</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">Fast Prime Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 pb-8 border-b border-gray-700">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. This helps support our recommendations at no extra cost to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclosure" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>

          <p className="text-xs text-gray-500">
            Results may vary. Shark® and FlexStyle™ are trademarks of SharkNinja Operating LLC, used here for identification only. © 2026 AI Picks. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA amazonLink={amazonLink} priceValue={priceAmount} />
    </div>
  );
}
