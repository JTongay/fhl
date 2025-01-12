import { fhlDb } from "../src/db";

export async function seedFHL() {
  const fhl = await fhlDb
    .selectFrom("leagues")
    .where("name", "=", "FHL")
    .select("id")
    .executeTakeFirst();

  if (fhl) {
    return fhl;
  }
  return await fhlDb
    .insertInto("leagues")
    .values({
      name: "FHL",
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
