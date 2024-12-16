import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users(limit: 10, offset: 1) {
      __typename
      ... on UsersList {
        total
        limit
        offset
        data {
          __typename
          id
          firstName
          lastName
          gamertag
        }
      }

      ... on ApiError {
        stacktrace
        code
      }
    }
  }
`;
