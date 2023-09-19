import gql from "graphql-tag"

export const Interface = gql`
    type ApiError {
        code: Int!
        stacktrace: String
    }

    interface PaginatedResponse {
        offset: Int!
        limit: Int!
        total: Int!
    }
`