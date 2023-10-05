import { ApolloServer, BaseContext } from "@apollo/server";
import { Query } from "@/graphql/schema/Query";
import { Mutation } from "@/graphql/schema/Mutation";
import { QueryResolvers } from "@/graphql/resolvers/Query";
import { MutationResolvers } from "@/graphql/resolvers/Mutation";
import {
    startServerAndCreateLambdaHandler,
    handlers,
} from '@as-integrations/aws-lambda';
import { User } from "./graphql/schema/User";
import { Game } from "./graphql/schema/Game";
import { League } from "./graphql/schema/League";
import { Enums } from "./graphql/schema/Enum";
import { Interface } from "./graphql/schema/Interface";
import { Unions } from "./graphql/resolvers/Union";
import { UserDatasource } from "./datasources/UserDatasource";
import { FHLContext } from "./domain/Context";
import { Season } from "./graphql/schema/Season";
import { SeasonDatasource } from "./datasources/SeasonDatasource";
import { SeasonResolvers } from "./graphql/resolvers/Season";
import { StorylineDatasource } from "./datasources/StorylineDatasource";

const server = new ApolloServer<FHLContext>(
    {
        introspection: true,
        typeDefs: [Query, Mutation, User, Game, League, Season, Enums, Interface],
        resolvers: {
            ...QueryResolvers,
            ...MutationResolvers,
            ...SeasonResolvers,
            ...Unions
        },
        includeStacktraceInErrorResponses: true,
        plugins: [],
    }
)

export const handler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
    {
        context: async (request) => {
            return {
                authToken: request.event.headers["Authorization"] || null,
                datasources: {
                    userDatasource: new UserDatasource(),
                    seasonDatasource: new SeasonDatasource(),
                    storylineDatasource: new StorylineDatasource()
                }
            }
        }
    }
)