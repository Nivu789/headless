import { shopifyFetch } from './client';
import { getProductQuery } from './queries/product';

// lib/shopify/index.ts
import { getAllProductsQuery } from './queries/all-product';
import { getHeroBannerQuery } from './queries/hero-banner';
import { getNewArrivalsQuery } from './queries/new-arrivals';
import { getBestSellersQuery } from './queries/best-sellers';
import { getFeaturedCollectionsQuery } from './queries/featured-collections';
import { getFeaturedVideoQuery } from './queries/featured-video';

// export async function getAllProducts() {
//   const allProducts: any[] = [];
//   let hasNextPage = true;
//   let cursor: string | null = null;

//   while (hasNextPage) {
//     const res = await shopifyFetch<{
//       products: {
//         edges: { node: any; cursor: string }[];
//         pageInfo: { hasNextPage: boolean; endCursor: string };
//       };
//     }>({
//       query: getAllProductsQuery,
//       variables: { first: 250, after: cursor },
//       tags: ['products'],
//     });

//     const { edges, pageInfo } = res.body.products;
//     allProducts.push(...edges.map((e) => e.node));

//     hasNextPage = pageInfo.hasNextPage;
//     cursor = pageInfo.endCursor;
//   }

//   return allProducts;
// }


export async function getProduct(handle: string) {
  const res = await shopifyFetch<{ product: any }>({
    query: getProductQuery,
    variables: { handle },
    tags: [`product-${handle}`],
  });
  return res.body.product;
}

// lib/shopify/index.ts
export async function getHeroBanner() {
  const res = await shopifyFetch<{ metaobject: { fields: any[] } }>({
    query: getHeroBannerQuery,
    tags: ['hero-banner'],
  });

  const fields = res.body.metaobject.fields;
  const get = (key: string) => fields.find((f) => f.key === key)?.value;
  const getImage = (key: string) => fields.find((f) => f.key === key)?.reference?.image;

  return {
    headline: get('headline'),
    subheadline: get('subheadline'),
    primaryCta: { label: get('primary_cta_label'), href: get('primary_cta_link') },
    secondaryCta: { label: get('secondary_cta_label'), href: get('secondary_cta_link') },
    imageLeft: getImage('image_left'),
    imageRight: getImage('image_right'),
  };
}

// lib/shopify/index.ts
export async function getNewArrivals(handle = 'new-arrivals', count = 8) {
  const res = await shopifyFetch<{
    collection: { products: { edges: { node: any }[] } } | null;
  }>({
    query: getNewArrivalsQuery,
    variables: { handle, first: count },
    tags: [`collection-${handle}`],
  });

  if (!res.body.collection) {
    console.warn(`Collection "${handle}" not found — check the handle in Shopify Admin`);
    return [];
  }

  return res.body.collection.products.edges.map(({ node }) => {
    const images = node.images?.edges?.map((e: any) => e.node) ?? [];
    const firstVariant = node.variants?.edges?.[0]?.node;
    const variantSubtitle = firstVariant?.selectedOptions
      ?.map((opt: any) => opt.value)
      .join(' · ');

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      image: images[0] ?? null,
      hoverImage: images[1] ?? null, // falls back to null if product only has 1 image
      priceRange: node.priceRange,
      variantSubtitle,
    };
  });
}


export async function getBestSellers(handle = 'best-sellers', count = 8) {
  const res = await shopifyFetch<{
    collection: { products: { edges: { node: any }[] } } | null;
  }>({
    query: getBestSellersQuery,
    variables: { handle, first: count },
    tags: [`collection-${handle}`],
  });

  if (!res.body.collection) {
    console.warn(`Collection "${handle}" not found — check the handle in Shopify Admin`);
    return [];
  }

  return res.body.collection.products.edges.map(({ node }) => {
    const images = node.images?.edges?.map((e: any) => e.node) ?? [];
    const firstVariant = node.variants?.edges?.[0]?.node;
    const variantSubtitle = firstVariant?.selectedOptions
      ?.map((opt: any) => opt.value)
      .join(' · ');

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      image: images[0] ?? null,
      hoverImage: images[1] ?? null,
      priceRange: node.priceRange,
      variantSubtitle,
    };
  });
}


export async function getFeaturedCollections(handle = 'homepage-categories') {
  const res = await shopifyFetch<{ metaobject: any }>({
    query: getFeaturedCollectionsQuery,
    variables: { handle },
    tags: ['homepage-categories'],
  });

  if (!res.body.metaobject) {
    console.warn(`Metaobject "${handle}" not found — check handle, type, and Storefront API access`);
    return [];
  }

  return res.body.metaobject.field.references.edges.map((e: any) => e.node);
}

export async function getFeaturedVideo(handle = 'homepage-video') {
  const res = await shopifyFetch<{ metaobject: { fields: any[] } | null }>({
    query: getFeaturedVideoQuery,
    variables: { handle },
    tags: ['featured-video'],
  });

  if (!res.body.metaobject) {
    console.warn(`Metaobject "${handle}" not found — check handle and Storefront API access`);
    return null;
  }

  const fields = res.body.metaobject.fields;
  const get = (key: string) => fields.find((f) => f.key === key)?.value;
  const getVideoSrc = (key: string) => {
    const sources = fields.find((f) => f.key === key)?.reference?.sources;
    return sources?.find((s: any) => s.mimeType === 'video/mp4')?.url ?? sources?.[0]?.url;
  };
  const getImage = (key: string) => fields.find((f) => f.key === key)?.reference?.image;

  return {
    headline: get('headline'),
    subheadline: get('subheadline'),
    primaryCta: { label: get('primary_cta_label'), href: get('primary_cta_link') },
    secondaryCta: { label: get('secondary_cta_label'), href: get('secondary_cta_link') },
    videoSrc: getVideoSrc('video'),
    poster: getImage('poster_image'),
  };
}