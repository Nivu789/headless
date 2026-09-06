// components/ProductRail.tsx
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  handle: string;
  image: { url: string; altText?: string } | null;
  hoverImage: { url: string; altText?: string } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variantSubtitle?: string;
  rating?: number;
  isNew?: boolean;
};

export default function ProductRail({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref: string;
  products: Product[];
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    railRef.current?.scrollBy({ left: direction * 290, behavior: 'smooth' });
  };

  return (
    <section className="container py-12">
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-baseline gap-4">
          <h2 className="font-display text-xl uppercase tracking-wide">{title}</h2>
          <Link href={viewAllHref} className="text-sm underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="hidden md:flex gap-2">
          <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full border border-neutral-300 hover:border-[#FF4619] transition flex items-center justify-center" aria-label="Scroll left">
            ‹
          </button>
          <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full border border-neutral-300 hover:border-[#FF4619] transition flex items-center justify-center" aria-label="Scroll right">
            ›
          </button>
        </div>
      </div>

      <div ref={railRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.handle}`} className="flex-none w-[360px] snap-start group">
      <div className="relative w-[360px] h-[430px] bg-neutral-200 overflow-hidden">
        {product.image && (
          <Image
            src={product.image.url}
            alt={product.image.altText ?? product.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              product.hoverImage ? 'group-hover:opacity-0' : ''
            }`}
          />
        )}
        {product.hoverImage && (
          <Image
            src={product.hoverImage.url}
            alt={product.hoverImage.altText ?? product.title}
            fill
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        {product.isNew && (
          <span className="absolute left-2.5 bottom-2.5 bg-[#FF4619] text-white text-[11px] font-semibold px-2.5 py-1">
            New
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 hover:bg-white flex items-center justify-center transition"
          aria-label="Add to wishlist"
        >
          ♡
        </button>
      </div>

      <div className="pt-3">
        <div className="flex justify-between items-start gap-2">
          <span className="text-sm font-semibold">{product.title}</span>
          {product.rating && (
            <span className="text-xs whitespace-nowrap flex items-center gap-0.5">
              <span className="text-[#FF4619]">★</span>{product.rating}
            </span>
          )}
        </div>
        {product.variantSubtitle && (
          <div className="text-[13px] text-neutral-500 mt-0.5">{product.variantSubtitle}</div>
        )}
        <div className="text-sm font-bold mt-2">
          {product.priceRange.minVariantPrice.currencyCode === 'INR' ? '₹' : '$'}
          {product.priceRange.minVariantPrice.amount}
        </div>
      </div>
    </Link>
  );
}