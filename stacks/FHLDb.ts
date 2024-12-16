import { Function, RDS, StackContext } from "sst/constructs";

export function FHLDB({ stack }: StackContext) {
  const rds = new RDS(stack, "fhldb", {
    engine: "postgresql11.16",
    defaultDatabaseName: "fhlDb",
    migrations: "packages/core/migrations",
    types: {
      path: "packages/core/src/sql.generated.ts",
    },
  });

  new Function(stack, "seeder", {
    handler: "packages/core/src/seeder.handler",
    bind: [rds],
  });

  new Function(stack, "rollbackSeeder", {
    handler: "packages/core/src/rollbackSeeder.handler",
    bind: [rds],
  });

  return rds;
}
