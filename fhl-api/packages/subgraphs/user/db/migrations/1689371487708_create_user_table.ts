import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db: Kysely<any>) {
    await db.schema
        .createTable("user")
        .addColumn("id", "integer", (col) => col.primaryKey().notNull())
        .addColumn("gamertag", "varchar", (col) => col.unique().notNull())
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
}