"use client";

import { useGetFhlTeamsSuspenseQuery } from "@/generated/gql/graphql";
import { Suspense } from "react";

export default function Teams() {
  const response = useGetFhlTeamsSuspenseQuery();
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <h1>Here is where the teams screen will go</h1>
      <h1>{response.data?.fhl?.league.name}</h1>
    </Suspense>
  );
}
