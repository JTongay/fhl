import { graphql } from "@/generated/gql";

export const GET_DASHBOARD = graphql(/* GraphQL */ `
  query Dashboard {
    fhl {
      __typename
      league {
        id
        name
        createdAt
        updatedAt
      }
      activeSeason {
        id
        isActive
        year
      }
      currentChampion {
        id
        fullName
        gamertag
      }
      # upcomingSeason {

      # }
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
`);
