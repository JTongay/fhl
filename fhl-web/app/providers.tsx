'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
    const client = new ApolloClient({
        uri: process.env.API_PROD, // TODO use .env
        cache: new InMemoryCache()
    })
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}