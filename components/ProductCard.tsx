// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
}

export function ProductCard({ product, showDescription = true }: ProductCardProps) {
  const roomDisplay = product.room === "beauty-personal-care"
    ? "Beauty & Personal Care"
    : product.room.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const priceDisplay = product.price ? `$${product.price.toFixed(2)}` : null;

  return (
    <article className="group bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1 flex flex-col h-full">
      {/* Image */}
      <div className="aspect-square relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={95}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Top Pick Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-full shadow-lg">
            Top Pick - {roomDisplay}
          </div>
        </div>
        {/* Price Badge */}
        {priceDisplay && (
          <div className="absolute top-3 right-3">
            <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full shadow-lg">
              {priceDisplay}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
          {product.benefitTitle || product.title}
        </h3>

        {/* Description */}
        {showDescription && (
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
        )}

        {/* Top 2 Highlights */}
        {product.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-3">
            {product.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 font-bold flex-shrink-0">&#10004;</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">Highly Rated</span>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <span className="text-green-500">&#10003;</span> Free Shipping
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-500">&#10003;</span> Prime
          </span>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* CTA Button */}
        <Link
          href={`/products/${product.slug}`}
          className="block w-full py-3.5 sm:py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm sm:text-base font-bold text-center hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-auto"
          aria-label={`View details for ${product.title}`}
        >
          View Details & Buy Now
        </Link>
      </div>
    </article>
  );
}
