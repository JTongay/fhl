import gql from "graphql-tag";

export const LeagueSchema = gql`
    type Query @extends {
        league(id: ID!): LeagueResponse!
        season(id: ID!): SeasonResponse!
        seasons(limit: Int, offset: Int): SeasonsResponse!
        event(id: ID!): Event!
        events(limit: Int, offset: Int): [Event!]!
    }

    type ApiError @key(fields: "code") @extends {
        code: Int! @external
        subgraph: String!
    }

    type League @key(fields: "id") {
        id: ID!
        teams: [Team!]!
        name: String!
        seasons: [Season!]!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type Event @key(fields: "id name") {
        id: ID!
        name: String!
        isActive: Boolean!
        # createdAt: Date!
        # updatedAt: Date!
        # games: [Game!]! @external
    }

    type Season @key(fields: "id") {
        id: ID!
        year: Int!
        isActive: Boolean!
        storylines: [Storyline!]!
        awards: [Award!]!
        # createdAt: Date!
        # updatedAt: Date!
        ## schedule
    }

    type SeasonsList {
        data: [Season!]!
        limit: Int!
        offset: Int!
        total: Int!
    }

    type Storyline @key(fields: "id") {
        id: ID!
        description: String!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type Award @key(fields: "id") {
        id: ID!
        name: String!
        # winner: User!
        season: Season!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type Team @key(fields: "id name") {
        id: ID!
        name: String! # Enum perhaps?
        wins: Int!
        losses: Int!
        # createdAt: Date!
        # updatedAt: Date!
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

    union SeasonResponse = ApiError | Season
    union SeasonsResponse = ApiError | SeasonsList
    union LeagueResponse = ApiError | League
`