import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema
        .createTable("leagues")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("name", "varchar", (col) => col.unique().notNull())
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute()

    await db.schema
        .createTable("seasons")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("year", "integer", (col) => col.notNull())
        .addColumn("is_active", "boolean", (col) => col.notNull().defaultTo("false"))
        .addColumn("league_id", 'integer', (col) =>
            col.references("leagues.id").onDelete('cascade').notNull()
        )
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute()

    await db.schema
        .createTable("events")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("name", "varchar", (col) => col.notNull().unique())
        .addColumn("is_active", "boolean", (col) => col.notNull().defaultTo(false))
        .addColumn("league_id", 'integer', (col) =>
            col.references("leagues.id").onDelete('cascade').notNull()
        )
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute()

    await db.schema
        .createTable("teams")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("name", "varchar", (col) => col.notNull().unique())
        .addColumn("wins", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("losses", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute()

    // Always make sure that FHL exists
    await db.insertInto("leagues").values({ name: "FHL" }).execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("teams").ifExists().execute();
    await db.schema.dropTable("events").ifExists().execute();
    await db.schema.dropTable("seasons").ifExists().execute();
    await db.schema.dropTable("leagues").ifExists().execute();
}
