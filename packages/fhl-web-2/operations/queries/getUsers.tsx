import { graphql } from "@/generated/gql";

export const GET_USERS = graphql(/* GraphQL */`
    query GetUsers {
        users(limit: 10, offset: 1) {
            __typename
            ... on UsersList {
                total
                limit
                offset
                data {
                    id
                    gamertag
                }
            }

            ... on ApiError {
                stacktrace
                code
            }
        }
    }

`)