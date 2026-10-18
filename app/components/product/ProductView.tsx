'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type Money = { amount: string; currencyCode: string };
type Img = { url: string; altText?: string | null; width?: number; height?: number };
type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money | null;
  image?: Img | null;
  selectedOptions: { name: string; value: string }[];
};
type Product = {
  title: string;
  description: string;
  vendor?: string;
  productType?: string;
  images: Img[];
  variants: Variant[];
  options: { name: string; values: string[] }[];
};

function formatMoney({ amount, currencyCode }: Money) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(Number(amount));
}

// Mock content: swap for metafields once the store has them.
const mockDetails = [
  { title: 'Details', body: 'Premium materials, carefully finished. Designed for everyday wear and built to last through plenty of washes.' },
  { title: 'Shipping & Returns', body: 'Free standard shipping on orders over $75. Easy 30-day returns on unworn items.' },
  { title: 'Care', body: 'Machine wash cold with like colors. Tumble dry low. Do not bleach.' },
];

export default function ProductView({ product }: { product: Product }) {
  const [selected, setSelected] = useState<Record<string, string>>(
    () => Object.fromEntries((product.variants[0]?.selectedOptions ?? []).map((o) => [o.name, o.value]))
  );
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(0);

  const variant = useMemo(
    () =>
      product.variants.find((v) =>
        v.selectedOptions.every((o) => selected[o.name] === o.value)
      ),
    [product.variants, selected]
  );

  // Selecting a variant with its own image jumps the gallery to it.
  const gallery = product.images;
  const selectOption = (name: string, value: string) => {
    const next = { ...selected, [name]: value };
    setSelected(next);
    const match = product.variants.find((v) => v.selectedOptions.every((o) => next[o.name] === o.value));
    const idx = match?.image ? gallery.findIndex((g) => g.url === match.image!.url) : -1;
    if (idx >= 0) setActiveImage(idx);
  };

  const hasRealOptions = !(product.options.length === 1 && product.options[0].values[0] === 'Default Title');
  const price = variant?.price ?? product.variants[0]?.price;
  const compareAt = variant?.compareAtPrice;
  const onSale = compareAt && price && Number(compareAt.amount) > Number(price.amount);
  const canBuy = !!variant?.availableForSale;
  const current = gallery[activeImage];

  return (
    <div className="container py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {/* Gallery */}
      <div className="flex flex-col-reverse lg:flex-row gap-3">
        {gallery.length > 1 && (
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[640px] scrollbar-hide">
            {gallery.map((img, i) => (
              <button
                key={img.url}
                onClick={() => setActiveImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={`relative flex-none w-16 h-20 bg-neutral-200 border ${
                  i === activeImage ? 'border-black' : 'border-transparent'
                }`}
              >
                <Image src={img.url} alt={img.altText ?? product.title} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="relative flex-1 aspect-[4/5] bg-neutral-200 overflow-hidden">
          {current && (
            <Image
              src={current.url}
              alt={current.altText ?? product.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="md:pt-2">
        {(product.vendor || product.productType) && (
          <span className="text-xs tracking-[0.25em] uppercase text-[#FF4619]">
            {product.productType || product.vendor}
          </span>
        )}
        <h1 className="font-display text-3xl md:text-4xl uppercase leading-tight mt-2">{product.title}</h1>

        <div className="flex items-center gap-1 text-sm mt-3">
          <span className="text-[#FF4619]">★★★★★</span>
          <span className="text-neutral-500">4.8 · 128 reviews</span>
        </div>

        {price && (
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-bold">{formatMoney(price)}</span>
            {onSale && <span className="text-neutral-400 line-through">{formatMoney(compareAt!)}</span>}
          </div>
        )}

        {product.description && (
          <p className="text-neutral-600 text-sm leading-relaxed mt-5 whitespace-pre-line">{product.description}</p>
        )}

        {hasRealOptions &&
          product.options.map((option) => (
            <div key={option.name} className="mt-6">
              <div className="text-xs uppercase tracking-wide mb-2">
                {option.name}: <span className="text-neutral-500">{selected[option.name]}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const active = selected[option.name] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => selectOption(option.name, value)}
                      className={`min-w-12 px-4 h-11 text-sm border transition ${
                        active ? 'bg-black text-white border-black' : 'border-neutral-300 hover:border-black'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

        <div className="flex gap-3 mt-8">
          <div className="flex items-center border border-neutral-300 h-12">
            <button className="w-10 h-full" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <button className="w-10 h-full" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>
          <button
            disabled={!canBuy}
            onClick={() => {
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            className="flex-1 h-12 bg-[#FF4619] text-white text-sm font-semibold uppercase tracking-wide hover:bg-black transition disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            {!variant ? 'Unavailable' : !canBuy ? 'Sold out' : added ? 'Added (demo) ✓' : 'Add to cart'}
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-2">Demo only: the cart isn&apos;t connected to Shopify checkout yet.</p>

        <div className="mt-10 border-t border-neutral-200">
          {mockDetails.map((item, i) => (
            <div key={item.title} className="border-b border-neutral-200">
              <button
                onClick={() => setOpenSection(openSection === i ? null : i)}
                aria-expanded={openSection === i}
                className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-wide"
              >
                {item.title}
                <span>{openSection === i ? '−' : '+'}</span>
              </button>
              {openSection === i && <p className="pb-4 text-sm text-neutral-600 leading-relaxed">{item.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
