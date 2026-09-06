// lib/shopify/queries/all-products.ts
export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          handle
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;