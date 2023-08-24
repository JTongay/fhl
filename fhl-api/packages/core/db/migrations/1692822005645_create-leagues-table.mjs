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
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("leagues").ifExists().dropTable();
    await db.schema.dropTable("seasons").ifExists().dropTable();
    await db.schema.dropTable("events").ifExists().dropTable();
    await db.schema.dropTable("teams").ifExists().dropTable();
}