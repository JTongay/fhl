import { graphql } from "@/generated/gql";

export const GET_USERS_QUERY = graphql(/* GraphQL */ `
    query GetUsers {

        users(limit: 10, offset: 1) {
            ... on UsersList {
                data {
                    id
                    firstName
                }
            }

            ... on ApiError {
                code
                stacktrace
            }
        }
    }
`)