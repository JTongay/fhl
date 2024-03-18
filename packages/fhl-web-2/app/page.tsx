'use client';

import {Card, CardContent, CardTitle} from '@/components/ui/card';
import {GET_DASHBOARD} from '@/operations/queries/getDashboard';
import {useQuery} from '@apollo/client';
// import {useAuth} from '@clerk/nextjs';

export default function Home() {
  const {data, loading, error} = useQuery(GET_DASHBOARD);
  // const {isLoaded} = useAuth();


  if (loading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    throw error;
  }

  if (data) {
    return (<>
      <h1>Welcome to {data.fhl.league.name}</h1>
      <Card>
        <CardTitle>Top 5</CardTitle>
        <CardContent>
          <section>{data.fhl.topFiveRecords.map((user) => (
            <div key={user.id}>
              <h2>{user.gamertag}</h2>
              <p>Wins: {user.wins}</p>
              <p>Losses: {user.losses}</p>
            </div>
          ))}
          </section>
        </CardContent>
      </Card>
      <section>Bottom 5{data.fhl.bottomFiveRecords?.map((user) => (
        <div key={user.id}>
          <h2>{user.gamertag}</h2>
          <p>Wins: {user.wins}</p>
          <p>Losses: {user.losses}</p>
        </div>
      ))}
      </section>
    </>);
  }
}
