import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    await db.schema.createTable("team_season")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("team_id", "integer", (col) =>
            col.references("teams.id").onDelete("cascade").notNull()
        )
        .addColumn("season_id", "integer", (col) =>
            col.references("seasons.id").onDelete("cascade").notNull()
        )
        .addColumn("captain_id", "integer", (col) =>
            col.references("users.id").onDelete("cascade").notNull()
        )
        .addColumn("wins", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("losses", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();

    await db.schema.createTable("user_team_season")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("player_id", "integer", (col) =>
            col.references("users.id").onDelete("cascade").notNull()
        )
        .addColumn("team_id", "integer", (col) =>
            col.references("teams.id").onDelete("cascade").notNull()
        )
        .addColumn("season_id", "integer", (col) =>
            col.references("seasons.id").onDelete("cascade").notNull()
        )
        .addColumn("created_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.notNull().defaultTo(sql`now()`)
        )
        .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("team_season").ifExists().execute();
    await db.schema.dropTable("user_team_season").ifExists().execute();

}