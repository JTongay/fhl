import {gql} from "graphql-tag"

export const Query = gql`
    # schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@provides", "@external", "@tag", "@extends", "@override", "@inaccessible"]) {query: Query}

    type Query @extends {
        booyah: String!
        howdy: String!
    }

    interface ApiError @key fields("code stacktrace"){
        code: Int!
        stacktrace: String
    }
`