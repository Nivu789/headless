import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/shopify';
import ProductView from '@/app/components/product/ProductView';

export async function generateMetadata(props: PageProps<'/products/[handle]'>): Promise<Metadata> {
  const { handle } = await props.params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description?.slice(0, 160),
  };
}

export default async function ProductPage(props: PageProps<'/products/[handle]'>) {
  const { handle } = await props.params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const normalized = {
    ...product,
    images: product.images.edges.map((e: { node: unknown }) => e.node),
    variants: product.variants.edges.map((e: { node: unknown }) => e.node),
  };

  return (
    <>
      <div className="container pt-6 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black">Home</Link> / <span className="text-black">{product.title}</span>
      </div>
      <ProductView product={normalized} />
    </>
  );
}
