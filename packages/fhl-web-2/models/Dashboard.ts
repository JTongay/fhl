import { DashboardQuery } from "@/generated/gql/graphql";

export type Dashboard = DashboardQuery["fhl"];

export type DashboardUserRanks =
  | Dashboard["topFiveRecords"]
  | Dashboard["bottomFiveRecords"];
