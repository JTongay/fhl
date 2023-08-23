import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { referenceResolverMap, resolverMap, typeResolverMap } from "@/graphql/resolvers/ResolverMap";
import { GameSchema } from "./graphql/schema";
import { GameResolver } from "./resolvers/Game.resolver";
import { GameResponseResolver } from "./resolvers/unions/GameResponse.resolver";
import { GamesResolver } from "./resolvers/Games.resolver";
import { GamesResponseResolver } from "./resolvers/unions/GamesResponse.resolver";
import { GameApiErrorResolver } from "./resolvers/reference/GameApiError.resolver";
import { SeasonExtensionResolver } from "./resolvers/reference/SeasonExtension.resolver";

const dataResolvers = resolverMap({
    Query: {
        game: new GameResolver(),
        games: new GamesResolver()
    },
    Season: {
        games: new GamesResolver()
    }
});

const unionResolvers = typeResolverMap({
    GameResponse: new GameResponseResolver(),
    GamesResponse: new GamesResponseResolver()
});

const referenceResolvers = referenceResolverMap({
    ApiError: new GameApiErrorResolver(),
    Season: new SeasonExtensionResolver()
});

const resolvers = {
    ...dataResolvers,
    ...unionResolvers,
    ...referenceResolvers
}

export const gameSubgraphServer = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs: GameSchema,
        resolvers
    }),
    introspection: true,
    includeStacktraceInErrorResponses: true
})