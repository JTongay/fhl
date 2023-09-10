// import { StackContext, RDS, Config } from "sst/constructs";

// export function FHLDB({ stack }: StackContext) {
//     const fhlDb = new RDS(stack, "Cluster", {
//         engine: "postgresql11.16",
//         defaultDatabaseName: "fhlDb",
//         migrations: "packages/core/db/migrations"
//     });

//     stack.addOutputs({
//         SecretArn: fhlDb.secretArn,
//         ClusterArn: fhlDb.clusterArn,
//         DatabaseName: fhlDb.defaultDatabaseName
//     });

//     return fhlDb;
// }

// export interface Database {
//     users: {
//         id: number;
//         gamertag: string;
//         first_name: string;
//         last_name: string;
//         email: Nullable<string>;
//         created_at: Date;
//         updated_at: Date;
//     }
// }

// export const userDb = new Kysely<Database>({
//     dialect: new DataApiDialect({
//         mode: "postgres",
//         driver: {
//             secretArn: RDSType.db.secretArn,
//             resourceArn: RDSType.db.clusterArn,
//             database: RDSType.db.defaultDatabaseName,
//             client: new RDSData({}),
//         },
//     }),
// });