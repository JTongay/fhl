import { Nullable } from "@/utils";
import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { FHLDB } from "@/db/fhlDb";
import { UserTable } from "packages/subgraphs/user/domain/user";
import { RDS } from "sst/node/rds";
import { Config } from "sst/node/config";
import { GameTable } from "packages/subgraphs/game/domain/game";

export interface Database {
    users: UserTable;
    games: GameTable;
}

export const logRDSConfig = () => console.log(RDS, "RDS ME DADDY");

export const db = new Kysely<Database>({
    dialect: new DataApiDialect({
        mode: "postgres",
        driver: {
            secretArn: 'arn:aws:secretsmanager:us-east-1:568724964213:secret:ClusterSecret26E15F5B-2qpoUfaDZ0ym-imAEeu',
            resourceArn: 'arn:aws:rds:us-east-1:568724964213:cluster:dev-fhl-api-cluster',
            database: 'fhlDb',
            client: new RDSData({}),
        },
    }),
});
