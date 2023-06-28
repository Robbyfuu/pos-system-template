import { gql } from "urql";

export const productsQuery = gql`
query ($limit: Int, $offset: Int) {
  products(limit: $limit, offset: $offset) {
    id
    productName
    productPrice
    productImage
    productInventory
    productCategory
    productUnit
  }
}
`;

export const productsCreateMutation = gql`
  mutation ($input: CreateProductInput, $file: Upload!) {
    createProduct(input: $input, file: $file) {
      id
      productName
      productPrice
      productImage
      productInventory
      productCategory
      productUnit
    }
  }
`;
export const countProductsQuery = gql`
  query {
    countProducts
  }
`;
