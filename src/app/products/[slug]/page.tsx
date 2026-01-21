import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-data";
import Image from "next/image";
import { buildAmazonAffiliateLink } from "@/lib/amazon-links";
import { ProsCons } from "@/components/ProsCons";
import { SpecsTable } from "@/components/SpecsTable";
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
          
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="text-sm font-semibold text-emerald-700">Featured Product</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            {product.benefitTitle || product.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 leading-relaxed">
            {product.shortDescription}
          </p>
          
          {/* Who this product is for */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-4 sm:p-6 rounded-r-lg mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Who This Is For</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {product.room === "kitchen" && "Perfect for anyone looking to organize their kitchen drawers and reduce clutter."}
              {product.room === "living_room" && "Ideal for those wanting to add style and functionality to their living space."}
              {product.room === "bedroom" && "Great for anyone seeking better organization and comfort in their bedroom."}
              {product.room === "bathroom" && "Perfect for keeping bathroom essentials organized and accessible."}
              {product.room === "office" && "Ideal for creating a more productive and organized workspace."}
              {!["kitchen", "living_room", "bedroom", "bathroom", "office"].includes(product.room) && 
                `Perfect for anyone looking to improve their ${product.room.replace("_", " ")} organization and functionality.`}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-sm px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full font-semibold border border-emerald-100">
              {product.room.replace("_", " ")}
            </span>
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-sm px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
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

          {/* Key Benefits */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Key Benefits</h2>
          <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            {product.highlights.map((highlight, idx) => (
              <li key={idx} className="text-base sm:text-lg text-slate-700 flex items-start gap-3">
                <span className="text-emerald-500 mt-1 font-bold text-xl">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          
          {/* Why AI Picks Recommends This */}
          {product.whyWePickedIt && (
            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 sm:p-8 rounded-r-lg mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Why AI Picks Recommends This</h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {product.whyWePickedIt}
              </p>
              <p className="text-sm text-slate-600 mt-4 italic">
                Based on reviews, value, and design quality.
              </p>
            </div>
          )}

          <ProsCons pros={product.pros} cons={product.cons} />

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Specifications</h2>
          <SpecsTable specs={product.specs} />

          <div className="my-12 p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-emerald-50/30 border-l-4 border-emerald-500 rounded-r-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Who It's For</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              This product is ideal for anyone looking to {product.shortDescription.toLowerCase()}.
              It's particularly well-suited for {product.room.replace("_", " ")} spaces and 
              those interested in {product.tags.slice(0, 2).join(" and ")}.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              Whether you're a first-time homeowner setting up your space, someone looking to declutter and organize, or a design enthusiast seeking functional yet beautiful solutions, this product offers practical benefits that make daily life easier and more enjoyable.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              It's especially valuable for those who appreciate thoughtful design, sustainable materials, and products that solve real problems without adding unnecessary complexity to your routine.
            </p>
          </div>
        </div>

        {/* CTA Above the fold - visible on scroll */}
        <div className="sticky top-16 z-40 bg-white border-t border-b border-slate-200 py-4 mb-8 sm:mb-12 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href={affiliateLink}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="block w-full py-4 sm:py-5 px-6 sm:px-10 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center font-bold text-base sm:text-lg rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Check Price on Amazon →
            </a>
            <p className="text-xs text-slate-500 mt-3 text-center">
              <span className="font-semibold">Affiliate Disclosure:</span> As an Amazon Associate I earn from qualifying purchases.
            </p>
          </div>
        </div>
        
        {/* CTA Below content */}
        <div className="border-t border-slate-200 pt-8 sm:pt-12 mb-12 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 sm:p-8">
          <a
            href={affiliateLink}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="block w-full md:w-auto md:inline-block py-4 sm:py-5 px-8 sm:px-10 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center font-bold text-base sm:text-lg rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Check Price on Amazon →
          </a>
          <p className="text-xs text-slate-500 mt-4 sm:mt-6 text-center">
            <span className="font-semibold">Affiliate Disclosure:</span> As an Amazon Associate I earn from qualifying purchases.
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
