import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("schedules")
    .addColumn("id", "serial", (col) => col.primaryKey().notNull())
    .addColumn("start_at", "date", (col) => col.notNull())
    .addColumn("end_at", "date", (col) => col.notNull())
    .addColumn("date_chosen_at", "date")
    .addColumn("event_id", "integer", (col) =>
      col.references("events.id").notNull().onDelete("cascade"),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createType("available")
    .asEnum(["AVAILABLE", "PREFERRED", "UNAVAILABLE", "UNKNOWN"])
    .execute();

  await db.schema
    .createTable("user_schedule_availability")
    .addColumn("user_id", "integer", (col) =>
      col.references("users.id").notNull().onDelete("cascade"),
    )
    .addColumn("schedule_id", "integer", (col) =>
      col.references("schedules.id").notNull().onDelete("cascade"),
    )
    .addColumn("available", "available", (col) =>
      col.defaultTo("UNKNOWN").notNull(),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("schedule").ifExists().execute();
  await db.schema.dropType("available").execute();
  await db.schema.dropTable("user_schedule_available").ifExists().execute();
}
