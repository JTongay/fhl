import { logRDSConfig } from "@/db";
import { ServiceEndpointDefinition } from "@apollo/gateway";
// import { handler } from "@/src/gateway";
import { Api, RDS, Stack, StackContext } from "sst/constructs";
// import { FHLUserDB } from "../packages/subgraphs/user/db/userDb";


interface ApolloFederationGatewayProps {
    serviceList: ServiceEndpointDefinition[]
}

function createApiGateway(props: ApolloFederationGatewayProps, stack: Stack): Api {
    return new Api(stack, "FHLGateway", {
        defaults: {
            function: {
                environment: {
                    SERVICE_LIST: JSON.stringify(props.serviceList)
                }
            }
        },
        routes: {
            $default: {
                type: "graphql",
                function: "packages/gateway/src/gateway.handler"
            }
        },
        cors: {
            allowMethods: ["OPTIONS", "GET", "POST"],
            allowHeaders: ["*"],
            allowOrigins: ["*"],
        },
    })
}

export function FHLApiStack(context: StackContext) {
    const fhlDb = new RDS(context.stack, "Cluster", {
        engine: "postgresql11.16",
        defaultDatabaseName: "fhlDb",
        migrations: "packages/core/db/migrations"
    });

    const baseApi = new Api(context.stack, "FHLBaseApiSubgraph", {
        routes: {
            $default: {
                type: "graphql",
                function: "packages/functions/src/lambda.handler",
            }
        },
        cors: {
            allowMethods: ["OPTIONS", "GET", "POST"],
            allowHeaders: [""],
            allowOrigins: ["*"],
        },
    });

    const userApi = new Api(context.stack, "FHLUserSubgraph", {
        routes: {
            $default: {
                type: "graphql",
                function: "packages/functions/src/userSubgraph.handler"
            }
        },
        cors: {
            allowMethods: ["OPTIONS", "GET", "POST"],
            allowHeaders: [""],
            allowOrigins: ["*"],
        },
        defaults: {
            function: {
                bind: [fhlDb]
            }
        }
    });

    const gameApi = new Api(context.stack, "FHLGameSubgraph", {
        routes: {
            $default: {
                type: "graphql",
                function: "packages/functions/src/gameSubgraph.handler"
            }
        },
        cors: {
            allowMethods: ["OPTIONS", "GET", "POST"],
            allowHeaders: [""],
            allowOrigins: ["*"],
        },
        defaults: {
            function: {
                bind: [fhlDb]
            }
        }
    });

    const leagueApi = new Api(context.stack, "FHLLeagueSubgraph", {
        routes: {
            $default: {
                type: "graphql",
                function: "packages/functions/src/leagueSubgraph.handler"
            }
        },
        cors: {
            allowMethods: ["OPTIONS", "GET", "POST"],
            allowHeaders: [""],
            allowOrigins: ["*"],
        },
        defaults: {
            function: {
                bind: [fhlDb]
            }
        }
    });

    const gatewayServiceList: ApolloFederationGatewayProps = {
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
    }

    const gateway = createApiGateway(gatewayServiceList, context.stack);

    logRDSConfig();

    context.stack.addOutputs({
        ApiEndpont: gateway.url,
        QueryMe: "Daddy",
        SecretArn: fhlDb.secretArn,
        ClusterArn: fhlDb.clusterArn,
        DBName: fhlDb.defaultDatabaseName,
        DBUrlHostName: fhlDb.clusterEndpoint.hostname,
        DBUrlHostPort: fhlDb.clusterEndpoint.port.toLocaleString(),
        DBUrlSocketAddress: fhlDb.clusterEndpoint.socketAddress,
    });

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