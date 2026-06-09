"use client";

import { useState, useEffect, useRef } from "react";

type VideoItem = {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
};

export function VideoCarousel({ videos }: { videos: VideoItem[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const goTo = (index: number) => setCurrent((index + videos.length) % videos.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Pause every video and reset the play overlay whenever the slide changes
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (el && Number(i) !== current) el.pause();
    });
    setPlaying(false);
  }, [current]);

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRefs.current[current]?.play();
  };

  const item = videos[current];

  return (
    <div className="relative">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              onPlay={() => index === current && setPlaying(true)}
              onPause={() => index === current && setPlaying(false)}
              onEnded={() => index === current && setPlaying(false)}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
        ))}

        <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10 pointer-events-none">
          PRODUCT DEMO
        </div>

        {/* Big pulsing play overlay */}
        {!playing && (
          <button
            onClick={play}
            aria-label="Play video"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 group cursor-pointer"
          >
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35"></span>
            <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 animate-ping"></span>
              <svg className="relative w-7 h-7 md:w-9 md:h-9 text-amber-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="relative bg-black/70 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
              ▶ Watch Video
            </span>
          </button>
        )}

        {(item.title || item.subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pr-14 pointer-events-none">
            {item.title && <p className="text-white font-semibold text-sm md:text-base">{item.title}</p>}
            {item.subtitle && <p className="text-amber-100 text-xs md:text-sm">{item.subtitle}</p>}
          </div>
        )}

        {/* Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
          aria-label="Previous video"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
          aria-label="Next video"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current ? "bg-amber-600 w-6" : "bg-gray-300 hover:bg-gray-400 w-2.5"
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        {current + 1} / {videos.length} · ← swipe or tap arrows →
      </p>
    </div>
  );
}
