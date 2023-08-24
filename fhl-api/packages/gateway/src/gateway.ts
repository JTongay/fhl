import {
  ApolloGateway,
  ServiceEndpointDefinition,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';
import { ApolloServer, HeaderMap } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request }: any) {
    // Pass the user's id from the context to each subgraph
    // as a header called `user-id`
    request.http.headers.set('x-api-key', process.env.API_KEY);
  }
}


const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: JSON.parse(process.env.SERVICE_LIST!)
  }),
  buildService({ url }) {
    return new AuthenticatedDataSource({ url })
  },
});

const server = new ApolloServer({
  gateway,
  includeStacktraceInErrorResponses: true,
  introspection: true
});

console.log(process.env.SERVICE_LIST)

const withCors = handler => (req, res, ...args) => {
  // console.log(req)
  // if (!req.method) {
  //     req.method = "POST"
  //     req.httpMethod = "POST"
  // }
  if (req.method === 'OPTIONS' || req.httpMethod === "OPTIONS") {
    console.log("request method is OPTIONS??")
    // add required headers here
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    });
    // res.end()
  } else {
    return handler(req, res, ...args)
  }
}

export const handler = withCors(startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    middleware: [
      async (event) => {
        if (event.requestContext?.http.method === "OPTIONS") {
          console.log("😽")
        }
      }
    ]
  }
));
