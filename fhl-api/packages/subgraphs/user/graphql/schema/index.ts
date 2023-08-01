import gql from "graphql-tag";

export const UserSchema = gql`
    type User @key(fields: "id") {
        id: ID!
        gamertag: String!
        firstName: String!
        lastName: String!
        fullName: String!
        email: String! # TODO create an email scalar here
        avatar: String!
    }

    type Query @extends {
        user(id: ID!): UserResponse!
    }

    type ApiError @key(fields: "code") @interfaceObject {
        code: Int!
        stacktrace: String
    }

    union UserResponse = User | ApiError
`