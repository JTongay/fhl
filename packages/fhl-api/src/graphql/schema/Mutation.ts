import gql from "graphql-tag";

export const Mutation = gql`
    type Mutation {
        createUser(input: CreateUserInput!): UserResponse!
        updateUser(input: UpdateUserInput!): UserResponse!
    }
`