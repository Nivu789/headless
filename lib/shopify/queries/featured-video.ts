// lib/shopify/queries/featured-video.ts
export const getFeaturedVideoQuery = /* GraphQL */ `
  query getFeaturedVideo($handle: String!) {
    metaobject(handle: { handle: $handle, type: "featured_video" }) {
      fields {
        key
        value
        reference {
          ... on Video {
            sources {
              url
              mimeType
            }
          }
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;