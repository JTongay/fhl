import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.createTable("awards")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("name", "text", (col) => col.notNull().unique())
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute()

    await db.schema.createTable("award_season")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("award_id", "integer", (col) =>
            col.references("awards.id").onDelete("cascade").notNull()
        )
        .addColumn("winning_user_id", "integer", (col) =>
            col.references("users.id").onDelete("set null")
        )
        .addColumn("presenter_id", "integer", (col) =>
            col.references("users.id").onDelete("set null")
        )
        .addColumn("season_id", "integer", (col) =>
            col.references("seasons.id").onDelete("cascade").notNull()
        )
        .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("award_season").execute()
    await db.schema.dropTable("awards").execute()
}