import { graphql } from "@/generated/gql";

export const GET_DASHBOARD = graphql(/* GraphQL */`
    query GetDashboard($limit: Int!, $offset: Int!) {
        fhl {
            __typename
            league {
                id
                name
            }
            activeSeason {
                id
                year
                isActive
            }
            upcomingSeason {
                id
                year
            }
            currentChampion {
                id
                gamertag
            }
            topFiveRecords {
                id
                gamertag
                wins
                losses
            }
            bottomFiveRecords {
                id
                gamertag
                wins
                losses
            }
        }
    }
`)