import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { referenceResolverMap, resolverMap, typeResolverMap } from "@/graphql/resolvers/ResolverMap";
import { LeagueSchema } from "./graphql/schema";
import { UserExtensionResolver } from "./resolvers/reference/UserExtension.resolver";
import { LeagueApiErrorResolver } from "./resolvers/reference/LeagueApiError.resolver";
import { LeagueResolver } from "./resolvers/League.resolver";
import { LeagueResponseResolver } from "./resolvers/union/LeagueResponse.resolver";
import { SeasonResolver } from "./resolvers/Season.resolver";
import { SeasonsResolver } from "./resolvers/Seasons.resolver";
import { SeasonResponseResolver } from "./resolvers/union/SeasonResponse.resolver";
import { SeasonsResponseResolver } from "./resolvers/union/SeasonsResponse.resolver";

const dataResolvers = resolverMap({
    Query: {
        league: new LeagueResolver(),
        season: new SeasonResolver(),
        seasons: new SeasonsResolver()
    }
});

const unionResolvers = typeResolverMap({
    LeagueResponse: new LeagueResponseResolver(),
    SeasonResponse: new SeasonResponseResolver(),
    SeasonsResponse: new SeasonsResponseResolver()
});

const referenceResolvers = referenceResolverMap({
    User: new UserExtensionResolver(),
    ApiError: new LeagueApiErrorResolver()
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