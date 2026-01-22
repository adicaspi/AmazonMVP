import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-data";
import Image from "next/image";
import { buildAmazonAffiliateLink } from "@/lib/amazon-links";
import { ProsCons } from "@/components/ProsCons";
import { SpecsTable } from "@/components/SpecsTable";
import { ProductCard } from "@/components/ProductCard";
import { ProductCTA } from "@/components/ProductCTA";
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
      title: product.title,
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

  const affiliateLink = buildAmazonAffiliateLink(product.amazonUrl);
  const relatedProducts = products
    .filter(p => p.room === product.room && p.id !== product.id && p.status === "published")
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <div className="mb-12">
          <div className="aspect-video relative bg-gradient-to-br from-slate-50 to-slate-100 mb-8 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
            <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Featured Product
            </span>
          </div>

          {/* Pain-Based Headline */}
          {product.painPoint && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {product.painPoint}
            </h1>
          )}

          <h2 className={`${product.painPoint ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-4xl sm:text-5xl md:text-6xl'} font-bold text-emerald-700 mb-4 sm:mb-6 leading-tight`}>
            {product.benefitTitle || product.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Benefits - 3 Quick Bullets */}
          <div className="mb-8 sm:mb-10 p-6 sm:p-8 bg-gradient-to-br from-white to-emerald-50/30 border-2 border-emerald-200 rounded-2xl shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Why You'll Love It
            </h3>
            <ul className="space-y-3">
              {product.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="text-base sm:text-lg text-slate-700 flex items-start gap-3">
                  <span className="text-emerald-500 mt-1 font-bold text-xl flex-shrink-0">✔</span>
                  <span className="font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA #1: Above the fold - After benefits */}
          <div className="mb-8 sm:mb-10 text-center">
            <ProductCTA
              href={affiliateLink}
              text="Check Price on Amazon"
              variant="primary"
            />
          </div>
          
          {/* Who this product is for */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-l-4 border-emerald-500 p-6 sm:p-8 rounded-r-2xl mb-6 sm:mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Who This Is For</h2>
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {product.room === "kitchen" && "Perfect for anyone looking to organize their kitchen drawers and reduce clutter."}
              {product.room === "living_room" && "Ideal for those wanting to add style and functionality to their living space."}
              {product.room === "bedroom" && "Great for anyone seeking better organization and comfort in their bedroom."}
              {product.room === "bathroom" && "Perfect for keeping bathroom essentials organized and accessible."}
              {product.room === "office" && "Ideal for creating a more productive and organized workspace."}
              {product.room === "kids_room" && "Perfect for parents looking to inspire creativity and learning through quality play experiences."}
              {!["kitchen", "living_room", "bedroom", "bathroom", "office", "kids_room"].includes(product.room) &&
                `Perfect for anyone looking to improve their ${product.room.replace("_", " ")} organization and functionality.`}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-sm px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all">
              {product.room.replace("_", " ")}
            </span>
            {product.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={tag}
                className={`text-sm px-4 py-2 rounded-full font-semibold border-2 transition-all hover:shadow-md ${
                  idx === 0 ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  idx === 1 ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  'bg-orange-50 text-orange-700 border-orange-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Why AI Picks Recommends This - Moved Up for Trust */}
          {product.whyWePickedIt && (
            <>
              <div className="mb-8 sm:mb-10 p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-l-4 border-emerald-500 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Why AI Picks Recommends This</h3>
                </div>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  {product.whyWePickedIt}
                </p>
              </div>

              {/* CTA #2: After "Why AI Picks Recommends This" */}
              <div className="mb-8 sm:mb-10 text-center">
                <ProductCTA
                  href={affiliateLink}
                  text="See it on Amazon"
                  variant="secondary"
                />
              </div>
            </>
          )}
        </div>

        <div className="prose prose-slate max-w-none mb-12">
          {/* Introduction Paragraph */}
          <div className="mb-8 sm:mb-10">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              {product.shortDescription} This product has been carefully selected for its combination of quality, functionality, and value. Whether you're looking to organize your space, improve efficiency, or simply enhance your home's aesthetic, this product delivers on its promises.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              After extensive research and consideration of user reviews, design quality, and practical benefits, we've identified this as a standout option in its category. It offers a thoughtful solution to common home organization and improvement challenges.
            </p>
          </div>

          {/* CTA #2: After main description (if "Why AI Picks Recommends This" doesn't exist) */}
          {!product.whyWePickedIt && (
            <div className="mb-8 sm:mb-10 text-center">
              <ProductCTA
                href={affiliateLink}
                text="See it on Amazon"
                variant="secondary"
              />
            </div>
          )}

          {/* All Benefits */}
          {product.highlights.length > 3 && (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Complete Feature List</h2>
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-base sm:text-lg text-slate-700 flex items-start gap-3">
                    <span className="text-emerald-500 mt-1 font-bold text-xl">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <ProsCons pros={product.pros} cons={product.cons} />

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Specifications</h2>
          <SpecsTable specs={product.specs} />

          <div className="my-12 p-8 sm:p-10 bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 border-2 border-purple-200 rounded-3xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👥</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Who It's For</h2>
            </div>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                This product is ideal for anyone looking to {product.shortDescription.toLowerCase()}.
                It's particularly well-suited for {product.room.replace("_", " ")} spaces and
                those interested in {product.tags.slice(0, 2).join(" and ")}.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Whether you're a first-time homeowner setting up your space, someone looking to declutter and organize, or a design enthusiast seeking functional yet beautiful solutions, this product offers practical benefits that make daily life easier and more enjoyable.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                It's especially valuable for those who appreciate thoughtful design, sustainable materials, and products that solve real problems without adding unnecessary complexity to your routine.
              </p>
            </div>
          </div>
        </div>

        {/* CTA #3: Bottom CTA */}
        <div className="border-t-4 border-emerald-500 pt-10 sm:pt-12 mb-12 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Ready to Get This Product?</h3>
            <p className="text-base sm:text-lg text-slate-600">Check current price and availability on Amazon</p>
          </div>
          <div className="text-center">
            <ProductCTA
              href={affiliateLink}
              text="View full details on Amazon"
              variant="primary"
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-6 sm:mt-8 text-center">
            <span className="font-semibold">Affiliate Disclosure:</span> As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} showDescription={false} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
