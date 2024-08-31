import { DashboardQuery } from "@/generated/gql/graphql";

export type DashboardUserRanks =
  | DashboardQuery["fhl"]["topFiveRecords"]
  | DashboardQuery["fhl"]["bottomFiveRecords"];
