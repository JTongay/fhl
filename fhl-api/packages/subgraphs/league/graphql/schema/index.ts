import gql from "graphql-tag";

export const LeagueSchema = gql`
    type Query @extends {
        league: League!
        season(id: ID!): Season!
        seasons(limit: Int, offset: Int): [Season!]!
        event(id: ID!): Event!
        events(limit: Int, offset: Int): [Event!]!
    }

    type League @key(fields: "id") {
        id: ID!
        teams: [Team!]!
        name: String!
        seasons: [Season!]!
    }

    type Event @key(fields: "id name") {
        id: ID!
        name: String!
        isActive: Boolean!
        # games: [Game!]! @external
    }

    type Season @key(fields: "id") {
        id: ID!
        year: Int!
        isActive: Boolean!
        storylines: [Storyline!]!
        awards: [Award!]!
        ## schedule
    }

    type Storyline @key(fields: "id") {
        id: ID!
        description: String!
    }

    type Award {
        name: String!
        winner: User!
        season: Season!
    }

    type Team @key(fields: "id name") {
        id: ID!
        name: String! # Enum perhaps?
        wins: Int!
        losses: Int!
        captain: User! @external
        members: [User!]! @external
    }

    type User @key(fields: "id") @extends {
        id: ID! @external
        awards(limit: Int, offset: Int): [Award!]!
        currentTeam: Team
        wins: Int!
        losses: Int!
    }
`