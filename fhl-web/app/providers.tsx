'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
    console.log(process.env)
    const client = new ApolloClient({
        uri: "https://1wzhym0cy5.execute-api.us-east-1.amazonaws.com/graphql", // TODO use .env
        cache: new InMemoryCache(),
        connectToDevTools: true,
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Accept-Encoding": "gzip, deflate, br"
        // }
    })
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}