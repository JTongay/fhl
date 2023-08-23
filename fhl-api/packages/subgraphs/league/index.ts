import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { referenceResolverMap, resolverMap, typeResolverMap } from "@/graphql/resolvers/ResolverMap";
import { LeagueSchema } from "./graphql/schema";
import { UserExtensionResolver } from "./resolvers/reference/UserExtension.resolver";

const dataResolvers = resolverMap({});

const unionResolvers = typeResolverMap({});

const referenceResolvers = referenceResolverMap({
    User: new UserExtensionResolver()
});

const resolvers = {
    ...dataResolvers,
    ...unionResolvers,
    ...referenceResolvers
}

export const leagueSubgraphServer = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs: LeagueSchema,
        resolvers
    }),
    introspection: true,
    includeStacktraceInErrorResponses: true
})