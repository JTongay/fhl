import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.alterTable("seasons")
        .addColumn("start_date", "date", (col) => col.notNull())
        .addColumn("end_date", "date", (col) => col.notNull())
        .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.alterTable("seasons")
        .dropColumn("start_date")
        .dropColumn("end_date")
        .execute();
}
