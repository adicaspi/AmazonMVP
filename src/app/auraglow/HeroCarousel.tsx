"use client";

import { useState, useEffect } from "react";

type MediaItem = {
  type: "image";
  src: string;
  alt: string;
};

const mediaItems: MediaItem[] = [
  {
    type: "image",
    src: "https://m.media-amazon.com/images/I/610DA7ixPiL._AC_SL1500_.jpg",
    alt: "AuraGlow Teeth Whitening Kit - Full Package",
  },
  {
    type: "image",
    src: "https://m.media-amazon.com/images/I/71pMNBDx9uL._SL1500_.jpg",
    alt: "AuraGlow Whitening Kit Contents",
  },
  {
    type: "image",
    src: "https://m.media-amazon.com/images/I/813TG8KE5sL._SL1500_.jpg",
    alt: "AuraGlow LED Light and Gel",
  },
  {
    type: "image",
    src: "https://m.media-amazon.com/images/I/815TuGCSWTL._SL1500_.jpg",
    alt: "AuraGlow Before and After Results",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (isModalOpen || userInteracted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isModalOpen, userInteracted]);

  const handleUserInteraction = () => setUserInteracted(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const goToPrevious = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToNext = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goToIndex = (index: number) => {
    handleUserInteraction();
    setCurrentIndex(index);
  };

  const currentMedia = mediaItems[currentIndex];

  return (
    <>
      <div className="relative">
        <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
          #1 Best Seller
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
          <div
            className="relative aspect-square max-w-md mx-auto cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          >
            {mediaItems.map((media, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={media.src}
                  alt={media.alt}
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
            ))}

            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Click to zoom
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {!userInteracted && (
            <div className="md:hidden flex items-center justify-center gap-2 mt-3 text-xs text-gray-500 animate-pulse">
              <span>Swipe or tap arrows to see more</span>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-50"
            aria-label="Close"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl max-h-[85vh] aspect-square" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentMedia.src}
              alt={currentMedia.alt}
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            aria-label="Previous"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            aria-label="Next"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToIndex(index); }}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60 w-3"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
