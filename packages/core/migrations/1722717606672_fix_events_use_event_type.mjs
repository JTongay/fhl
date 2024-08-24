import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.alterTable("events")
    .addColumn("start_at", "datetime")
    .addColumn("season_id", "integer", (col) => col.references("seasons.id").onDelete("cascade"))
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.alterTable("events").dropColumn("start_at").dropColumn("season_id").execute()
}
