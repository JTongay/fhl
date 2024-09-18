import { graphql } from "@/generated/gql";
import { gql } from "@apollo/client";

export const GET_DASHBOARD = gql`
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
        firstName
        lastName
        fullName
        gamertag
        wins
        losses
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
`;
