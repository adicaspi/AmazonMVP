import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ProductViewTracker } from "./ProductViewTracker";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Use tracking redirect URL instead of direct Amazon link
  const trackingUrl = `/out/${product.id}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <ProductViewTracker productId={product.id} slug={product.slug} />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-all duration-200"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Back to all products</span>
        </Link>

        {/* Hero Section */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs uppercase tracking-wide text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            {product.vertical.replace("_", " ")} • {product.status}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {product.content.headline}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {product.content.subheadline}
          </p>
        </section>

        {/* Hero Image */}
        {product.heroImage && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-800/50 shadow-2xl shadow-black/20">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
          </div>
        )}

        {/* Pain Points */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">The Problem</h2>
          <ul className="space-y-4">
            {product.content.painBullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-slate-200 group hover:bg-red-950/30 transition-all duration-200"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-red-400 text-sm">•</span>
                </span>
                <span className="text-base leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <ol className="space-y-4">
            {product.content.howItWorks.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-6 p-5 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/60 transition-all duration-200 group"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/30 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
                  {idx + 1}
                </span>
                <span className="text-base text-slate-200 leading-relaxed pt-1.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Who It's For / Not For */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="space-y-4 p-6 rounded-2xl bg-green-950/10 border border-green-900/20">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Who It's For
            </h2>
            <ul className="space-y-3">
              {product.content.whoItsFor.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-slate-200"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mt-0.5">
                    <span className="text-green-400 text-xs">✓</span>
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-slate-500">✗</span>
              Who It's Not For
            </h2>
            <ul className="space-y-3">
              {product.content.whoItsNotFor.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-slate-400"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700/30 border border-slate-600/30 flex items-center justify-center mt-0.5">
                    <span className="text-slate-500 text-xs">✗</span>
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Price Note */}
        {product.priceNote && (
          <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-sm text-amber-200">
            <span className="font-semibold">💡 </span>
            {product.priceNote}
          </div>
        )}

        {/* CTA Section - Sticky on mobile */}
        <section className="sticky bottom-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 sm:static sm:bg-transparent sm:border-t-0 sm:py-8 space-y-3">
          <a
            href={trackingUrl}
            className="group block w-full py-5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl text-center transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              {product.content.ctaText}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </a>
          <p className="text-xs text-slate-500 text-center">
            {product.disclosures.affiliate}
          </p>
        </section>

        {/* FAQ */}
        {product.content.faq.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-slate-800">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {product.content.faq.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/50 space-y-2 hover:bg-slate-900/60 transition-all duration-200"
                >
                  <h3 className="font-bold text-slate-100 text-lg">{faq.q}</h3>
                  <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
