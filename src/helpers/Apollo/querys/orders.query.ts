import { gql } from "urql";

export const orderCreateMutation = gql`
  mutation Mutation($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
      paymentMethod
      total
      products {
        id
        productName
        productPrice
        quantity
      }
      updatedAt
      seller {
        id
      }
    }
  }
`;

export const ordersQuery = gql`
  query {
    orders {
      id
      paymentMethod
      total
      createdAt
      orderNumber
      authorizationCode
      products {
        id
        productName
        productPrice
        productImage
        productUnit
        quantity
      }
      updatedAt
      seller {
        firstName
        lastName
      }
    }
  }
`;
