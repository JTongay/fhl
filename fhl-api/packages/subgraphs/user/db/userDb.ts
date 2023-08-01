import { RDS, Stack, StackContext } from "sst/constructs";

export function FHLUserDB({stack}: StackContext) {
    return new RDS(stack, "userDB", {
        engine: "mysql5.7",
        defaultDatabaseName: "userDB",
        migrations: "packages/subgraphs/core/migrations",
    });

}