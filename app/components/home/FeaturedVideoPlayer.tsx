'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

export function FeaturedVideoPlayer({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  videoSrc,
  poster,
}: {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  videoSrc: string;
  poster?: { url: string };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section className="relative h-[80vh] max-h-[720px] overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster?.url}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-end pointer-events-none">
        <div className="container pointer-events-none pb-[8%]">
          <div className="max-w-lg pointer-events-auto">
            <h2 className="font-display text-3xl md:text-5xl uppercase leading-none text-white mb-3">
              {headline}
            </h2>
            <p className="text-white/85 mb-6 max-w-sm">{subheadline}</p>
            <div className="flex gap-3 flex-wrap">
              <Link href={primaryCta.href} className="px-7 py-3.5 bg-white text-black text-sm font-semibold hover:bg-[#FF4619] hover:text-white transition">
                {primaryCta.label}
              </Link>
              <Link href={secondaryCta.href} className="px-7 py-3.5 border border-white/50 text-white text-sm font-semibold hover:border-[#FF4619] hover:text-[#FF6B3D] transition">
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-5 flex flex-col gap-2 z-10">
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition"
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </section>
  );
}
