import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.alterTable("users")
        .addColumn("league_id", "integer", (col) =>
            col.references("leagues.id").onDelete('cascade').notNull()
        )
        .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.alterTable("users")
        .dropColumn("league_id")
        .execute();
}