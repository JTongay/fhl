import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema
        .createTable("users")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("gamertag", "varchar", (col) => col.unique().notNull())
        .addColumn("first_name", "varchar", (col) => col.notNull())
        .addColumn("last_name", "varchar", (col) => col.notNull())
        .addColumn("email", "varchar", (col) => col.unique())
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("users").ifExists().execute();
}