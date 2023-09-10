import { ApolloServer } from '@apollo/server';
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';
import { Query } from "@/graphql/schema/query"
import { buildSubgraphSchema } from "@apollo/subgraph"

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    booyah: () => 'Howdy',
    howdy: () => "HOWDY HOWDY HOWDY"
  },
};

// Set up Apollo Server
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs: Query, resolvers }]),
  introspection: true,
  includeStacktraceInErrorResponses: true
})

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);