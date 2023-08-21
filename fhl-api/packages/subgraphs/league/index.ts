import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { resolverMap, typeResolverMap } from "@/graphql/resolvers/ResolverMap";
import { LeagueSchema } from "./graphql/schema";

const dataResolvers = resolverMap({});

const unionResolvers = typeResolverMap({});

const resolvers = {
    ...dataResolvers,
    ...unionResolvers,
    User: {
        __resolveReference(user, param) {
            console.log(user, "user");
            console.log(param, "param")
            return {
                id: user.id.toString(),
                wins: 1
            }
        },
    }
}

export const leagueSubgraphServer = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs: LeagueSchema,
        resolvers
    }),
    introspection: true,
    includeStacktraceInErrorResponses: true
})