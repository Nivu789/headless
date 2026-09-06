// lib/shopify/queries/hero-banner.ts
export const getHeroBannerQuery = /* GraphQL */ `
  query getHeroBanner {
    metaobject(handle: { handle: "homepage-hero", type: "hero_banner" }) {
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image { url altText }
          }
        }
      }
    }
  }
`;