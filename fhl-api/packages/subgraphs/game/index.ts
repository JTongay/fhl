import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { resolverMap, typeResolverMap } from "@/graphql/resolvers/ResolverMap";
import { GameSchema } from "./graphql/schema";

const dataResolvers = resolverMap({});

const unionResolvers = typeResolverMap({});

const resolvers = {
    ...dataResolvers,
    ...unionResolvers
}

export const gameSubgraphServer = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs: GameSchema,
        resolvers
    }),
    introspection: true,
    includeStacktraceInErrorResponses: true
})