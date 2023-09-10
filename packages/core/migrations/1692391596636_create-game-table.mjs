import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema
        .createTable("games")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("trailer", "varchar", (col) => col.notNull())
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();

    await db.schema.createType("console")
        .asEnum(["pc", "xbox", "ps5", "ps4", "switch"])
        .execute();

    await db.schema
        .createTable("consoles")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("name", "console", (col) => col.notNull())
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
    await db.schema.dropTable("games").ifExists().execute();
    await db.schema.dropTable("consoles").ifExists().execute();
    await db.schema.dropType("console").ifExists().execute();
}