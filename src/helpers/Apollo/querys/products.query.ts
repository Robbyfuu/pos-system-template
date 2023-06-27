import { gql } from "urql";

export const productsQuery = gql`
  query {
    myPosts {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
`;
