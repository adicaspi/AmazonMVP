"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
};

// Muted, looping, autoplaying hero video — motion above the fold catches the
// eye without requiring any interaction. Muted is (re)applied via ref because
// React does not always render the muted attribute in SSR HTML, which can
// block autoplay on some browsers.
export function HeroVideo({ src, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {
      // Autoplay blocked — poster stays visible, no error surfaced
    });
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-stone-100">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover aspect-square"
      />
      <div className="absolute top-3 right-3 bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10 pointer-events-none">
        #1 Best Seller
      </div>
      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 pointer-events-none flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Watch it in action
      </div>
    </div>
  );
}
