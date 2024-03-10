import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.alterTable("users")
        .addColumn("wins", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("losses", "integer", (col) => col.notNull().defaultTo(0))
        .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.alterTable("users")
        .dropColumn("wins")
        .dropColumn("losses")
        .execute();
}