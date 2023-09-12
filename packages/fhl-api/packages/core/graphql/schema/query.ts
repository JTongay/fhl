import { gql } from "graphql-tag"

export const Query = gql`
    type Query @extends {
        booyah: String!
        howdy: String!
    }
`