import {
    startServerAndCreateLambdaHandler,
    handlers,
} from '@as-integrations/aws-lambda';
import { leagueSubgraphServer } from 'packages/subgraphs/league';

export const handler = startServerAndCreateLambdaHandler(
    leagueSubgraphServer,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
)