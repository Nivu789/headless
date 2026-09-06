const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = '2025-01'; // use whatever current version Shopify docs show

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ status: number; body: T }> {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: { tags }, // enables on-demand revalidation later
  });

  const body = await result.json();

  if (body.errors) {
    throw new Error(body.errors[0]?.message ?? 'Shopify API error');
  }

  return { status: result.status, body: body.data };
}