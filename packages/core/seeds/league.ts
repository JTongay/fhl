import { fhlDb } from "../src/db";

export async function seedFHL() {
  return await fhlDb
    .insertInto("leagues")
    .values({
      name: "FHL",
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
