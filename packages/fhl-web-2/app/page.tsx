'use client';

import {Card, CardContent, CardTitle} from '@/components/ui/card';
import {GET_DASHBOARD} from '@/operations/queries/getDashboard';
import {useQuery} from '@apollo/client';
// import {useAuth} from '@clerk/nextjs';

export default function Home() {
  // throw new Error('Not implemented');
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
      <img src="/mlg-logo.png" alt="FHL Logo" />
      <h1>Welcome to {data.fhl.league.name}</h1>
      <h2>Current Champion: {data.fhl.currentChampion?.gamertag && 'not found'}</h2>
      <div className="flex flex-row justify-center items-center">
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
        <Card>
          <CardTitle>Bottom 5</CardTitle>
          <CardContent>
            <section>{data.fhl.bottomFiveRecords?.map((user) => (
              <div key={user.id}>
                <h2>{user.gamertag}</h2>
                <p>Wins: {user.wins}</p>
                <p>Losses: {user.losses}</p>
              </div>
            ))}
            </section>
          </CardContent>
        </Card>
      </div>
    </>);
  }
}
