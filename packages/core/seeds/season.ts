import { Kysely } from "kysely";
import { Database } from "../src/sql.generated";

export async function seedSeasons(db: Kysely<Database>) {
    // Seed seasons
    // Seed active seasons
    await db.insertInto("seasons").values(({selectFrom}) => ({
        is_active: true,
        year: 2024,
        league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
    }))
    .execute();
}

export async function rollbackSeasons(db: Kysely<Database>) {
    await db.deleteFrom("seasons").execute();
}