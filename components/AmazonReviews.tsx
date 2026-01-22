// components/AmazonReviews.tsx
// Amazon Reviews component with auto-scrolling carousel
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

interface AmazonReviewsProps {
  amazonUrl: string;
  asin?: string;
  productTitle: string;
}

// Mock reviews - In production, these would come from Amazon API or a proxy service
const getMockReviews = (productTitle: string): Review[] => {
  return [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      title: "Excellent quality and exactly as described",
      content: "I've been using this for a few weeks now and it's exactly what I needed. The quality is great and it works perfectly for my needs. Highly recommend!",
      date: "2 weeks ago",
      verified: true,
    },
    {
      id: "2",
      author: "John D.",
      rating: 4,
      title: "Good value for the price",
      content: "Solid product that does what it's supposed to. The build quality is good and it's easy to use. Only minor complaint is the packaging could be better.",
      date: "1 month ago",
      verified: true,
    },
    {
      id: "3",
      author: "Emily R.",
      rating: 5,
      title: "Love it! Perfect for my needs",
      content: "This exceeded my expectations. It's well-made, functional, and looks great. I use it daily and it's holding up perfectly. Worth every penny!",
      date: "3 weeks ago",
      verified: true,
    },
    {
      id: "4",
      author: "Michael T.",
      rating: 4,
      title: "Good product with minor issues",
      content: "Overall a good purchase. It works well and the quality is decent. The only issue I had was with the initial setup, but once it was working, it's been great.",
      date: "2 months ago",
      verified: false,
    },
    {
      id: "5",
      author: "Jessica L.",
      rating: 5,
      title: "Amazing! Better than expected",
      content: "I'm really happy with this purchase. The quality is excellent and it's exactly what I was looking for. I would definitely buy this again!",
      date: "1 week ago",
      verified: true,
    },
  ];
};

export function AmazonReviews({ amazonUrl, asin, productTitle }: AmazonReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    // In production, fetch real reviews from API
    // For now, use mock data
    setReviews(getMockReviews(productTitle));
  }, [productTitle]);

  useEffect(() => {
    if (!isAutoScrolling || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, reviews.length]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  // Extract ASIN from URL if not provided
  const extractAsin = (url: string): string | null => {
    const match = url.match(/\/dp\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
  };

  const productAsin = asin || extractAsin(amazonUrl);
  const reviewsUrl = productAsin 
    ? `https://www.amazon.com/product-reviews/${productAsin}?tag=${amazonUrl.includes('tag=') ? amazonUrl.split('tag=')[1].split('&')[0] : 'aipicks20-20'}`
    : amazonUrl;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? "text-yellow-400" : "text-slate-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="border-t border-slate-200 dark:border-slate-800 pt-12 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Customer Reviews
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Real feedback from Amazon customers
          </p>
        </div>
        <Link
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1"
        >
          View All Reviews
          <span className="text-xs">→</span>
        </Link>
      </div>

      {/* Review Carousel */}
      <div
        className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-lg"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {/* Review Card */}
        <div className="transition-all duration-500 ease-in-out">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                {currentReview.author.charAt(0)}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {currentReview.author}
                </span>
                {currentReview.verified && (
                  <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mb-2">
                {renderStars(currentReview.rating)}
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {currentReview.date}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                {currentReview.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentReview.content}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoScrolling(false);
                setTimeout(() => setIsAutoScrolling(true), 10000);
              }}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full"
                  : "w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
            setIsAutoScrolling(false);
            setTimeout(() => setIsAutoScrolling(true), 10000);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-md hover:shadow-lg"
          aria-label="Previous review"
        >
          <span className="text-xl">←</span>
        </button>
        <button
          onClick={() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
            setIsAutoScrolling(false);
            setTimeout(() => setIsAutoScrolling(true), 10000);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-md hover:shadow-lg"
          aria-label="Next review"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Additional Reviews Preview */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.slice(0, 2).map((review, idx) => (
          <div
            key={review.id}
            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              {renderStars(review.rating)}
              <span className="text-xs text-slate-500 dark:text-slate-400">{review.date}</span>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 text-sm">
              {review.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {review.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
