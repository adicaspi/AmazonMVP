import type { Metadata } from "next";
import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
import { AuraGlowAmazonButton } from "./AuraGlowAmazonButton";
import { AuraGlowPixel } from "./AuraGlowPixel";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { PageViewTracker } from "@/components/PageViewTracker";
import { UrgencyElements } from "./UrgencyElements";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { SocialProofPopup } from "./SocialProofPopup";
import { getProductsByASIN, AmazonProductData } from "@/lib/amazon-creators-api";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "AuraGlow Teeth Whitening Kit | Professional Results at Home",
  description:
    "The #1 Best-Selling Teeth Whitening Kit on Amazon. 40,000+ 5-star reviews. Professional-level whitening with LED accelerator light. Visible results in just 7 days. $48 with free Prime shipping.",
  openGraph: {
    title: "AuraGlow - Professional Teeth Whitening at Home",
    description:
      "The #1 Best-Selling Teeth Whitening Kit on Amazon. 40,000+ reviews. Dentist-recommended LED whitening. Visible results in 7 days.",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/610DA7ixPiL._AC_SL1500_.jpg",
        width: 1500,
        height: 1500,
        alt: "AuraGlow Teeth Whitening Kit",
      },
    ],
    type: "website",
    siteName: "AIPicks",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraGlow - Professional Teeth Whitening at Home",
    description:
      "The #1 Best-Selling Teeth Whitening Kit on Amazon. 40,000+ reviews. Results in 7 days!",
    images: [
      "https://m.media-amazon.com/images/I/610DA7ixPiL._AC_SL1500_.jpg",
    ],
  },
};

const ASIN = "B00YI5VJW6";

// Cache API response for 1 hour — page loads are instant after first fetch
const getCachedProduct = unstable_cache(
  async (): Promise<AmazonProductData | null> => {
    try {
      const products = await getProductsByASIN([ASIN]);
      if (products.length > 0) return products[0];
    } catch (err) {
      console.error("Failed to fetch product data from Amazon Creators API:", err);
    }
    return null;
  },
  [`product-${ASIN}`],
  { revalidate: 3600 } // revalidate every hour
);

