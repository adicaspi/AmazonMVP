import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ProductViewTracker } from "./ProductViewTracker";
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

  // Use tracking redirect URL instead of direct Amazon link
  const trackingUrl = `/out/${product.id}`;

        return (
          <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <ProductViewTracker productId={product.id} slug={product.slug} />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 font-medium"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Back to all products</span>
        </Link>

              {/* Hero Section */}
              <section className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                  {product.vertical.replace("_", " ")} • {product.status}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent">
                  {product.content.headline}
                </h1>
                <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
                  {product.content.subheadline}
                </p>
              </section>

              {/* Hero Image */}
              {product.heroImage && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-slate-950/50 to-transparent"></div>
                </div>
              )}

              {/* Pain Points */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">The Problem</h2>
                <ul className="space-y-4">
                  {product.content.painBullets.map((bullet, idx) => (
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
            {product.content.howItWorks.map((step, idx) => (
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

        {/* Who It's For / Not For */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="space-y-4 p-6 rounded-xl bg-green-50 dark:bg-green-950/10 border border-green-200 dark:border-green-900/20 shadow-sm">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Who It's For
            </h2>
            <ul className="space-y-3">
              {product.content.whoItsFor.map((item, idx) => (
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
          </section>

          <section className="space-y-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 shadow-sm">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <span className="text-slate-500 dark:text-slate-400">✗</span>
              Who It's Not For
            </h2>
            <ul className="space-y-3">
              {product.content.whoItsNotFor.map((item, idx) => (
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
        </div>

              {/* Price Note */}
              {product.priceNote && (
                <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-sm text-amber-800 dark:text-amber-200 shadow-sm">
                  <span className="font-semibold">💡 </span>
                  {product.priceNote}
                </div>
              )}

        {/* CTA Section - Sticky on mobile */}
        <section className="sticky bottom-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 sm:static sm:bg-transparent sm:border-t-0 sm:py-8 space-y-3">
          <a
            href={trackingUrl}
            className="group block w-full py-5 px-6 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600 hover:from-slate-800 hover:to-slate-700 dark:hover:from-slate-600 dark:hover:to-slate-500 text-white font-bold rounded-xl text-center transition-all duration-200 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              {product.content.ctaText}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </a>
          <p className="text-xs text-slate-600 dark:text-slate-500 text-center">
            {product.disclosures.affiliate}
          </p>
        </section>

              {/* FAQ */}
              {product.content.faq.length > 0 && (
                <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {product.content.faq.map((faq, idx) => (
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
