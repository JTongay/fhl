import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.createTable("titles")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("name", "text", (col) => col.notNull().unique())
        .addColumn("description", "text", (col) => col.notNull())
        .addColumn("league_id", "integer", (col) => col.references("leagues.id").onDelete("cascade").notNull())
        .addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();

    await db.schema.createTable("user_title")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("current", "boolean", (col) => col.notNull().defaultTo(true))
        .addColumn("user_id", "integer", (col) => col.references("users.id").onDelete("cascade").notNull())
        .addColumn("defeated_user_id", "integer", (col) =>
            col.references("users.id").onDelete("cascade")
        )
        .addColumn("title_id", "integer", (col) =>
            col.references("titles.id").onDelete("cascade").notNull()
        )
        .addColumn("event_id", "integer", (col) =>
            col.references("events.id").onDelete("cascade").notNull()
        )
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();

        // Ensure there is always a world champion
    await db.insertInto("titles")
        .values(({ selectFrom }) => ({
            name: "World Champion",
            description: "The champion of the league",
            league_id: selectFrom("leagues").where("name", "=", "FHL" ).select("id"),
        }))
        .returning("id")
        .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("user_title").ifExists().execute();
    await db.schema.dropTable("titles").ifExists().execute();
}