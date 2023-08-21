import gql from "graphql-tag";

export const GameSchema = gql`
    scalar Date

    type Query @extends {
        game(id: ID!): Game!
        games(limit: Int, offset: Int): [Game!]!
    }

    type Game @key(fields: "id") {
        id: ID!
        availableOn: [Platform!]!
        trailer: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Season @key(fields: "id") @extends {
        id: ID! @external
        games(limit: Int, offset: Int): [Game!]!
    }

    type Event @key(fields: "id") @extends {
        id: ID! @external
        games(limit: Int, offset: Int): [Game!]!
    }

    type User @key(fields: "id") @extends {
        id: ID! @external
        consolesOwned: [Console!]!
    }

    type Platform {
        storeLink: String!
        console: Console!
    }

    enum Console {
        PC,
        XBOX,
        PS5,
        PS4,
        SWITCH
    }
`