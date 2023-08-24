import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema
        .createTable("platforms")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("store_link", "varchar", (col) => col.notNull())
        .addColumn("console", "console", (col) => col.notNull())
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
    await db.schema.dropTable("platforms").ifExists().execute();
}