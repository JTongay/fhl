import {
    startServerAndCreateLambdaHandler,
    handlers,
} from '@as-integrations/aws-lambda';
import { gameSubgraphServer } from 'packages/subgraphs/game';

export const handler = startServerAndCreateLambdaHandler(
    gameSubgraphServer,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
)