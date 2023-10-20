import {ApolloServer} from "@apollo/server";
import {QueryResolvers} from "@/graphql/resolvers/Query";
import {MutationResolvers} from "@/graphql/resolvers/Mutation";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import {Unions} from "./graphql/resolvers/Union";
import {UserDatasource} from "./datasources/UserDatasource";
import {FHLContext} from "./domain/Context";
import {SeasonDatasource} from "./datasources/SeasonDatasource";
import {SeasonResolvers} from "./graphql/resolvers/Season";
import {StorylineDatasource} from "./datasources/StorylineDatasource";
import {loadSchemaSync} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";

function loadFHLSchema() {
  return loadSchemaSync("src/graphql/schema/**/*.graphql",
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
        ...SeasonResolvers,
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
          },
        };
      },
    }
);
