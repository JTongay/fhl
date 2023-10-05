import gql from "graphql-tag";

export const Mutation = gql`
    type Mutation {
        createUser(input: CreateUserInput!): UserResponse!
        updateUser(input: UpdateUserInput!): UserResponse!
        createLeague(input: CreateLeagueInput!): LeagueResponse!
        createSeason(input: CreateSeasonInput!): SeasonResponse!
        updateSeason(input: UpdateSeasonInput!): SeasonResponse!
        deleteSeason(input: DeleteSeasonInput!): Boolean!
        createStoryline(input: CreateStorylineInput!): StorylineResponse!
    }
`