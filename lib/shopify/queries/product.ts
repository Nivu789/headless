export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      vendor
      productType
      images(first: 10) {
        edges { node { url altText width height } }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url altText width height }
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;