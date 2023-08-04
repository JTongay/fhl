import { ApolloServer } from '@apollo/server';
import {
    startServerAndCreateLambdaHandler,
    handlers,
} from '@as-integrations/aws-lambda';
import { UserSchema } from "packages/subgraphs/user/graphql/schema";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { Nullable } from "@/utils";
import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";

export interface Database {
    user: {
        id: number;
        gamertag: string;
        first_name: string;
        last_name: string;
        email: Nullable<string>;
        created_at: Date;
        updated_at: Date;
    }
}

export const db = new Kysely<Database>({
    dialect: new DataApiDialect({
        mode: "postgres",
        driver: {
            secretArn: RDS.db.secretArn,
            resourceArn: RDS.db.clusterArn,
            database: RDS.db.defaultDatabaseName,
            client: new RDSData({}),
        },
    }),
});


const resolvers = {
    Query: {
        user: async (id: string) => {
            return await db.selectFrom("user")
                .where("id", "=", +id)
                .selectAll()
                .executeTakeFirstOrThrow()
        }
    }
}

const server = new ApolloServer({
    schema: buildSubgraphSchema([
        { typeDefs: UserSchema, resolvers },
    ]),
    introspection: true,
    includeStacktraceInErrorResponses: true
});

export const handler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
);