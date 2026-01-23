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

  // Clean and deduplicate tags - case-insensitive, handle multi-word duplicates
  // Also exclude tags that match the room (case-insensitive) to avoid duplicates
  const cleanTags = (() => {
    const tags = product.tags || [];
    const roomLower = (product.room || '').replace(/_/g, ' ').toLowerCase().trim();
    const seen = new Set<string>();
    const unique: string[] = [];
    
    // Add room to seen set so tags matching room are excluded
    if (roomLower) {
      seen.add(roomLower);
    }
    
    // First, flatten and split any tags that might contain multiple words
    const allTags: string[] = [];
    for (const tag of tags) {
      // Split by common delimiters and spaces, then filter empty
      const splitTags = tag.split(/[\s,;]+/).filter(t => t.trim().length > 0);
      allTags.push(...splitTags);
    }
    
    for (const tag of allTags) {
      const trimmed = tag.trim();
      if (!trimmed) continue;
      const lower = trimmed.toLowerCase();
      // Skip if already seen (case-insensitive) or matches room
      if (!seen.has(lower)) {
        seen.add(lower);
        // Title case: first letter uppercase, rest lowercase
        const titleCased = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        unique.push(titleCased);
      }
    }
    return unique;
  })();

  return (
    <article className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xl transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden transform hover:-translate-y-1 flex flex-col h-full">
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
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col flex-grow">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-slate-700 transition-colors">
            {product.benefitTitle || product.title}
          </h3>
          {showDescription && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-2">
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
          <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full font-medium border border-emerald-100 hover:from-emerald-100 hover:to-teal-100 transition-colors">
            {product.room === "beauty-personal-care" ? "Beauty & Personal Care" : product.room.replace("_", " ").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {cleanTags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* Why we picked it - Clean 1-2 sentence excerpt with proper CSS ellipsis */}
        {product.whyWePickedIt && (
          <div className="mb-3">
            <p className="text-xs text-slate-600 font-medium mb-1">Why we picked it:</p>
            <p className="text-xs text-slate-700 leading-relaxed line-clamp-2" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {(() => {
                // Get first 1-2 complete sentences
                const sentences = product.whyWePickedIt.split(/[.!?]+/).filter(s => s.trim().length > 0);
                if (sentences.length === 0) return product.whyWePickedIt;
                
                // Take first 1-2 sentences, preferring 2 if total length is reasonable
                let excerpt = sentences[0].trim();
                if (sentences.length > 1 && excerpt.length < 100) {
                  excerpt += '. ' + sentences[1].trim();
                }
                
                // If still too long, truncate at word boundary
                if (excerpt.length > 150) {
                  const words = excerpt.split(' ');
                  excerpt = words.slice(0, Math.floor(words.length * 0.8)).join(' ');
                }
                
                return excerpt + (excerpt.length < product.whyWePickedIt.length ? '' : '');
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

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        <Link
          href={`/products/${product.slug}`}
          className="block w-full py-3.5 sm:py-4 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm sm:text-base font-bold text-center hover:from-slate-800 hover:to-slate-700 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto"
          aria-label={`View details for ${product.title}`}
        >
          View Details & Reviews
        </Link>
      </div>
    </article>
  );
}
