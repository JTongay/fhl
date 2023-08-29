import { graphql } from "@/generated/gql";

export const LOGIN_MUTATION = graphql(/* GraphQL */`
    mutation login() {
        token
    }
`)