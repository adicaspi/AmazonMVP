"use client";

import { useState, useEffect, useRef } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

const mediaItems: MediaItem[] = [
  {
    type: "image",
    src: "/images/shark-flexstyle/salon-blowout.jpg",
    alt: "Shark FlexStyle Salon Blowout at Home — Before and After",
  },
  {
    type: "image",
    src: "/images/shark-flexstyle/transformation.jpg",
    alt: "10-Minute Hair Transformation with the Shark FlexStyle",
  },
  {
    type: "image",
    src: "/images/shark-flexstyle/why-switching.jpg",
    alt: "Why Women Are Switching — The Old Routine vs the Shark FlexStyle",
  },
  {
    type: "video",
    src: "/videos/shark-flexstyle/shark-demo.mp4",
    alt: "Shark FlexStyle product demo video",
    poster: "/images/shark-flexstyle/transformation.jpg",
  },
];

const FALLBACK = "/images/shark-flexstyle/placeholder.svg";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleUserInteraction();
    videoRef.current?.play();
  };

  // Auto-rotate every 4 seconds (pause when modal is open or user has interacted)
  useEffect(() => {
    if (isModalOpen) return;
    if (userInteracted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isModalOpen, userInteracted]);

  const handleUserInteraction = () => setUserInteracted(true);

  // Close modal on Escape key
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Pause the video and restore the play overlay when navigating away from it
  useEffect(() => {
    if (currentMedia.type !== "video" && videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  }, [currentIndex, currentMedia.type]);

  const handleContainerClick = () => {
    if (currentMedia.type !== "video") {
      setIsModalOpen(true);
    }
  };

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src.indexOf(FALLBACK) === -1) {
      img.src = FALLBACK;
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute -top-4 -right-4 bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
          #1 Best Seller
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-stone-100 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Media Container */}
          <div
            className={`relative aspect-square max-w-md mx-auto ${currentMedia.type !== "video" ? "cursor-zoom-in" : ""}`}
            onClick={handleContainerClick}
          >
            {mediaItems.map((media, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {media.type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain rounded-xl shadow-lg"
                      controls
                      playsInline
                      preload="metadata"
                      poster={media.poster}
                      onClick={(e) => { e.stopPropagation(); handleUserInteraction(); }}
                      onPlay={() => { handleUserInteraction(); setVideoPlaying(true); }}
                      onPause={() => setVideoPlaying(false)}
                      onEnded={() => setVideoPlaying(false)}
                    >
                      <source src={media.src} type="video/mp4" />
                    </video>
                    <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      PRODUCT DEMO
                    </div>

                    {/* Big Play overlay - makes it obvious this is a video */}
                    {!videoPlaying && (
                      <button
                        onClick={playVideo}
                        aria-label="Play video"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 group cursor-pointer"
                      >
                        <span className="absolute inset-0 bg-black/25 rounded-xl transition-colors group-hover:bg-black/35"></span>
                        <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 animate-ping"></span>
                          <svg className="relative w-7 h-7 md:w-9 md:h-9 text-amber-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span className="relative bg-black/70 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                          ▶ Watch It Work (10s)
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={media.src}
                    alt={media.alt}
                    onError={onImgError}
                    className="w-full h-full object-contain drop-shadow-xl rounded-xl"
                  />
                )}
              </div>
            ))}

            {/* Zoom hint - only for images */}
            {currentMedia.type !== "video" && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Click to zoom
              </div>
            )}

            {/* Video indicator */}
            {currentMedia.type === "video" && (
              <div className="absolute bottom-2 right-2 bg-amber-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Video
              </div>
            )}
          </div>

          {/* Arrow Buttons */}
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

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {mediaItems.map((media, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-amber-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                } ${media.type === "video" ? "relative" : ""}`}
                aria-label={`Go to ${media.type === "video" ? "video" : "image"} ${index + 1}`}
              >
                {media.type === "video" && index !== currentIndex && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile swipe hint */}
          {!userInteracted && (
            <div className="md:hidden flex items-center justify-center gap-2 mt-3 text-xs text-gray-500 animate-pulse">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>Swipe or tap arrows to see more</span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal - Only for images */}
      {isModalOpen && currentMedia.type !== "video" && (
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

          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentMedia.src}
              alt={currentMedia.alt}
              onError={onImgError}
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
            {mediaItems.map((media, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToIndex(index); }}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60 w-3"
                }`}
                aria-label={`Go to ${media.type === "video" ? "video" : "image"} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
