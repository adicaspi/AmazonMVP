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
        <div className="mb-8">
          <div className="aspect-video relative bg-slate-50 mb-6">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {product.title}
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded">
              {product.room.replace("_", " ")}
            </span>
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-sm px-3 py-1 bg-slate-50 text-slate-600 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="prose prose-slate max-w-none mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Highlights</h2>
          <ul className="space-y-2 mb-8">
            {product.highlights.map((highlight, idx) => (
              <li key={idx} className="text-slate-700 flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <ProsCons pros={product.pros} cons={product.cons} />

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Specifications</h2>
          <SpecsTable specs={product.specs} />

          <div className="my-12 p-6 bg-slate-50 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who It's For</h2>
            <p className="text-slate-700 mb-4">
              This product is ideal for anyone looking to {product.shortDescription.toLowerCase()}.
              It's particularly well-suited for {product.room.replace("_", " ")} spaces and 
              those interested in {product.tags.slice(0, 2).join(" and ")}.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 mb-12">
          <a
            href={affiliateLink}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="block w-full md:w-auto md:inline-block py-4 px-8 bg-slate-900 text-white text-center font-medium hover:bg-slate-800 transition-colors"
          >
            Check price on Amazon
          </a>
          <p className="text-xs text-slate-500 mt-4">
            As an Amazon Associate I earn from qualifying purchases.
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
