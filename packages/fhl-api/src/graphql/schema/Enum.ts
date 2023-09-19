import gql from "graphql-tag"

export const Enums = gql`
    enum Console {
        PC,
        XBOX,
        PS5,
        PS4,
        SWITCH
    }
`