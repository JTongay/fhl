import {
    startServerAndCreateLambdaHandler,
    handlers,
} from '@as-integrations/aws-lambda';
// import { Nullable } from "@/utils";
// import { RDSData } from "@aws-sdk/client-rds-data";
// import { Kysely } from "kysely";
// import { DataApiDialect } from "kysely-data-api";
// import { RDS } from "sst/node/rds";
import { userSubgraphServer } from 'packages/subgraphs/user';
import { db } from '@/db';

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

// export const db = new Kysely<Database>({
//     dialect: new DataApiDialect({
//         mode: "postgres",
//         driver: {
//             secretArn: RDS.db.secretArn,
//             resourceArn: RDS.db.clusterArn,
//             database: RDS.db.defaultDatabaseName,
//             client: new RDSData({}),
//         },
//     }),
// });


// const resolvers = {
//     Query: {
//         user: async (id: string) => {
//             return await userDb.selectFrom("user")
//                 .where("id", "=", +id)
//                 .selectAll()
//                 .executeTakeFirstOrThrow()
//         }
//     }
// }

// const server = new ApolloServer({
//     schema: buildSubgraphSchema([
//         { typeDefs: UserSchema, resolvers },
//     ]),
//     introspection: true,
//     includeStacktraceInErrorResponses: true
// });

export const handler = startServerAndCreateLambdaHandler(
    userSubgraphServer,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
);