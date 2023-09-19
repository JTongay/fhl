import gql from "graphql-tag"

export const League = gql`
    type League {
        id: ID!
        teams: [Team!]!
        name: String!
        seasons: [Season!]!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type Event {
        id: ID!
        name: String!
        isActive: Boolean!
        games(limit: Int, offset: Int): [Game!]!
        # createdAt: Date!
        # updatedAt: Date!
        # games: [Game!]! @external
    }

    type EventsList implements PaginatedResponse {
        total: Int!
        data: [Event!]!
        offset: Int!
        limit: Int!
    }

    type Season  {
        id: ID!
        year: Int!
        isActive: Boolean!
        storylines: [Storyline!]!
        awards: [Award!]!
        games(limit: Int, offset: Int): [Game!]!
        # createdAt: Date!
        # updatedAt: Date!
        ## schedule
    }

    type SeasonsList implements PaginatedResponse {
        data: [Season!]!
        limit: Int!
        offset: Int!
        total: Int!
    }

    type Storyline  {
        id: ID!
        description: String!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type Award {
        id: ID!
        name: String!
        # winner: User!
        season: Season!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type Team {
        id: ID!
        name: String! # Enum perhaps?
        wins: Int!
        losses: Int!
        # createdAt: Date!
        # updatedAt: Date!
        captain: User!
        members: [User!]!
    }

    union SeasonResponse = ApiError | Season
    union SeasonsResponse = ApiError | SeasonsList
    union LeagueResponse = ApiError | League
    union EventResponse = ApiError | Event
    union EventsResponse = ApiError | EventsList
`