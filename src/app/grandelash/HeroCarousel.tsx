"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "https://m.media-amazon.com/images/I/61QhbRMdKIL._SL1500_.jpg",
    alt: "GrandLash Serum Product",
    isExternal: true,
  },
  {
    src: "/images/grandelash/promo-before-after.jpeg",
    alt: "Before and After Results",
    isExternal: false,
  },
  {
    src: "/images/grandelash/promo-solution.jpeg",
    alt: "GrandLash Solution",
    isExternal: false,
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative">
      <div className="absolute -top-4 -right-4 bg-rose-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
        #1 Best Seller
      </div>

      <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Images Container */}
        <div className="relative aspect-square max-w-sm mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {image.isExternal ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain drop-shadow-xl"
                />
              )}
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-rose-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
