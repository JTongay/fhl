import gql from "graphql-tag";

export const Query = gql`
    type Query {
        booyah: String!
        something: String!
        howdy(id: ID!): ID!
        user(id: ID!): UserResponse!
        users(limit: Int, offset: Int): UsersResponse!
        league(id: ID!): LeagueResponse!
        season(id: ID!): SeasonResponse!
        seasons(limit: Int, offset: Int): SeasonsResponse!
        event(id: ID!): Event!
        events(limit: Int, offset: Int): [Event!]!
        game(id: ID!): GameResponse!
        games(limit: Int, offset: Int): GamesResponse!
    }
`
