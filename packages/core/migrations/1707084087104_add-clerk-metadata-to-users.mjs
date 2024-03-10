import {Kysely, sql} from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.alterTable("users")
        .addColumn("idp_id", "uuid", (t) => t.unique())
        .addColumn("avatar_url", "text")
        .addColumn("last_sign_in_at", "timestamp", (t) => t.defaultTo(sql`now()`))
        .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.alterTable("users")
        .dropColumn("idp_id")
        .dropColumn("avatar_url")
        .dropColumn("last_sign_in_at")
        .execute()
}
