import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-data";
import Image from "next/image";
import Link from "next/link";
import { AmazonButton } from "@/components/AmazonButton";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products-data";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - AI Picks`,
    description: product.shortDescription,
    openGraph: {
      title: product.benefitTitle || product.title,
      description: product.shortDescription,
      images: [product.image],
      type: "website",
      siteName: "AIPicks",
    },
    twitter: {
      card: "summary_large_image",
      title: product.benefitTitle || product.title,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const amazonUrl = product.amazonUrl;
  const relatedProducts = products
    .filter(p => p.room === product.room && p.id !== product.id && p.status === "published")
    .slice(0, 3);

  const roomDisplay = product.room === "beauty-personal-care"
    ? "Beauty & Personal Care"
    : product.room?.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Home";

  const priceDisplay = product.price ? `$${product.price.toFixed(2)}` : null;

  return (
    <div className="min-h-screen bg-white">
      <ViewContentTracker
        productName={product.title}
        productId={product.id}
        category={product.room}
      />

      {/* Urgency Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold animate-pulse">
          <span>&#11088;</span>
          <span>TOP PICK in {roomDisplay}</span>
          <span>&#11088;</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-16">
          {/* Mobile: Title + Rating ABOVE image */}
          <div className="md:hidden mb-3">
            <p className="text-xs text-gray-500 mb-1">{roomDisplay}</p>
            <h1 className="text-lg font-semibold text-gray-900 leading-snug mb-2">
              {product.benefitTitle || product.title}
            </h1>
            {product.featured && (
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-900 text-white text-xs font-medium px-2 py-0.5 rounded">AI Pick</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-blue-600">4.5+</span>
              <span className="text-sm text-gray-500">on Amazon</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Image */}
            <div className="order-1 md:order-2">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl aspect-square bg-gradient-to-br from-slate-50 to-slate-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 md:order-1">
              {/* Desktop only: badges and headline */}
              <div className="hidden md:block">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
                    <span>&#127942;</span>
                    Top Pick - {roomDisplay}
                  </div>
                </div>

                {/* Pain Point Headline */}
                {product.painPoint && (
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {product.painPoint}
                  </h1>
                )}

                {/* Benefit Title */}
                <h2 className={`${product.painPoint ? 'text-xl lg:text-2xl text-emerald-700' : 'text-4xl lg:text-5xl text-gray-900'} font-bold mb-4`}>
                  {product.benefitTitle || product.title}
                </h2>

                <p className="text-xl text-gray-600 mb-4">
                  {product.shortDescription}
                </p>

                {/* Quick highlights */}
                <ul className="space-y-2 mb-6">
                  {product.highlights.slice(0, 3).map((highlight, idx) => (
                    <li key={idx} className="text-base text-gray-700 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">&#10004;</span>
                      <span className="font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div className="mb-4 md:mb-5">
                <div className="bg-white border-2 border-emerald-200 rounded-xl p-4 shadow-md">
                  {priceDisplay && (
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl font-bold text-gray-900">{priceDisplay}</span>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                        Great Value
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">&#10003;</span> Free Shipping
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">&#10003;</span> Prime Eligible
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-4">
                <AmazonButton
                  href={amazonUrl}
                  productName={product.title}
                  position="hero-main"
                  className="flex items-center justify-center gap-3 w-full px-6 py-5 md:py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xl md:text-2xl rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                >
                  <span>Buy Now on Amazon</span>
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AmazonButton>
                {/* Mobile-only quick trust badges */}
                <div className="flex items-center justify-center gap-4 mt-3 md:hidden">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">&#10003;</span> Free Shipping
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">&#10003;</span> 30-Day Returns
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-green-500">&#10003;</span> Prime
                  </span>
                </div>
              </div>

              {/* Trust Elements Under CTA - Desktop only */}
              <div className="hidden md:flex flex-col gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">&#10003;</span>
                  <span><strong>30-Day Money Back Guarantee</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">&#10003;</span>
                  <span>Free & Fast Prime Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">&#10003;</span>
                  <span>Sold by Amazon - Trusted Seller</span>
                </div>
              </div>

              {/* Rating - Desktop only */}
              <div className="hidden md:flex flex-wrap items-center gap-2 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">Highly Rated on Amazon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 py-4 md:py-8 border-y border-emerald-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#11088;</span>
              <div className="text-lg md:text-3xl font-bold text-emerald-600">4.5+</div>
              <div className="text-xs md:text-sm text-gray-600">Star Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#127942;</span>
              <div className="text-lg md:text-3xl font-bold text-emerald-600">Top Pick</div>
              <div className="text-xs md:text-sm text-gray-600">AI Picks Choice</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#128666;</span>
              <div className="text-lg md:text-3xl font-bold text-emerald-600">Free</div>
              <div className="text-xs md:text-sm text-gray-600">Prime Shipping</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">&#128176;</span>
              <div className="text-lg md:text-3xl font-bold text-emerald-600">30 Days</div>
              <div className="text-xs md:text-sm text-gray-600">Money Back</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pros vs Cons - Comparison Table Style */}
      {(product.pros.length > 0 || product.cons.length > 0) && (
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                Pros & Cons at a Glance
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                An honest look at what makes this product stand out
              </p>
            </div>

            {/* Mobile: Card Layout */}
            <div className="md:hidden space-y-3">
              {product.pros.slice(0, 4).map((pro, i) => (
                <div key={`pro-${i}`} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 font-bold flex-shrink-0">&#10004;</span>
                      <span className="text-green-700 font-medium text-sm">{pro}</span>
                    </div>
                  </div>
                </div>
              ))}
              {product.cons.slice(0, 3).map((con, i) => (
                <div key={`con-${i}`} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 font-bold flex-shrink-0">&#10007;</span>
                      <span className="text-red-600 font-medium text-sm">{con}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Side by side */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-500">&#10004;</span> What We Love
                </h3>
                <ul className="space-y-3">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-0.5 font-bold flex-shrink-0">&#10004;</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-red-400">&#10007;</span> Things to Consider
                </h3>
                <ul className="space-y-3">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-400 mt-0.5 font-bold flex-shrink-0">&#10007;</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <AmazonButton
                href={amazonUrl}
                productName={product.title}
                position="pros-cons"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Check Price on Amazon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </AmazonButton>
            </div>
          </div>
        </section>
      )}

      {/* Key Features Section */}
      {product.highlights.length > 0 && (
        <section className="py-10 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                Key Features
              </h2>
              <p className="text-sm md:text-lg text-gray-600">Everything you need to know about this product</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {product.highlights.map((highlight, i) => (
                <div key={i} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg text-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 text-lg md:text-xl font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 font-medium">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why AI Picks Recommends */}
      {product.whyWePickedIt && (
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
                Why We Recommend It
              </h2>
              <p className="text-sm md:text-lg text-gray-600">Our honest expert opinion</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">AI</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">AI Picks Expert Review</p>
                    <p className="text-emerald-400 text-sm font-medium">Verified Analysis</p>
                  </div>
                </div>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  &ldquo;{product.whyWePickedIt}&rdquo;
                </p>
              </div>
            </div>

            <div className="text-center mt-6 md:mt-10">
              <AmazonButton
                href={amazonUrl}
                productName={product.title}
                position="review-section"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Get This Product Now
              </AmazonButton>
            </div>
          </div>
        </section>
      )}

      {/* Specifications Section */}
      {Object.keys(product.specs).length > 0 && (
        <section className="py-10 md:py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                Product Specifications
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                All the details you need
              </p>
            </div>

            {/* Mobile: Card Layout */}
            <div className="md:hidden space-y-2">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 font-medium">{key}</div>
                  <div className="text-sm font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-gray-500 font-medium">Specification</th>
                    <th className="px-6 py-4 text-left text-gray-700 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 text-gray-700 font-medium">{key}</td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Trust Bar */}
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
              <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-gray-800">Quality Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - With Urgency */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            AI Picks Top Choice - {roomDisplay}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get {product.benefitTitle ? 'This' : 'Your'} {product.benefitTitle || product.title}?
          </h2>
          <p className="text-xl text-emerald-100 mb-4 max-w-2xl mx-auto">
            {product.shortDescription}
          </p>
          {priceDisplay && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-4xl font-bold">{priceDisplay}</span>
              <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full">
                Great Value
              </span>
            </div>
          )}
          <AmazonButton
            href={amazonUrl}
            productName={product.title}
            position="final-cta"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-white text-emerald-600 font-bold text-xl rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Buy Now on Amazon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </AmazonButton>
          <p className="text-emerald-200 text-sm mt-4">Free Prime shipping + 30-day money back guarantee</p>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                You Might Also Like
              </h2>
              <p className="text-sm md:text-lg text-gray-600">More top picks in {roomDisplay}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} showDescription={false} />
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Affiliate Disclosure Footer */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-gray-400 text-center">
            <strong className="text-white">Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. This helps support our recommendations at no extra cost to you.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclosure" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
