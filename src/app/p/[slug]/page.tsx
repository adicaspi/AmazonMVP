import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ProductViewTracker } from "./ProductViewTracker";
import { ProductCTA } from "@/components/ProductCTA";
import { WhyAIPicksRecommends } from "@/components/WhyAIPicksRecommends";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - AI Picks`,
    description: product.content.subheadline || product.shortDescription,
    openGraph: {
      title: product.content.headline || product.name,
      description: product.content.subheadline || product.shortDescription,
      url: `https://www.aipicks.co/p/${slug}`,
      siteName: "AI Picks",
      type: "website",
      images: product.heroImage
        ? [
            {
              url: product.heroImage,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.content.headline || product.name,
      description: product.content.subheadline || product.shortDescription,
      images: product.heroImage ? [product.heroImage] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Use Amazon URL directly from product data
  const amazonUrl = product.amazon.url;

  // Clean and deduplicate tags from vertical field - handle duplicates at data level
  const cleanTags = (() => {
    const vertical = product.vertical.replace(/_/g, " ");
    // Split by spaces and also handle cases where tags might be separated by other delimiters
    const words = vertical.split(/[\s,;]+/).filter(w => w.trim().length > 0);
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const word of words) {
      const trimmed = word.trim();
      const lower = trimmed.toLowerCase();
      // Skip if already seen (case-insensitive)
      if (!seen.has(lower)) {
        seen.add(lower);
        // Capitalize first letter, lowercase rest
        const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        unique.push(capitalized);
      }
    }
    return unique;
  })();

  // Clean "Who It's For" content - remove duplicates, broken sentences, and template artifacts
  const cleanWhoItsFor = (() => {
    const items = product.content.whoItsFor || [];
    const cleaned: string[] = [];
    const seen = new Set<string>();
    
    for (const item of items) {
      const trimmed = item.trim();
      if (!trimmed) continue;
      
      const lower = trimmed.toLowerCase();
      
      // Skip items that are just section headers or duplicates of headers
      if (
        lower.startsWith("who it's for") ||
        lower.startsWith("who this is for") ||
        lower === "who it's for" ||
        lower === "who this is for"
      ) {
        continue;
      }
      
      // Remove generic AI phrases
      if (
        lower.includes("delivers on its promises") ||
        lower.includes("after extensive research") ||
        lower.includes("carefully selected") ||
        lower.includes("this product has been carefully selected") ||
        lower.includes("sustainable materials") ||
        (lower.includes("best") && (lower.includes("the best") || lower.includes("best product") || lower.includes("best choice"))) ||
        lower.includes("#1") ||
        lower.includes("guaranteed") ||
        lower.includes("ideal for anyone looking to") // Template artifact pattern
      ) {
        continue;
      }
      
      // Remove broken sentences that look like template artifacts
      // Pattern: "ideal for anyone looking to [product name fragment]"
      if (lower.match(/ideal for anyone looking to\s+\w+[- ]?\w*[- ]?\w*[- ]?organizer/i)) {
        continue;
      }
      
      // Remove incomplete sentences (ending with ellipsis or very short)
      if (trimmed.endsWith("...") || trimmed.length < 20) {
        continue;
      }
      
      // Remove duplicates (case-insensitive) - more aggressive deduplication
      const normalized = lower.trim()
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/[^\w\s]/g, '') // Remove punctuation for comparison
        .trim();
      
      if (seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      
      // Remove any obvious product description repetition
      const productDescLower = product.shortDescription?.toLowerCase() || '';
      const productNameLower = product.name?.toLowerCase() || '';
      if (
        (productDescLower && item.toLowerCase().includes(productDescLower.substring(0, 30))) ||
        (productNameLower && item.toLowerCase().includes(productNameLower.substring(0, 30)))
      ) {
        continue;
      }
      
      // Remove items that are just fragments (less than 3 words)
      const wordCount = trimmed.split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount < 3) {
        continue;
      }
      
      cleaned.push(trimmed);
    }
    
    // Limit to 1-2 items max, keep it short - prefer shorter, cleaner items
    const sorted = cleaned.sort((a, b) => a.length - b.length);
    return sorted.slice(0, 2);
  })();

  // Filter out AI-generic filler from content arrays - comprehensive filtering
  const filterGenericContent = (text: string): boolean => {
    if (!text || typeof text !== 'string') return false;
    const lower = text.toLowerCase().trim();
    if (lower.length < 10) return false; // Skip very short fragments
    
    // Comprehensive list of AI-generic phrases to filter
    const genericPatterns = [
      "delivers on its promises",
      "after extensive research",
      "carefully selected",
      "this product has been carefully selected",
      "sustainable materials",
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
    
    // Check for generic patterns
    for (const pattern of genericPatterns) {
      if (lower.includes(pattern)) {
        return false;
      }
    }
    
    // Check for "best" in context of superlatives (but allow "best practices", "best suited")
    if (lower.match(/\b(best|top|leading|premium|ultimate)\b.*\b(product|choice|option|solution)\b/i) &&
        !lower.includes("best practices") && !lower.includes("best suited")) {
      return false;
    }
    
    return true;
  };

  // Generate 3 benefit bullets from howItWorks or create standardized ones
  const filteredHowItWorks = product.content.howItWorks.filter(filterGenericContent);
  const benefitBullets = filteredHowItWorks.length >= 3
    ? filteredHowItWorks.slice(0, 3)
    : [
        "Solves common problems with a practical approach",
        "Designed for real-world use and durability",
        "Offers good value for the quality provided"
      ];

  // Generate standardized "Why AI Picks Recommends This" content - 2-3 practical sentences
  const whyWePickedItContent = product.shortDescription 
    ? `We selected this product because it addresses real needs effectively. It combines quality construction with practical functionality.`
    : `This product offers practical benefits that solve real problems. We selected it based on quality, functionality, and value.`;

        return (
          <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <ProductViewTracker productId={product.id} slug={product.slug} />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12 sm:space-y-16">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 font-medium"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Back to all products</span>
        </Link>

              {/* Above the Fold Section - Optimized for visibility */}
              <section className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* Clean tags display - deduplicated */}
                {cleanTags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {cleanTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-slate-500 dark:text-slate-400">• {product.status}</span>
                  </div>
                )}
                
                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent">
                  {product.content.headline}
                </h1>
                
                {/* Subheadline */}
                {product.content.subheadline && filterGenericContent(product.content.subheadline) && (
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
                    {product.content.subheadline}
                  </p>
                )}

                {/* Key Benefits - 3 Quick Bullets */}
                <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800/40 dark:to-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900/30 rounded-xl sm:rounded-2xl shadow-lg">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">⚡</span>
                    Why You'll Love It
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                    {benefitBullets.map((bullet, idx) => (
                      <li key={idx} className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200 flex items-start gap-2 sm:gap-3">
                        <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 sm:mt-1 font-bold text-lg sm:text-xl flex-shrink-0">✔</span>
                        <span className="font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA #1: Above the fold - Primary CTA */}
                <div className="text-center py-3 sm:py-4 md:py-6">
                  <ProductCTA
                    href={amazonUrl}
                    text="Check Price on Amazon"
                    variant="primary"
                  />
                </div>
              </section>

              {/* Hero Image - Below above-the-fold content */}
              {product.heroImage && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    unoptimized={product.heroImage.startsWith("https://")} // Allow external images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-slate-950/50 to-transparent"></div>
                </div>
              )}

              {/* Pain Points */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">The Problem</h2>
                <ul className="space-y-4">
                  {product.content.painBullets
                    .filter(filterGenericContent)
                    .map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 p-5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-slate-800 dark:text-slate-200 group hover:bg-red-100 dark:hover:bg-red-950/30 hover:shadow-md transition-all duration-200"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                        <span className="text-red-600 dark:text-red-400 text-sm font-bold">•</span>
                      </span>
                      <span className="text-base leading-relaxed font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>

        {/* How It Works */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">How It Works</h2>
          <ol className="space-y-4">
            {product.content.howItWorks
              .filter(filterGenericContent)
              .map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-6 p-5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:shadow-md transition-all duration-200 group"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-sm font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                  {idx + 1}
                </span>
                <span className="text-base text-slate-700 dark:text-slate-200 leading-relaxed pt-1.5 font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Why AI Picks Recommends This - Always present, standardized */}
        <WhyAIPicksRecommends content={whyWePickedItContent} />

        {/* CTA #2: After "Why AI Picks Recommends This" */}
        <div className="text-center py-6 sm:py-8">
          <ProductCTA
            href={amazonUrl}
            text="See it on Amazon"
            variant="secondary"
          />
        </div>

        {/* Who It's For - Single clean section */}
        {cleanWhoItsFor.length > 0 && (
          <section className="space-y-4 p-6 rounded-xl bg-green-50 dark:bg-green-950/10 border border-green-200 dark:border-green-900/20 shadow-sm">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Who This Is For
            </h2>
            {cleanWhoItsFor.length === 1 ? (
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                {cleanWhoItsFor[0]}
              </p>
            ) : (
              <ul className="space-y-3">
                {cleanWhoItsFor.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/30 flex items-center justify-center mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <span className="text-sm leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Who It's Not For */}
        {product.content.whoItsNotFor && product.content.whoItsNotFor.length > 0 && (
          <section className="space-y-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 shadow-sm">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <span className="text-slate-500 dark:text-slate-400">✗</span>
              Who It's Not For
            </h2>
            <ul className="space-y-3">
              {product.content.whoItsNotFor
                .filter(filterGenericContent)
                .map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600/30 flex items-center justify-center mt-0.5">
                    <span className="text-slate-500 dark:text-slate-500 text-xs">✗</span>
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

              {/* Price Note */}
              {product.priceNote && (
                <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-sm text-amber-800 dark:text-amber-200 shadow-sm">
                  <span className="font-semibold">💡 </span>
                  {product.priceNote}
                </div>
              )}

        {/* CTA #3: Bottom CTA - Sticky on mobile */}
        <section className="sticky bottom-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 sm:static sm:bg-transparent sm:border-t-0 sm:py-8 space-y-3">
          <div className="text-center">
            <ProductCTA
              href={amazonUrl}
              text="View full details on Amazon"
              variant="primary"
            />
          </div>
        </section>

        {/* Disclosure - Single instance, placed near bottom above footer */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-500 text-center">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>

              {/* FAQ */}
              {product.content.faq.length > 0 && (
                <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {product.content.faq
                      .filter(faq => filterGenericContent(faq.q) && filterGenericContent(faq.a))
                      .map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 space-y-2 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:shadow-md transition-all duration-200"
                      >
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{faq.q}</h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
      </div>
    </main>
  );
}
