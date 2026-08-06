"use client";

import { useRef, useState } from "react";

// Clean 9:16 video card: poster fills the frame, a big centered play button
// makes it unmistakably a video, native controls appear once playing, and
// the caption sits below the frame instead of covering it.
export function VideoCard({
  src,
  poster,
  title,
  sub,
}: {
  src: string;
  poster: string;
  title: string;
  sub: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10 bg-black aspect-[9/16]">
        <video
          ref={ref}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          poster={poster}
          controls={playing}
          onPlay={() => setPlaying(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
        {!playing && (
          <button
            onClick={() => ref.current?.play()}
            aria-label={`Play: ${title}`}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110">
              <svg className="w-9 h-9 text-rose-600 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72c0 .84.93 1.35 1.64.9l10.18-6.86a1.08 1.08 0 000-1.8L9.64 4.24A1.08 1.08 0 008 5.14z" />
              </svg>
            </span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
              ▶ Watch video
            </span>
          </button>
        )}
      </div>
      <div className="mt-3 text-center">
        <p className="font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    </div>
  );
}
