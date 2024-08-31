// import { graphql } from "@/generated/gql";
import { gql } from "@apollo/client";
import { CORE_USER_FRAGMENT } from "../fragments/user";

export const GET_USERS = gql`
  ${CORE_USER_FRAGMENT}
  query GetUsers {
    users(limit: 10, offset: 1) {
      __typename
      ... on UsersList {
        total
        limit
        offset
        data {
          #   ...CoreUserFields
          __typename
          id
          firstName
          lastName
          gamertag
        }
      }
    }

    ... on ApiError {
      stacktrace
      code
    }
  }
  }
`;
