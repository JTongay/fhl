'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";
import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {GraphQLProvider} from "@/app/graphQLProvider";

export function Providers({ children }: PropsWithChildren) {
    const client = new ApolloClient({
        uri: process.env.NEXT_API_URL || "https://mgcw9zeioj.execute-api.us-east-1.amazonaws.com/graphql",
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {

        }
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Accept-Encoding": "gzip, deflate, br"
        // }
    })
    return (
        <ClerkProvider>
            <GraphQLProvider>
                {children}
            </GraphQLProvider>
        </ClerkProvider>
        // <ApolloProvider client={client}>
        //     {children}
        // </ApolloProvider>
    )
}
