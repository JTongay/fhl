import { fhlDb } from "../src/db";

export async function seedSeasons() {
  // Seed seasons
  // Seed active seasons
  await fhlDb
    .insertInto("seasons")
    .values(({ selectFrom }) => ({
      is_active: true,
      year: 2024,
      league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
    }))
    .execute();
}

export async function rollbackSeasons() {
  await fhlDb.deleteFrom("seasons").execute();
}
