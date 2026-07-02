import type { Metadata } from "next";
import Link from "next/link";
import { HeroMedia } from "./HeroMedia";
import { AmazonButton } from "@/components/AmazonButton";
import { PageViewTracker } from "@/components/PageViewTracker";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { SocialProofPopup } from "./SocialProofPopup";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { MiniLoop } from "./MiniLoop";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Shark FlexStyle™ Air Styling & Drying System | Salon Blowout at Home",
  description:
    "Dry, curl, smooth & volumize with one tool. The Shark FlexStyle 5-in-1 Air Styling & Drying System (HD430) gives you a salon blowout at home with less heat damage. Thousands of 5-star reviews, free Prime shipping.",
  openGraph: {
    title: "Shark FlexStyle™ — A Salon Blowout at Home in Half the Time",
    description:
      "One tool. Endless styles. Dry. Curl. Smooth. Volumize. The Shark FlexStyle replaces your dryer, curler & straightener — with less heat damage.",
    images: [
      {
        url: "/images/shark-flexstyle/salon-blowout.jpg",
        width: 1200,
        height: 1200,
        alt: "Shark FlexStyle Salon Blowout at Home",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shark FlexStyle™ — A Salon Blowout at Home",
    description:
      "Dry. Curl. Smooth. Volumize. One tool, endless styles, less heat damage.",
    images: ["/images/shark-flexstyle/salon-blowout.jpg"],
  },
};

const ASIN = "B0B89P16MC";

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

export default async function SharkFlexStylePage() {
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
      <PageViewTracker page="/shark-flexstyle" />

      {/* Urgency Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold">
          <span>🔥</span>
          <span>BEST SELLER: Thousands Bought This Month!</span>
          <span>🔥</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-16">
          {/* Mobile hero — headline > media > proof > CTA, all above the fold */}
          <div className="md:hidden mb-4">
            <h2 className="text-[26px] font-black tracking-tight leading-[1.05] text-gray-900 mb-2.5">
              Salon Blowouts <span className="text-amber-600">At Home</span> In Minutes
            </h2>

            {/* GIF-style loop: instant, silent, shows the result immediately (message match with the ad) */}
            <MiniLoop
              src="/videos/shark-flexstyle/hero-loop.mp4"
              className="w-full h-40 object-cover rounded-xl shadow-md mb-2.5"
            />

            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.round(starRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">{starRating}</span>
              <span className="text-sm text-gray-500">({reviewCount.toLocaleString()}+ reviews)</span>
              <span className="bg-gray-900 text-white text-[10px] font-medium px-2 py-0.5 rounded ml-auto">Amazon&apos;s Choice</span>
            </div>
            <h1 className="text-[11px] text-gray-400 font-medium mb-2">Shark FlexStyle HD430 · 5-in-1 Hair Styler</h1>

            <ul className="space-y-0.5 mb-3">
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <strong>Dyson Results. Half the Price.</strong>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-800">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <strong>Less Heat Damage</strong>
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

          {/* Mobile: 3 benefit cards — after the CTA, before the video */}
          <div className="md:hidden grid grid-cols-3 gap-2 mb-4">
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

          <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Hero visual: auto-playing demo video, then rotates to images (60% width on desktop) */}
            <div className="order-1 md:order-2 md:col-span-7">
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
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gradient-to-r from-amber-100 via-stone-50 to-amber-100 py-4 md:py-8 border-y border-amber-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">⭐</span>
              <div className="text-lg md:text-3xl font-bold text-amber-600">6,500+</div>
              <div className="text-xs md:text-sm text-gray-600">Amazon Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">🏆</span>
              <div className="text-lg md:text-3xl font-bold text-amber-600">#1</div>
              <div className="text-xs md:text-sm text-gray-600">Best Seller</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">💨</span>
              <div className="text-lg md:text-3xl font-bold text-amber-600">5-in-1</div>
              <div className="text-xs md:text-sm text-gray-600">Styling System</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">🛡️</span>
              <div className="text-lg md:text-3xl font-bold text-amber-600">Less</div>
              <div className="text-xs md:text-sm text-gray-600">Heat Damage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For / Not For — decision simplicity */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-6 md:mb-10">
            Is the Shark FlexStyle Right for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 md:p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">✅ Perfect if you…</h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Want salon volume &amp; curls at home</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Are tired of juggling a dryer, curler &amp; flat iron</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Worry about heat damage to your hair</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Want to blow-dry AND style in one go</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🤔 Maybe skip it if you…</h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">–</span> Only ever air-dry your hair</li>
                <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">–</span> Have a very short pixie cut</li>
                <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">–</span> Just want the cheapest basic dryer</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="who-its-for"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Check If It&apos;s Right for You
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Why Women Are Switching - Comparison Table */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Why Women Are Switching
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              One tool replaces your whole styling drawer — see the difference
            </p>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Tools Needed", good: "1 Tool, 5 Attachments", bad: "3–4 Separate Tools" },
              { label: "Styling Time", good: "Half the Time", bad: "30–45 min" },
              { label: "Heat Damage", good: "Styled with Air", bad: "High & Repeated" },
              { label: "Styles", good: "Dry · Curl · Smooth · Volume", bad: "Limited per Tool" },
              { label: "Salon Look at Home", good: "Every Time", bad: "Hard to Get Right" },
            ].map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500 mb-2 font-medium">{row.label}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Shark FlexStyle</div>
                    <div className="text-green-600 font-bold text-sm">{row.good}</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Old Routine</div>
                    <div className="text-red-500 font-bold text-sm">{row.bad}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-gray-500 font-medium"></th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-amber-600 font-bold text-lg">Shark FlexStyle</span>
                      <span className="text-green-500 text-sm">✓ Recommended</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-gray-600 font-bold text-lg">The Old Routine</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">Tools Needed</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">1 Tool, 5 Attachments</td>
                  <td className="px-6 py-4 text-center text-red-500">3–4 Separate Tools</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 font-medium">Time to Style</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Half the Time</td>
                  <td className="px-6 py-4 text-center text-red-500">30–45 Minutes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">Heat Damage</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Styled with Air</td>
                  <td className="px-6 py-4 text-center text-red-500">High &amp; Repeated</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 font-medium">Styles Possible</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Dry · Curl · Smooth · Volumize</td>
                  <td className="px-6 py-4 text-center text-red-500">Limited per Tool</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">Salon Results at Home</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Every Single Time</td>
                  <td className="px-6 py-4 text-center text-red-500">Hard to Get Right</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="comparison-table"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              See Why Thousands of Women Switched
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-10 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              From Frizzy to Salon-Smooth in 10 Minutes
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Smooth, voluminous, salon-worthy hair — without the appointment. See the difference for yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="max-w-xs sm:max-w-sm mx-auto w-full">
              <BeforeAfterSlider
                before="/images/shark-flexstyle/ba-before.jpg"
                after="/images/shark-flexstyle/ba-after.jpg"
                beforeAlt="Frizzy hair before using the Shark FlexStyle"
                afterAlt="Smooth salon blowout after using the Shark FlexStyle"
              />
              <p className="text-center text-xs text-gray-500 mt-2">👆 Drag the slider to see the transformation</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 md:p-6 rounded-r-xl">
                <h3 className="font-bold text-base md:text-xl text-gray-900 mb-2">The Old Routine</h3>
                <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>Juggling a dryer, curler &amp; flat iron</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>Repeated extreme heat damages hair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>30–45 minutes for one style</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 md:p-6 rounded-r-xl">
                <h3 className="font-bold text-base md:text-xl text-gray-900 mb-2">The Shark FlexStyle</h3>
                <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Dries &amp; styles simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Less heat damage — styled with air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Multiple styles with one tool, at home</span>
                  </li>
                </ul>
              </div>

              <AmazonButton
                href={amazonLink}
                productName="Shark FlexStyle"
                priceValue={priceAmount}
                position="benefits-card"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 md:px-8 md:py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                See It in Action on Amazon
              </AmazonButton>
            </div>
          </div>
        </div>
      </section>

      {/* The Honest Pros & Cons — Wirecutter-style trust */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">The Honest Pros &amp; Cons</h2>
            <p className="text-sm md:text-lg text-gray-600">What real reviewers love — and the few trade-offs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 md:p-6">
              <h3 className="font-bold text-lg text-green-700 mb-3">👍 Pros</h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Dry, curl, smooth &amp; volumize with one tool</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Far less heat damage — styles with airflow</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Auto-wrap curls that actually hold all day</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Lightweight &amp; doubles as a fast, powerful dryer</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6">
              <h3 className="font-bold text-lg text-amber-700 mb-3">👎 Cons</h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">–</span> A premium price vs. a basic dryer</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">–</span> Slight learning curve on the first few uses</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">–</span> The full attachment set needs some storage space</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="pros-cons"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              See Full Details on Amazon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Salon Hair in 3 Steps
            </h2>
            <p className="text-sm md:text-lg text-gray-600">No technique required — the airflow does the styling for you.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-6 text-lg md:text-2xl font-bold">1</div>
              <h3 className="font-bold text-sm md:text-xl mb-1 md:mb-3">Pick Your Attachment</h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">Snap on the auto-wrap curler, brush, or concentrator for the look you want.</p>
              <p className="text-xs text-gray-600 md:hidden">Curl, smooth or dry</p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-6 text-lg md:text-2xl font-bold">2</div>
              <h3 className="font-bold text-sm md:text-xl mb-1 md:mb-3">Let the Air Work</h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">Powerful airflow dries and shapes damp hair in a single pass.</p>
              <p className="text-xs text-gray-600 md:hidden">One pass</p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-6 text-lg md:text-2xl font-bold">3</div>
              <h3 className="font-bold text-sm md:text-xl mb-1 md:mb-3">Enjoy the Blowout</h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">Smooth, voluminous, salon-worthy hair — no appointment needed.</p>
              <p className="text-xs text-gray-600 md:hidden">Salon look</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Video Demo */}
      <section className="py-10 md:py-24 bg-gradient-to-br from-stone-50 to-amber-50">
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

          <div className="max-w-xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/shark-flexstyle/why-switching.jpg"
              alt="Shark FlexStyle full kit with all 5 attachments vs the old routine"
              className="w-full h-auto"
            />
          </div>

          <div className="text-center mt-8 md:mt-10">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="video-demo"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              See All 5 Attachments on Amazon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-10 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-2 md:mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 md:w-8 md:h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Rated 4.3/5 by 6,500+ Amazon Buyers
            </h2>
            <p className="text-sm md:text-lg text-gray-600">Don&apos;t just take our word for it</p>
          </div>

          {/* Reviews */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { name: "Sarah M.", text: "I cancelled my standing blowout appointment. This gives me the exact same bouncy volume at home in 10 minutes. Worth every penny.", rating: 5 },
              { name: "Jessica L.", text: "My hair is fine and damages easily. The FlexStyle dries it smooth without the fried feeling I got from my old curling iron. Obsessed!", rating: 5 },
              { name: "Michelle R.", text: "Replaced my dryer, round brush AND curler with this one tool. The auto-wrap curls actually hold all day. Wish I bought it sooner.", rating: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md flex-shrink-0 w-[85vw] md:w-auto snap-center">
                <div className="flex gap-0.5 mb-2 md:mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-stone-100 text-amber-600 rounded-full flex items-center justify-center font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-green-600 font-medium">✓ Verified Amazon Purchase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400 md:hidden">
            <span>← Swipe to read more reviews →</span>
          </div>

          <div className="text-center mt-6 md:mt-10">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="reviews-section"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Read 6,500+ Amazon Reviews
            </AmazonButton>
          </div>
        </div>
      </section>

      {/* Trust Bar Before FAQ */}
      <section className="py-6 md:py-8 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Prime Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">30-Day Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl md:text-3xl">💨</span>
              <span className="text-xs md:text-sm font-semibold text-gray-800">5-in-1 System</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl md:text-3xl">🛡️</span>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Less Heat Damage</span>
            </div>
          </div>
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

          <div className="text-center mt-10">
            <AmazonButton
              href={amazonLink}
              productName="Shark FlexStyle"
              priceValue={priceAmount}
              position="faq-section"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Check Availability on Amazon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AmazonButton>
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
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-3xl font-bold">🔥 Special Deal Today</span>
            <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full">
              Amazon&apos;s Choice
            </span>
          </div>
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
          <p className="text-amber-100 text-sm mt-4">Free Prime shipping + 30-day money back guarantee</p>
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

      {/* Social Proof Popup */}
      <SocialProofPopup />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA amazonLink={amazonLink} priceValue={priceAmount} />
    </div>
  );
}
