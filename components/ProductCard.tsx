// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products-data";
import { buildAmazonAffiliateLink } from "@/lib/amazon-links";

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
}

export function ProductCard({ product, showDescription = true }: ProductCardProps) {
  const affiliateLink = buildAmazonAffiliateLink(product.amazonUrl);

  return (
    <article className="group border border-slate-200 bg-white hover:border-slate-300 transition-colors">
      <div className="aspect-square relative bg-slate-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {product.title}
          </h3>
          {showDescription && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </div>
        
        {product.highlights.length > 0 && (
          <ul className="space-y-1">
            {product.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="text-xs text-slate-500 flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
            {product.room.replace("_", " ")}
          </span>
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={affiliateLink}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="block w-full py-3 px-4 bg-slate-900 text-white text-sm font-medium text-center hover:bg-slate-800 transition-colors"
        >
          Check price on Amazon
        </a>
      </div>
    </article>
  );
}
