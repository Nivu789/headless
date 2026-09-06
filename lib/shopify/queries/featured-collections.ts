// lib/shopify/queries/featured-collections.ts
export const getFeaturedCollectionsQuery = /* GraphQL */ `
  query getFeaturedCollections($handle: String!) {
    metaobject(handle: { handle: $handle, type: "homepage_categories" }) {
      field(key: "collections") {
        references(first: 10) {
          edges {
            node {
              ... on Collection {
                id
                title
                handle
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;