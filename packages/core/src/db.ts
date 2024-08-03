import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely, ParseJSONResultsPlugin, Selectable } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import type { Database } from "./sql.generated";

export const fhlDb = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      secretArn: RDS.fhldb.secretArn,
      resourceArn: RDS.fhldb.clusterArn,
      database: RDS.fhldb.defaultDatabaseName,
      client: new RDSData({}),
    },
  }),
  plugins: [new ParseJSONResultsPlugin()],
});

export type Row = {
  [Key in keyof Database]: Selectable<Database[Key]>;
};

export * as DB from "./db";
