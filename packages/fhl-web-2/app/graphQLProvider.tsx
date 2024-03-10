import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {PropsWithChildren, useEffect, useState} from "react";
import {useAuthLink} from "@/hooks/useAuthLink";

const httpLink = createHttpLink({
    uri: process.env.NEXT_API_URL || "https://mgcw9zeioj.execute-api.us-east-1.amazonaws.com/graphql"
});

export function GraphQLProvider({children}: PropsWithChildren) {
    const authLink = useAuthLink();
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    })
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

