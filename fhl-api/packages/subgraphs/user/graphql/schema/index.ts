import gql from "graphql-tag";

export const UserSchema = gql`
    schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@provides", "@external", "@tag", "@extends", "@override", "@inaccessible"]) {query: Query}
    scalar Date
    
    type User @key(fields: "id") {
        id: ID!
        gamertag: String!
        firstName: String!
        lastName: String!
        fullName: String!
        email: String! # TODO create an email scalar here
        avatar: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query @extends {
        user(id: ID!): UserResponse!
        users(limit: Int, offset: Int): UsersResponse!
    }

    type Mutation @extends {
        createUser(input: CreateUserInput!): UserResponse!
        updateUser(input: UpdateUserInput!): UserResponse!
    }

    type ApiError @key(fields: "code") {
        code: Int!
        stacktrace: String
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        gamertag: String!
        email: String!
    }

    input UpdateUserInput {
        userId: ID!
        firstName: String!
        lastName: String!
        gamertag: String!
        email: String!
    }

    union UserResponse = User | ApiError

    interface PaginatedResponse {
        offset: Int!
        limit: Int!
        total: Int!
    }

    type UsersList implements PaginatedResponse {
        offset: Int!
        limit: Int!
        total: Int!
        data: [User!]!
    }

    union UsersResponse = UsersList | ApiError
`