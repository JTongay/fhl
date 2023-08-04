import { StackContext, RDS } from "sst/constructs";

export function FHLUserDB({ stack }: StackContext) {
    return new RDS(stack, "Cluster", {
        engine: "postgresql11.16",
        defaultDatabaseName: "userDB",
        migrations: "packages/subgraphs/user/db/migrations"
    });
}
