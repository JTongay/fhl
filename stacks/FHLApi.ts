import { Api, StackContext, use } from "sst/constructs";
import { FHLDB } from "./FHLDb.js";

export function FHLApi({ stack }: StackContext) {
    const api = new Api(stack, "FHLApiMono", {
        defaults: {
            function: {
                bind: [use(FHLDB)]
            }
        },
        routes: {
            "POST /graphql": {
                type: "graphql",
                function: {
                    handler: "packages/fhl-api/src/index.handler"
                }
            }
        }
    })

    stack.addOutputs({
        Endpoint: api.url
    });

    return api;
}