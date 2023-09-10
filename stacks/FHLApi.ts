import { Api, RDS, Stack, StackContext, use } from "sst/constructs";
import { ApolloFederationGatewayProps } from "../packages/fhl-api/stacks/FHLApiStack";
import { FHLDB } from "./FHLDb.js";

interface Subgraph {
    functionPath: string;
    id: string;
}

function createApiGateway(props: ApolloFederationGatewayProps, stack: Stack, db: RDS) {
    return new Api(stack, "FHLGateway", {
        defaults: {
            function: {
                environment: {
                    SERVICE_LIST: JSON.stringify(props.serviceList)
                },
                bind: [use(FHLDB)]
            }
        },
        routes: {
            "POST /graphql": {
                type: "graphql",
                function: "packages/fhl-api/packages/gateway/src/gateway.handler"
            }
        },
        cors: {
            allowMethods: ["ANY"],
            allowHeaders: ["*"],
            allowOrigins: ["*"],

        }
    })
}

function createSubgraph(stack: Stack, id: string, functionPath: string, db: RDS): Api {
    return new Api(stack, id, {
        routes: {
            "POST /graphql": {
                type: "graphql",
                function: functionPath
            }
        },
        cors: {
            allowMethods: ["OPTIONS", "GET", "POST"],
            allowHeaders: [""],
            allowOrigins: ["*"],
        },
        defaults: {
            function: {
                bind: [use(FHLDB)]
            }
        }
    })
}

export function FHLApi({ stack }: StackContext) {
    const db = use(FHLDB);
    const baseApi = createSubgraph(
        stack,
        "FHLBaseApiSubgraph",
        "packages/fhl-api/packages/functions/src/lambda.handler",
        db
    );
    const userApi = createSubgraph(
        stack,
        "FHLUserSubgraph",
        "packages/fhl-api/packages/functions/src/userSubgraph.handler",
        db
    );
    const gameApi = createSubgraph(
        stack,
        "FHLGameSubgraph",
        "packages/fhl-api/packages/functions/src/gameSubgraph.handler",
        db
    );
    const leagueApi = createSubgraph(
        stack,
        "FHLLeagueSubgraph",
        "packages/fhl-api/packages/functions/src/leagueSubgraph.handler",
        db
    )

    const gateway = createApiGateway({
        serviceList: [
            {
                name: "Base",
                url: `${baseApi.url}/graphql`
            },
            {
                name: "User",
                url: `${userApi.url}/graphql`
            },
            {
                name: "Game",
                url: `${gameApi.url}/graphql`
            },
            {
                name: "League",
                url: `${leagueApi.url}/graphql`
            }
        ]
    }, stack, db);

    stack.addOutputs({
        GatewayEndpoint: gateway.url,
    })

    return gateway

    // TODO Implement Auth
    // const auth = new Auth(stack, "FHLAuth", {
    //     authenticator: {
    //         handler: "packages/functions/src/auth.handler"
    //     }
    // });

    // auth.attach(stack, {
    //     api,
    //     prefix: "/auth"
    // });
}