"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
};

export function DemoVideo({ src, poster, title, subtitle }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.play();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover aspect-video"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
        PRODUCT DEMO
      </div>

      {/* Big pulsing play overlay - makes it obvious this is a video */}
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

      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pointer-events-none">
          {title && <p className="text-white font-semibold text-sm md:text-base">{title}</p>}
          {subtitle && <p className="text-amber-100 text-xs md:text-sm">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
