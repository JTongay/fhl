'use client';

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {PropsWithChildren} from 'react';
import {ClerkProvider} from '@clerk/nextjs';
import {GraphQLProvider} from '@/app/graphQLProvider';

export function Providers({children}: PropsWithChildren) {
  const uri = process.env.NEXT_API_URL;
  console.log(uri, 'uri');
  const client = new ApolloClient({
    uri, // TODO use .env
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {

    },
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Accept-Encoding": "gzip, deflate, br"
    // }
  });
  return (
    <ClerkProvider
      publishableKey={'pk_test_dmFzdC1yYXR0bGVyLTc5LmNsZXJrLmFjY291bnRzLmRldiQ'}>
      <GraphQLProvider>
        {children}
      </GraphQLProvider>
    </ClerkProvider>
  // <ApolloProvider client={client}>
  //     {children}
  // </ApolloProvider>
  );
}
