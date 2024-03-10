import { graphql } from "@/generated/gql";

export const GET_DASHBOARD = graphql(/* GraphQL */`
    query GetDashboard($limit: Int!, $offset: Int!) {
        seasons(limit: $limit, offset: $offset) {
            __typename
            ... on SeasonsList {
                total
                limit
                offset
                data {
                    id
                    year
                    isActive
                }
            }

            ... on ApiError {
                stacktrace
                code
            }
        }
    }
`)