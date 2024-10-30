"use client";

import { useGetFhlTeamsQuery } from "@/generated/gql/graphql";
import Link from "next/link";

export default function Teams() {
  const { data, loading, error } = useGetFhlTeamsQuery();
  // const [response] = useMutation(createTeam);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error(error);
    throw error;
  }

  if (data) {
    return (
      <>
        <h1>Here is where the teams screen will go</h1>
        <h1>{data.fhl.league.name}</h1>

        <div className="flex flex-col justify-center">
          {data.fhl.league.teams.map((team) => (
            <div key={team.id}>
              <p>{team.name}</p>
              <p>Wins: {team.wins}</p>
              <p>Losses: {team.losses}</p>
            </div>
          ))}
        </div>
        <Link href="/teams/new">
          <button>Go to new Team Form</button>
        </Link>
      </>
    );
  }
}
