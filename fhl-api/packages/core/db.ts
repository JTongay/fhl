import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import { Database } from "./db/types";

export const db = new Kysely<Database>({
    dialect: new DataApiDialect({
        mode: "postgres",
        driver: {
            secretArn: RDS.Cluster.secretArn,
            resourceArn: RDS.Cluster.clusterArn,
            database: RDS.Cluster.defaultDatabaseName,
            client: new RDSData({}),
        },
    }),
});
