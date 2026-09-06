// components/HeroBanner.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getHeroBanner } from '@/lib/shopify';

export default async function HeroBanner() {
  const hero = await getHeroBanner();

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[55fr_45fr] h-[80vh] max-h-[780px] overflow-hidden">
      {/* Left image — full width of its column, no container */}
      <div className="relative">
        <Image src={hero.imageLeft.url} alt={hero.imageLeft.altText ?? ''} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Right image — full width of its column, no container */}
      <div className="relative hidden md:block">
        <Image src={hero.imageRight.url} alt={hero.imageRight.altText ?? ''} fill className="object-cover" priority />
      </div>

      {/* Content overlay — positioned using your site's .container, sits on top of both image columns */}
      <div className="absolute inset-0 flex items-end pointer-events-none">
        <div className="container pointer-events-none pb-[8%]">
          <div className="max-w-lg pointer-events-auto">
            <h1 className="font-display text-4xl md:text-6xl uppercase leading-none text-white mb-4">
              {hero.headline}
            </h1>
            <p className="text-white/80 mb-7 max-w-sm">{hero.subheadline}</p>
            <div className="flex gap-3 flex-wrap">
              <Link href={hero.primaryCta.href} className="px-7 py-3.5 bg-white text-black text-sm font-semibold hover:bg-[#FF4619] hover:text-white transition">
                {hero.primaryCta.label}
              </Link>
              <Link href={hero.secondaryCta.href} className="px-7 py-3.5 border border-white/50 text-white text-sm font-semibold hover:border-[#FF4619] hover:text-[#FF6B3D] transition">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}