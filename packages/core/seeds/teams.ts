import { fhlDb } from "../src/db";

type DummyTeam = {
  name: string;
};

const dummyTeams: DummyTeam[] = [
  {
    name: "Cheddar Mafia",
  },
  {
    name: "Texas Bangers",
  },
];

export async function seedTeams(fhlId: number) {
  return await fhlDb.transaction().execute(async (trx) => {
    const response = [];

    for (const team of dummyTeams) {
      const result = await trx
        .insertInto("teams")
        .values({
          name: team.name,
          league_id: fhlId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      response.push(result);
    }

    return response;
  });
}

export async function rollbackTeams() {
  return await fhlDb.transaction().execute(async (trx) => {
    await trx.deleteFrom("teams").execute();
  });
}
