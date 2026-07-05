"use client";

import { useEffect, useRef, useState } from "react";

// Hybrid hero carousel: opens with the official demo video auto-playing
// (muted, above the fold), then advances to the marketing images once the
// video ends. Arrows/dots let the user browse manually (stops auto-advance).

const VIDEO = {
  src: "/videos/shark-flexstyle/shark-demo.mp4",
  poster: "/images/shark-flexstyle/transformation.jpg",
};

// [USER ASSET] Licensed UGC clips (rights required — e.g. Billo/Insense or a
// signed creator agreement). Drop vertical mp4s into public/videos/shark-flexstyle/
// and add entries: { src: "/videos/shark-flexstyle/ugc-1.mp4", poster: "...", label: "@handle" }.
// They render as slides right after the demo video.
const UGC_CLIPS: { src: string; poster?: string; label?: string }[] = [];

const IMAGES = [
  { src: "/images/shark-flexstyle/ugc-before-after.jpeg", alt: "Salon results at home — before and after with the Shark FlexStyle" },
  { src: "/images/shark-flexstyle/ugc-selfie.jpeg", alt: "My hair hasn't looked this good in years — Shark FlexStyle selfie" },
  { src: "/images/shark-flexstyle/ugc-talking.jpeg", alt: "Women can't stop talking about the Shark FlexStyle" },
];

const TOTAL = 1 + UGC_CLIPS.length + IMAGES.length; // slide 0 = demo video, then UGC, then images

export function HeroMedia() {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play the video muted on mount / whenever we return to slide 0
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (index === 0) {
      v.muted = true;
      v.currentTime = 0;
      v.play().catch(() => {
        // Autoplay blocked — poster stays; fallback timer below advances
      });
    } else {
      v.pause();
    }
  }, [index]);

  // Auto-advance: images every 4s; video slide has an ~12s safety fallback
  // (normally the video's onEnded advances first)
  useEffect(() => {
    if (interacted) return;
    const delay = index === 0 ? 12000 : 4000;
    const t = setTimeout(() => setIndex((i) => (i + 1) % TOTAL), delay);
    return () => clearTimeout(t);
  }, [index, interacted]);

  const goTo = (i: number) => {
    setInteracted(true);
    setIndex(((i % TOTAL) + TOTAL) % TOTAL);
  };

  return (
    <div className="relative">
      <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-gradient-to-br from-amber-100 to-stone-100 transition-transform duration-300 hover:scale-[1.01]" style={{ aspectRatio: "1 / 1" }}>
        {/* Slide 0: auto-playing video */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${index === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <video
            ref={videoRef}
            src={VIDEO.src}
            poster={VIDEO.poster}
            autoPlay
            muted
            loop={false}
            playsInline
            preload="metadata"
            onEnded={() => { if (!interacted) setIndex(1); }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 pointer-events-none flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Watch it in action
          </div>
        </div>

        {/* Image slides */}
        {UGC_CLIPS.map((clip, i) => (
          <div key={`ugc-${i}`} className={`absolute inset-0 transition-opacity duration-500 ${index === i + 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <video src={clip.src} poster={clip.poster} muted loop playsInline preload="none" className="w-full h-full object-cover" />
            {clip.label && <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 pointer-events-none">{clip.label}</div>}
          </div>
        ))}

        {IMAGES.map((img, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${index === i + 1 + UGC_CLIPS.length ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full h-full object-contain" draggable={false} />
          </div>
        ))}

        {/* Best Seller badge */}
        <div className="absolute top-3 right-3 bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10 pointer-events-none">
          #1 Best Seller
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo(index - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
          aria-label="Previous"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo(index + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
          aria-label="Next"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? "bg-amber-600 w-6" : "bg-gray-300 hover:bg-gray-400 w-2.5"}`}
            aria-label={i === 0 ? "Video" : `Image ${i}`}
          >
            {i === 0 && index !== 0 && <span className="sr-only">video</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
