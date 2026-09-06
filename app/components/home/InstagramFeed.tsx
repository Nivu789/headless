// components/InstagramFeed.tsx
import Link from 'next/link';

const tiles = [
  { id: 1, gradient: 'from-[#FF4619] via-[#c23411] to-neutral-900' },
  { id: 2, gradient: 'from-neutral-800 via-neutral-900 to-black' },
  { id: 3, gradient: 'from-[#FF6B3D] via-[#7a2f14] to-neutral-900' },
  { id: 4, gradient: 'from-neutral-700 via-neutral-900 to-black' },
  { id: 5, gradient: 'from-[#c23411] via-neutral-900 to-black' },
  { id: 6, gradient: 'from-neutral-800 via-neutral-900 to-black' },
  { id: 7, gradient: 'from-[#FF4619] via-neutral-900 to-black' },
  { id: 8, gradient: 'from-neutral-700 via-[#7a2f14] to-neutral-900' },
];

function InstagramGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function InstagramFeed() {
  return (
    <section className="py-16 md:py-24">
      <div className="container flex items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs tracking-[0.25em] uppercase text-[#FF4619]">Community</span>
          <h2 className="font-display text-3xl md:text-4xl uppercase leading-none mt-2">
            Tag Us To Get Featured
          </h2>
        </div>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-semibold group"
        >
          <InstagramGlyph className="w-5 h-5 group-hover:text-[#FF4619] transition" />
          @yourstore
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-1">
        <div className="col-span-2 row-span-2 aspect-square md:aspect-auto bg-black text-white p-6 flex flex-col justify-between">
          <InstagramGlyph className="w-7 h-7 text-[#FF6B3D]" />
          <div>
            <p className="font-display text-xl uppercase leading-tight mb-3">
              Share Your Look
            </p>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold border-b border-[#FF4619] pb-0.5 hover:text-[#FF6B3D] hover:border-[#FF6B3D] transition"
            >
              @yourstore
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`group relative aspect-square overflow-hidden bg-gradient-to-br ${tile.gradient}`}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 scale-90 group-hover:scale-100">
              <InstagramGlyph className="w-7 h-7 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
