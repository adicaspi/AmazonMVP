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
    <article className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
      <div className="aspect-square relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
            {product.title}
          </h3>
          {showDescription && (
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
              {product.shortDescription}
            </p>
          )}
        </div>
        
        {product.highlights.length > 0 && (
          <ul className="space-y-2">
            {product.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-emerald-500 mt-1 font-bold">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full font-medium border border-emerald-100">
            {product.room.replace("_", " ")}
          </span>
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={affiliateLink}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="block w-full py-3.5 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-semibold text-center hover:from-slate-800 hover:to-slate-700 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Check price on Amazon →
        </a>
      </div>
    </article>
  );
}
