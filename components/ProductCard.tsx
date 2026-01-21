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
    <article className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xl transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden transform hover:-translate-y-1">
      <div className="aspect-square relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 overflow-hidden rounded-t-lg sm:rounded-t-xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={95}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900 shadow-lg">
            View Details
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-slate-700 transition-colors">
            {product.benefitTitle || product.title}
          </h3>
          {showDescription && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-2">
              {product.shortDescription}
            </p>
          )}
          {product.whyWePickedIt && (
            <p className="text-xs text-emerald-700 italic leading-relaxed line-clamp-2">
              Why we picked it: {product.whyWePickedIt}
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
          <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full font-medium border border-emerald-100 hover:from-emerald-100 hover:to-teal-100 transition-colors">
            {product.room.replace("_", " ")}
          </span>
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* Why we picked it - Short version above CTA (4-6 words) */}
        {product.whyWePickedIt && (
          <div className="mb-3">
            <p className="text-xs text-slate-600 font-medium mb-1">Why we picked it:</p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {(() => {
                const firstSentence = product.whyWePickedIt.split('.')[0];
                const words = firstSentence.split(' ').slice(0, 6);
                return words.join(' ') + (words.length < firstSentence.split(' ').length ? '...' : '');
              })()}
            </p>
          </div>
        )}

        {/* Ratings placeholder */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xs">★</span>
            ))}
          </div>
          <span className="text-xs text-slate-500">(4.5)</span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">100+ reviews</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="block w-full py-3.5 sm:py-4 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm sm:text-base font-bold text-center hover:from-slate-800 hover:to-slate-700 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label={`View details for ${product.title}`}
        >
          Find Better Home Picks
        </Link>
        <p className="text-[10px] sm:text-xs text-slate-500 text-center mt-2 leading-tight">
          <span className="font-semibold">Affiliate:</span> As an Amazon Associate I earn from qualifying purchases.
        </p>
      </div>
    </article>
  );
}
