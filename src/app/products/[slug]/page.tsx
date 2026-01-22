import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-data";
import Image from "next/image";
import { ProsCons } from "@/components/ProsCons";
import { SpecsTable } from "@/components/SpecsTable";
import { ProductCard } from "@/components/ProductCard";
import { ProductCTA } from "@/components/ProductCTA";
import { WhyAIPicksRecommends } from "@/components/WhyAIPicksRecommends";
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

  // Use Amazon URL directly from product data
  const amazonUrl = product.amazonUrl;
  const relatedProducts = products
    .filter(p => p.room === product.room && p.id !== product.id && p.status === "published")
    .slice(0, 3);

  // Clean and deduplicate tags - case-insensitive, trim whitespace
  const cleanTags = (() => {
    const tags = product.tags || [];
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const tag of tags) {
      const trimmed = tag.trim();
      if (!trimmed) continue;
      const lower = trimmed.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        // Title case: first letter uppercase, rest lowercase
        const titleCased = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        unique.push(titleCased);
      }
    }
    return unique;
  })();

  // Filter out AI-generic filler and unverifiable claims
  const filterGenericContent = (text: string): boolean => {
    if (!text || typeof text !== 'string') return false;
    const lower = text.toLowerCase().trim();
    if (lower.length < 10) return false;
    
    const genericPatterns = [
      "delivers on its promises",
      "after extensive research",
      "carefully selected",
      "this product has been carefully selected",
      "sustainable materials", // Unverifiable claim
      "the best",
      "best product",
      "best choice",
      "best option",
      "#1",
      "number one",
      "guaranteed",
      "we guarantee",
      "ideal for anyone looking to", // Template artifact
      "extensive research",
      "thorough research",
      "comprehensive research"
    ];
    
    for (const pattern of genericPatterns) {
      if (lower.includes(pattern)) {
        return false;
      }
    }
    
    // Check for superlatives
    if (lower.match(/\b(best|top|leading|premium|ultimate)\b.*\b(product|choice|option|solution)\b/i) &&
        !lower.includes("best practices") && !lower.includes("best suited")) {
      return false;
    }
    
    return true;
  };

  // Generate standardized "Why AI Picks Recommends This" content - 2-3 practical sentences
  // Filter out generic content
  const whyWePickedItContent = (() => {
    const content = product.whyWePickedIt || 
      `This product offers practical benefits that solve real problems. We selected it based on quality, functionality, and value.`;
    // If content contains generic phrases, use fallback
    if (!filterGenericContent(content)) {
      return `This product offers practical benefits that solve real problems. We selected it based on quality, functionality, and value.`;
    }
    return content;
  })();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <article>
        {/* Above the Fold Section - Optimized for visibility, no image */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Featured Product
            </span>
          </div>

          {/* Pain-Based Headline */}
          {product.painPoint && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight">
              {product.painPoint}
            </h1>
          )}

          {/* Benefit Title / Main Headline */}
          <h2 className={`${product.painPoint ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-bold text-emerald-700 mb-2 sm:mb-3 leading-tight`}>
            {product.benefitTitle || product.title}
          </h2>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-3 sm:mb-4 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Benefits - 3 Quick Bullets - Filter generic content */}
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-emerald-50/30 border-2 border-emerald-200 rounded-xl sm:rounded-2xl shadow-lg">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">⚡</span>
              Why You'll Love It
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {product.highlights
                .filter(filterGenericContent)
                .slice(0, 3)
                .map((highlight, idx) => (
                <li key={idx} className="text-sm sm:text-base md:text-lg text-slate-700 flex items-start gap-2 sm:gap-3">
                  <span className="text-emerald-500 mt-0.5 sm:mt-1 font-bold text-lg sm:text-xl flex-shrink-0">✔</span>
                  <span className="font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA #1: Above the fold - Primary CTA */}
          <div className="mb-6 sm:mb-8 text-center">
            <ProductCTA
              href={amazonUrl}
              text="Check Price on Amazon"
              variant="primary"
            />
          </div>

          {/* Product Image - Below above-the-fold content */}
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
          
          {/* Who This Is For - Single clean section, 1-2 sentences max */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-l-4 border-emerald-500 p-6 sm:p-8 rounded-r-2xl mb-6 sm:mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Who This Is For</h2>
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {(() => {
                // Safe defaults based on room, no broken template strings
                const roomDefaults: Record<string, string> = {
                  kitchen: "Anyone looking to organize kitchen drawers and reduce clutter.",
                  living_room: "Those wanting to add style and functionality to their living space.",
                  bedroom: "Anyone seeking better organization and comfort in their bedroom.",
                  bathroom: "People looking to keep bathroom essentials organized and accessible.",
                  office: "Those creating a more productive and organized workspace.",
                  kids_room: "Parents looking to inspire creativity and learning through quality play experiences."
                };
                return roomDefaults[product.room] || `Anyone looking to improve their ${product.room?.replace("_", " ") || "space"} organization and functionality.`;
              })()}
            </p>
          </div>

          {/* Clean tags display - deduplicated, title-cased */}
          {cleanTags.length > 0 && (
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="text-sm px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                {product.room.replace("_", " ")}
              </span>
              {cleanTags.slice(0, 3).map((tag, idx) => (
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
          )}

          {/* Why AI Picks Recommends This - Always present, standardized */}
          <WhyAIPicksRecommends content={whyWePickedItContent} />

          {/* CTA #2: After "Why AI Picks Recommends This" */}
          <div className="mb-8 sm:mb-10 text-center">
            <ProductCTA
              href={amazonUrl}
              text="See it on Amazon"
              variant="secondary"
            />
          </div>
        </div>

        <div className="prose prose-slate max-w-none mb-12">
          {/* All Benefits - Filter generic content */}
          {product.highlights.filter(filterGenericContent).length > 3 && (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Complete Feature List</h2>
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {product.highlights
                  .filter(filterGenericContent)
                  .map((highlight, idx) => (
                  <li key={idx} className="text-base sm:text-lg text-slate-700 flex items-start gap-3">
                    <span className="text-emerald-500 mt-1 font-bold text-xl">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <ProsCons pros={product.pros?.filter(filterGenericContent) || []} cons={product.cons?.filter(filterGenericContent) || []} />

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Specifications</h2>
          <SpecsTable specs={product.specs} />
        </div>

        {/* CTA #3: Bottom CTA */}
        <div className="border-t-4 border-emerald-500 pt-10 sm:pt-12 mb-12 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Ready to Get This Product?</h3>
            <p className="text-base sm:text-lg text-slate-600">Check current price and availability on Amazon</p>
          </div>
          <div className="text-center">
            <ProductCTA
              href={amazonUrl}
              text="View full details on Amazon"
              variant="primary"
            />
          </div>
        </div>

        {/* Disclosure - Single instance, placed near bottom above footer */}
        <div className="pt-8 border-t border-slate-200 mb-8">
          <p className="text-xs text-slate-600 text-center">
            As an Amazon Associate, we earn from qualifying purchases.
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
