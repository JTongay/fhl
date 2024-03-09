import { AwardDatasource } from "@/datasources/AwardDatasource";
import { MutationResolvers } from "@/graphql/resolvers/Mutation";
import { QueryResolvers } from "@/graphql/resolvers/Query";
import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import path from "path";
import { SeasonDatasource } from "./datasources/SeasonDatasource";
import { StorylineDatasource } from "./datasources/StorylineDatasource";
import { TeamDatasource } from "./datasources/TeamDatasource";
import { UserDatasource } from "./datasources/UserDatasource";
import { FHLContext } from "./domain/Context";
import { AwardResolvers } from "./graphql/resolvers/Award";
import { SeasonResolvers } from "./graphql/resolvers/Season";
import { Unions } from "./graphql/resolvers/Union";
import { UserResolvers } from "./graphql/resolvers/User";

function loadFHLSchema() {
  // TODO: For some reason this is looking inside of the .sst directory in the root of the project
  return loadSchemaSync(path.join(
    __dirname, "../", "../", "../", "../", "../", "../", "packages/fhl-api/src/graphql/schema/**/*.graphql"
  ),
    {
      loaders: [new GraphQLFileLoader()],
    });
}

const server = new ApolloServer<FHLContext>(
  {
    introspection: true,
    typeDefs: loadFHLSchema(),
    resolvers: {
      ...QueryResolvers,
      ...MutationResolvers,
      ...UserResolvers,
      ...SeasonResolvers,
      ...AwardResolvers,
      ...Unions,
    },
    includeStacktraceInErrorResponses: true,
    plugins: [],
  }
);

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
          storylineDatasource: new StorylineDatasource(),
          awardDatasource: new AwardDatasource(),
          teamDatasource: new TeamDatasource()
        },
      };
    },
  }
);
