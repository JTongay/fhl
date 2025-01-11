import { fhlDb } from "../src/db";

export async function seedCheck() {
  const result = await fhlDb
    .selectFrom("leagues")
    .where("name", "=", "FHL")
    .select("id")
    .executeTakeFirst();

  return !!result;
}
