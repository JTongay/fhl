import { Api, NextjsSite, StackContext, use } from "sst/constructs";
import { FHLApi } from "./FHLApi.js";

export function FHLWeb({ stack }: StackContext) {
    const api = use<Api>(FHLApi);

    const nextApp = new NextjsSite(stack, "FHLWeb", {
        path: "packages/fhl-web",
        bind: [api],
        buildCommand: "pnpm run build",
        environment: {
            NEXT_API_URL: `${api.url}/graphql`
        },
    });

    stack.addOutputs({
        WebURL: nextApp.url
    })
}