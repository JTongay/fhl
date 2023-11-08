import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.createTable("storylines")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("description", "text", (col) => col.notNull().unique())
        .addColumn("season_id", "integer", (col) =>
            col.references("seasons.id").onDelete("cascade").notNull()
        )
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute()

    await db.schema.createTable("user_storyline")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("user_id", "integer", (col) =>
            col.references("users.id").onDelete("cascade").notNull()
        )
        .addColumn("storyline_id", "integer", (col) =>
            col.references("storylines.id").onDelete("cascade").notNull()
        )
        .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("user_storyline").ifExists().execute();
    await db.schema.dropTable("storylines").ifExists().execute();
}
