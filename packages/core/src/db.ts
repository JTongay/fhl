import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";

console.log(RDS, "RDS ME DADDY")

export const fhlDb = new Kysely<any>({
    dialect: new DataApiDialect({
        mode: "postgres",
        driver: {
            secretArn: RDS.fhldb.secretArn,
            resourceArn: RDS.fhldb.clusterArn,
            database: RDS.fhldb.defaultDatabaseName,
            client: new RDSData({})
        }
    })
});

// export type Row = {
//     [Key in keyof Database]: Selectable<Database[Key]>;
// };

export * as DB from "./db"