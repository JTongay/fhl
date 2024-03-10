"use client"

import { GET_DASHBOARD } from '@/operations/queries/getDashboard';
import { useQuery } from "@apollo/client";
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { data, loading, error } = useQuery(GET_DASHBOARD)
  const {isLoaded, getToken, userId} = useAuth();


  if (loading) {
    return <h1>{loading}</h1>
  }

  if (error) {
    throw error;
  }

  if (data && isLoaded) {
    return (<>
      <h1>Welcome to {data.fhl.league.name}</h1>
      <section>Top 5{data.fhl.topFiveRecords.map((user) => (
        <div key={user.id}>
          <h2>{user.gamertag}</h2>
          <p>Wins: {user.wins}</p>
          <p>Losses: {user.losses}</p>  
        </div>
      ))}
      </section>
      <section>Bottom 5{data.fhl.bottomFiveRecords.map((user) => (
        <div key={user.id}>
          <h2>{user.gamertag}</h2>
          <p>Wins: {user.wins}</p>
          <p>Losses: {user.losses}</p>  
        </div>
      ))}
      </section>
    </>)
  }
}
