import { gql } from "@apollo/client";

export const CORE_USER_FRAGMENT = gql`/* GraphQL */ 
    fragment CoreUserFields on User {
        __typename
        id
        firstName
        lastName
        gamertag
    }
`;
