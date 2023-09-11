import { Api, NextjsSite, RDS, StackContext, use } from "sst/constructs";
import { FHLApi } from "./FHLApi.js";
import { FHLDB } from "./FHLDb.js";

export function FHLWeb({ stack }: StackContext) {
    const api = use<Api>(FHLApi);
    const db = use<RDS>(FHLDB);

    const nextApp = new NextjsSite(stack, "FHLWeb", {
        path: "packages/fhl-web",
        environment: {
            NEXT_API_URL: `${api.url}/graphql`
        },
    });

    stack.addOutputs({
        WebURL: nextApp.url
    });

    return nextApp;
}