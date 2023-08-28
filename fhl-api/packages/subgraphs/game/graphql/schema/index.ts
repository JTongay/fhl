import gql from "graphql-tag";

export const GameSchema = gql`
    # scalar Date

    type Query @extends {
        game(id: ID!): GameResponse!
        games(limit: Int, offset: Int): GamesResponse!
    }

    type Game @key(fields: "id") {
        id: ID!
        availableOn: [Platform!]!
        trailer: String!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type ApiError @key(fields: "code") @extends {
        code: Int! @external
        subgraph: String!
    }

    union GameResponse = Game | ApiError

    type GamesList {
        data: [Game!]!
        total: Int!
        limit: Int!
        offset: Int!
    }

    union GamesResponse = GamesList | ApiError

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

    type Platform @key(fields: "id") {
        id: ID!
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