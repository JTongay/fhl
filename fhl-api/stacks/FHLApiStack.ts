import { ServiceEndpointDefinition } from "@apollo/gateway";
import { handler } from "@/src/gateway";
import { Api, Stack, StackContext, use } from "sst/constructs";
import { FHLUserDB } from "../packages/subgraphs/user/db/userDb";


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
    const userApi = new Api(context.stack, "FHLUserApiSubgraph", {
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
        defaults: {
            function: {
                bind: [FHLUserDB(context)]
            }
        }
    });

    const gatewayServiceList: ApolloFederationGatewayProps = {
        serviceList: [{
            name: "User",
            url: `${userApi.url}/graphql`
        }]
    }

    const gateway = createApiGateway(gatewayServiceList, context.stack);

    context.stack.addOutputs({
        ApiEndpont: gateway.url,
        QueryMe: "Daddy"
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