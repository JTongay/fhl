import { RDS, StackContext } from "sst/constructs";

export function FHLDB({ stack }: StackContext) {
    const rds = new RDS(stack, "fhldb", {
        engine: "postgresql11.16",
        defaultDatabaseName: "fhlDb",
        migrations: "packages/core/migrations",
        types: {
            path: "packages/core/src/sql.generated.ts"
        }
    })
    return rds;
}