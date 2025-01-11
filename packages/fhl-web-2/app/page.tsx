"use client";

import { DashboardRanking } from "@/components/fhl/Card/DashboardRanking";
import { CurrentChampion } from "@/components/fhl/Card/CurrentChampion";
import { useDashboardQuery } from "@/generated/gql/graphql";
// import {useAuth} from '@clerk/nextjs';

export default function Home() {
  // throw new Error('Not implemented');
  const { data, loading, error } = useDashboardQuery();
  // const {isLoaded} = useAuth();

  if (loading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    throw error;
  }

  if (data) {
    return (
      <>
        <h1 className="text-2xl text-center pb-10">
          Welcome to {data.fhl.league.name}
        </h1>
        <div className="flex flex-row justify-center pb-8">
          <img className="w-1/2" src="/mlg-logo.png" alt="FHL Logo" />
        </div>
        <div className="pb-8">
          <CurrentChampion />
        </div>
        <div className="justify-content-center grid grid-cols-1 gap-3 lg:grid-cols-2">
          <DashboardRanking type="top" userRankings={data.fhl.topFiveRecords} />
          <DashboardRanking
            type="bottom"
            userRankings={data.fhl.bottomFiveRecords}
          />
        </div>
      </>
    );
  }
}