export default async function AuraGlowPage() {
  const product = await getCachedProduct();
  const amazonLink = `https://www.amazon.com/dp/${ASIN}?tag=aipicks20-20`;

  // Use API price if available, fallback to $48
  const price = product?.price?.displayAmount || "$48";
  const priceAmount = product?.price?.amount || 48;
  const reviewCount = product?.reviewCount || 40000;
  const starRating = product?.starRating || 4.4;

  return (
    <div className="min-h-screen bg-white">
      <ViewContentTracker
        productName="AuraGlow Teeth Whitening Kit"
        productId="auraglow"
        category="Beauty"
      />
      <PageViewTracker page="/auraglow" />
      <AuraGlowPixel />

      {/* Urgency Announcement Bar — Amazon Deal Alert */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold">
          <span>&#128293;</span>
          <span>LIMITED TIME AMAZON DEAL — Price May Change at Midnight</span>
          <span>&#128293;</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-16">
          {/* Mobile: Open Loop Headline + Rating ABOVE image */}
          <div className="md:hidden mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-900 text-white text-xs font-medium px-2 py-0.5 rounded">
                Amazon&apos;s Choice
              </span>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                #1 Best Seller
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
              The 30-Minute Routine Dentists Use to Whiten{" "}
              <span className="text-blue-600">10 Shades in 7 Days</span>
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Professional-grade results. No office visit. No sensitivity.
            </p>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? "text-amber-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-blue-600 font-semibold">{starRating}</span>
              <span className="text-sm text-gray-500">({reviewCount.toLocaleString()}+ verified)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Image carousel */}
            <div className="order-1 md:order-2">
              <HeroCarousel />
            </div>

            {/* Content */}
            <div className="order-2 md:order-1">
              {/* Desktop only — Open Loop Headline */}
              <div className="hidden md:block">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
                    <span>&#127942;</span>
                    #1 Best Seller
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-semibold">
                    <span>&#10003;</span>
                    4.5/5 &quot;Excellent&quot;
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  The 30-Minute Routine Used by Dentists to Whiten{" "}
                  <span className="text-blue-600">10 Shades in 7 Days</span>
                </h1>

                <p className="text-xl text-gray-600 mb-4">
                  35% Carbamide Peroxide. Enamel-safe. Zero sensitivity.
                  The same formula dentists trust — now available at home.
                </p>

                <p className="text-lg text-green-700 font-bold mb-4 flex items-center gap-2">
                  <span>&#128176;</span>
                  Just {price} with Free Prime Shipping. 20+ treatments included.
                </p>

                <p className="text-base text-gray-700 mb-6 font-medium">
                  Join{" "}
                  <span className="text-blue-600 font-bold">{reviewCount.toLocaleString()}+</span>{" "}
                  verified buyers who transformed their smile at home
                </p>
              </div>

              {/* Urgency Elements */}
              <div className="mb-4 md:mb-5">
                <UrgencyElements />
              </div>

              {/* CTA Button — Micro-Conversion */}
              <div className="mb-4">
                <AuraGlowAmazonButton
                  href={amazonLink}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-5 md:py-6 bg-gradient-to-r from-[#FF9900] to-[#e88600] hover:from-[#e88600] hover:to-[#d47a00] text-white font-bold text-lg md:text-2xl rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                >
                  <span>Buy Now on Amazon</span>
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </AuraGlowAmazonButton>
                {/* Mobile quick trust badges */}
                <div className="flex items-center justify-center gap-4 mt-3 md:hidden">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">&#10003;</span> Free
                    Shipping
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">&#10003;</span> 30-Day
                    Returns
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">&#10003;</span> Prime
                  </span>
                </div>
              </div>

              {/* Trust Elements - Desktop only */}
              <div className="hidden md:flex flex-col gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">&#10003;</span>
                  <span>
                    <strong>30-Day Money Back Guarantee</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">&#10003;</span>
                  <span>Free &amp; Fast Prime Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">&#10003;</span>
                  <span>Ships Today if Ordered Within 2 Hours</span>
                </div>
              </div>

              {/* Rating - Desktop only */}
              <div className="hidden md:flex flex-wrap items-center gap-2 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "text-amber-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">{starRating}/5</span>
                <span className="text-gray-600">
                  from <strong>{reviewCount.toLocaleString()}+ Verified Amazon Buyers</strong>
                </span>
              </div>

              <p className="hidden md:block text-xs text-gray-500 mt-2 italic">
                Amazon Best-Seller This Month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-100 py-4 md:py-8 border-y border-blue-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#11088;</span>
              <div className="text-lg md:text-3xl font-bold text-blue-600">
                4.5/5
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                &quot;Excellent&quot; Rating
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#127942;</span>
              <div className="text-lg md:text-3xl font-bold text-blue-600">
                #1
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Best Seller
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#128170;</span>
              <div className="text-lg md:text-3xl font-bold text-blue-600">
                10 Shades
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Whiter in 7 Days
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#128737;&#65039;</span>
              <div className="text-lg md:text-3xl font-bold text-blue-600">
                60-Day
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Money-Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AuraGlow Beats Dental Office */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Why AuraGlow Beats Dental Office Whitening
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Professional results without the professional price tag
            </p>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Results", good: "7 Days", bad: "1 Visit" },
              { label: "Cost", good: price, bad: "$300-$600" },
              { label: "Convenience", good: "At Home", bad: "Office Visit" },
              { label: "Sensitivity", good: "Minimal", bad: "Common" },
              { label: "Treatments", good: "20+ Uses", bad: "1 Session" },
            ].map((row, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
              >
                <div className="text-xs text-gray-500 mb-2 font-medium">
                  {row.label}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">AuraGlow</div>
                    <div className="text-green-600 font-bold text-sm">
                      {row.good}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      Dental Office
                    </div>
                    <div className="text-red-500 font-bold text-sm">
                      {row.bad}
                    </div>
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
                      <span className="text-blue-600 font-bold text-lg">
                        AuraGlow
                      </span>
                      <span className="text-green-500 text-sm">
                        &#10003; Recommended
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-gray-600 font-bold text-lg">
                      Dental Office
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    Visible Results
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    Within 7 Days
                  </td>
                  <td className="px-6 py-4 text-center text-red-500">
                    1 Visit (but fades)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 font-medium">Cost</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    {price} (20+ treatments)
                  </td>
                  <td className="px-6 py-4 text-center text-red-500">
                    $300 - $600 per session
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    Convenience
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    At Home, 30 min
                  </td>
                  <td className="px-6 py-4 text-center text-red-500">
                    Office Appointment
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    Tooth Sensitivity
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    Minimal (gentle formula)
                  </td>
                  <td className="px-6 py-4 text-center text-red-500">
                    Common side effect
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    Treatments Included
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    20+ Whitening Sessions
                  </td>
                  <td className="px-6 py-4 text-center text-red-500">
                    1 Session
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <AuraGlowAmazonButton
              href={amazonLink}
              position="comparison-table"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FF9900] to-[#e88600] hover:from-[#e88600] hover:to-[#d47a00] text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Buy Now on Amazon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </AuraGlowAmazonButton>
          </div>
        </div>
      </section>

      {/* Real Results Section */}
      <section className="py-10 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Real Results from Real Customers
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              See the transformation for yourself. Professional-grade whitening results at home.
            </p>
          </div>

          {/* Results Gallery - Horizontal scroll on mobile */}
          <div className="relative mb-6 md:mb-12">
            <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <div className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-center">
                <img
                  src="/images/down1.jpeg"
                  alt="AuraGlow Before and After - Full Face Results"
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:hidden">
                  <p className="text-white text-sm font-semibold">Real Customer Results &#11088;</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-center">
                <img
                  src="/images/down2.jpeg"
                  alt="AuraGlow Before and After - Teeth Closeup"
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:hidden">
                  <p className="text-white text-sm font-semibold">7-Day Transformation &#10024;</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-center">
                <img
                  src="/images/down3.jpeg"
                  alt="AuraGlow Before and After - Amazing Smile"
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:hidden">
                  <p className="text-white text-sm font-semibold">Professional Results &#128171;</p>
                </div>
              </div>
            </div>
            {/* Swipe indicator - mobile only */}
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400 md:hidden">
              <span>&larr; Swipe for more &rarr;</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/14.jpeg"
                alt="AuraGlow Whitening Kit"
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-6 rounded-r-xl">
                <h3 className="font-bold text-base md:text-xl text-gray-900 mb-2">The Problem with Dental Whitening</h3>
                <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    <span>$300-$600 per dental office visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    <span>Painful sensitivity for days after</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">&#10005;</span>
                    <span>Requires booking appointments</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 md:p-6 rounded-r-xl">
                <h3 className="font-bold text-base md:text-xl text-gray-900 mb-2">The AuraGlow Solution</h3>
                <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>Just {price} for 20+ treatments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>Zero sensitivity with gentle formula</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>30 minutes at home, anytime</span>
                  </li>
                </ul>
              </div>

              <AuraGlowAmazonButton
                href={amazonLink}
                position="benefits-card"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#FF9900] to-[#e88600] hover:from-[#e88600] hover:to-[#d47a00] text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Get Your AuraGlow Now
              </AuraGlowAmazonButton>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-10 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Real Video Reviews
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Real People. Real Results. No Filters.
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Watch real transformations from verified customers
            </p>
          </div>

          {/* Mobile: Single column, Desktop: Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-sm md:max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-cyan-100 aspect-[9/16] p-2">
              <video
                className="w-full h-full object-contain rounded-xl"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/Auraglow1.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-2 left-2 right-2 bg-blue-600/90 backdrop-blur-sm p-3 rounded-xl">
                <p className="text-white font-semibold text-sm md:text-base">Real Customer Review</p>
                <p className="text-blue-100 text-xs md:text-sm">Amazing whitening results!</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-cyan-100 aspect-[9/16] p-2">
              <video
                className="w-full h-full object-contain rounded-xl"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/Auraglow2.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-2 left-2 right-2 bg-blue-600/90 backdrop-blur-sm p-3 rounded-xl">
                <p className="text-white font-semibold text-sm md:text-base">Before &amp; After</p>
                <p className="text-blue-100 text-xs md:text-sm">See the transformation!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <AuraGlowAmazonButton
              href={amazonLink}
              position="video-testimonials"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FF9900] to-[#e88600] hover:from-[#e88600] hover:to-[#d47a00] text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Get These Results Too
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AuraGlowAmazonButton>
          </div>
        </div>
      </section>

      {/* What's in the Kit */}
      <section className="py-10 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Everything You Need for a Brighter Smile
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Professional whitening kit — complete and ready to use
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              {
                icon: "&#128161;",
                title: "LED Light",
                desc: "5x accelerator for faster whitening",
              },
              {
                icon: "&#128167;",
                title: "Whitening Gel",
                desc: "35% carbamide peroxide formula",
              },
              {
                icon: "&#129463;",
                title: "Mouth Tray",
                desc: "Comfortable one-size-fits-all",
              },
              {
                icon: "&#128214;",
                title: "Shade Guide",
                desc: "Track your whitening progress",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg text-center"
              >
                <div
                  className="text-3xl md:text-5xl mb-2 md:mb-4"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step "Easy Path" — Apply, Glow, Smile */}
      <section className="py-10 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              3 Simple Steps. 30 Minutes. Done.
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              No dentist appointment. No complicated routines.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 text-2xl md:text-3xl">
                &#128167;
              </div>
              <div className="text-xs text-blue-600 font-bold mb-1">STEP 1</div>
              <h3 className="font-bold text-base md:text-xl mb-1 md:mb-3 text-gray-900">
                Apply
              </h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">
                Apply the 35% Carbamide Peroxide gel to the tray. Takes 30 seconds.
              </p>
              <p className="text-xs text-gray-500 md:hidden">30 seconds</p>
              {/* Arrow connector */}
              <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-gray-300 text-3xl">&rarr;</div>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 text-2xl md:text-3xl">
                &#128161;
              </div>
              <div className="text-xs text-cyan-600 font-bold mb-1">STEP 2</div>
              <h3 className="font-bold text-base md:text-xl mb-1 md:mb-3 text-gray-900">
                Glow
              </h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">
                Activate the LED accelerator light. Relax for 30 minutes while it works.
              </p>
              <p className="text-xs text-gray-500 md:hidden">30 minutes</p>
              {/* Arrow connector */}
              <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-gray-300 text-3xl">&rarr;</div>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-lg text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 text-2xl md:text-3xl">
                &#128516;
              </div>
              <div className="text-xs text-amber-600 font-bold mb-1">STEP 3</div>
              <h3 className="font-bold text-base md:text-xl mb-1 md:mb-3 text-gray-900">
                Smile
              </h3>
              <p className="text-xs md:text-base text-gray-600 hidden md:block">
                10 shades whiter in 7 days. Your brightest smile — guaranteed.
              </p>
              <p className="text-xs text-gray-500 md:hidden">7-day results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-10 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-2 md:mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 md:w-8 md:h-8 ${i < 4 ? "text-amber-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Loved by 40,000+ Customers
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Don&apos;t just take our word for it
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[
              {
                name: "Mike T.",
                text: "I was skeptical but after 5 days my teeth were noticeably whiter. My wife noticed before I even said anything. Way cheaper than my dentist quoted me!",
                rating: 5,
              },
              {
                name: "Rachel K.",
                text: "Used this before my wedding and the results were amazing. Teeth went several shades whiter in just a week. Zero sensitivity!",
                rating: 5,
              },
              {
                name: "David M.",
                text: "Best money I've ever spent on teeth whitening. The LED light really makes a difference. I've tried strips before and this blows them away.",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md flex-shrink-0 w-[85vw] md:w-auto snap-center"
              >
                <div className="flex gap-0.5 mb-2 md:mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-green-600 font-medium">
                      &#10003; Verified Amazon Purchase
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400 md:hidden">
            <span>&larr; Swipe to read more reviews &rarr;</span>
          </div>

          <div className="text-center mt-6 md:mt-10">
            <AuraGlowAmazonButton
              href={amazonLink}
              position="reviews-section"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#FF9900] to-[#e88600] hover:from-[#e88600] hover:to-[#d47a00] text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Buy Now on Amazon
            </AuraGlowAmazonButton>
          </div>
        </div>
      </section>

      {/* Trust Bar Before FAQ */}
      <section className="py-6 md:py-8 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">
                Prime Shipping
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">
                30-Day Guarantee
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl md:text-3xl">&#129463;</span>
              <span className="text-xs md:text-sm font-semibold text-gray-800">
                Dentist Recommended
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-2xl md:text-3xl">&#127279;</span>
              <span className="text-xs md:text-sm font-semibold text-gray-800">
                FDA Compliant
              </span>
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
            Everything you need to know about AuraGlow
          </p>

          <div className="space-y-3 md:space-y-4">
            {[
              {
                q: "How quickly will I see results?",
                a: "Most users see visible whitening after just 2-3 treatments. For best results, use daily for 7-10 days. Each session is only 30 minutes.",
                showMobile: true,
              },
              {
                q: "Will it cause tooth sensitivity?",
                a: "AuraGlow uses a gentle 35% carbamide peroxide formula designed to minimize sensitivity. Most users report zero sensitivity, but if you have sensitive teeth, start with shorter sessions.",
                showMobile: true,
              },
              {
                q: "How many treatments do I get?",
                a: `Each kit includes enough whitening gel for 20+ treatments. That's less than $${(priceAmount / 20).toFixed(2)} per treatment — incredible value for professional-grade whitening.`,
                showMobile: true,
              },
              {
                q: "Is it safe for my enamel?",
                a: "Yes! AuraGlow is enamel-safe. The carbamide peroxide formula is the same type used by dentists, just at a gentler concentration for at-home use.",
                showMobile: true,
              },
              {
                q: "Does the LED light really make a difference?",
                a: "Absolutely. The LED accelerator light speeds up the whitening process by 5x compared to gel alone. It activates the whitening agents for faster, more even results.",
                showMobile: false,
              },
              {
                q: "Can I use it with braces or dental work?",
                a: "AuraGlow works on natural teeth. It will not whiten crowns, veneers, or caps. If you have braces, wait until they're removed. Consult your dentist if unsure.",
                showMobile: false,
              },
              {
                q: "How long do the results last?",
                a: "Results can last 3-6 months depending on your diet and habits. Touch up once a month to maintain your bright smile. Avoid coffee and wine right after treatment.",
                showMobile: false,
              },
              {
                q: "What if it doesn't work for me?",
                a: "Amazon offers a hassle-free return policy. If you're not satisfied with your results, you can return it within 30 days for a full refund.",
                showMobile: false,
              },
            ].map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${!faq.showMobile ? "hidden md:block" : ""}`}
              >
                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm md:text-base text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <AuraGlowAmazonButton
              href={amazonLink}
              position="faq-section"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FF9900] to-[#e88600] hover:from-[#e88600] hover:to-[#d47a00] text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Buy Now on Amazon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </AuraGlowAmazonButton>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Amazon&apos;s #1 Best Seller — 15K+ Bought Last Month
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Dream Smile for Just {price}
          </h2>
          <p className="text-xl text-blue-100 mb-2 max-w-2xl mx-auto">
            Professional-grade whitening. 20+ treatments included. Free Prime shipping.
          </p>
          <p className="text-lg text-blue-200 mb-6 max-w-2xl mx-auto">
            {reviewCount.toLocaleString()}+ verified buyers. {starRating}/5 rating on Amazon.
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl font-bold">{price}</span>
            <span className="bg-green-400 text-green-900 text-sm font-bold px-3 py-1 rounded-full">FREE PRIME SHIPPING</span>
          </div>
          <AuraGlowAmazonButton
            href={amazonLink}
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-[#FF9900] hover:bg-[#e88600] text-white font-bold text-xl rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Buy Now on Amazon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </AuraGlowAmazonButton>
          <p className="text-blue-200 text-sm mt-4">
            Free Prime shipping + 60-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-gray-100 py-6 md:py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm font-medium">
                Secure Checkout via Amazon
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium">Fast Prime Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                30-Day Money Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 pb-8 border-b border-gray-700">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Affiliate Disclosure:</strong> As
              an Amazon Associate, I earn from qualifying purchases. This helps
              support our recommendations at no extra cost to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/disclosure"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            Results may vary. This product is not intended to diagnose, treat,
            cure, or prevent any disease. &copy; 2026 AI Picks. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Social Proof Popup */}
      <SocialProofPopup />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA amazonLink={amazonLink} />
    </div>
  );
}
