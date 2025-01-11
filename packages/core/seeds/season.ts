import { fhlDb } from "../src/db";

export async function seedSeasons(
  fhlId: number,
  teams: number[],
  users: number[],
) {
  // Seed seasons
  // Seed active seasons
  const activeSeason = await fhlDb
    .insertInto("seasons")
    .values({
      is_active: true,
      year: 2024,
      league_id: fhlId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(`Active Season seeded with id: ${activeSeason.id}`);

  const futureSeason = await fhlDb
    .insertInto("seasons")
    .values({
      is_active: false,
      year: 2025,
      league_id: fhlId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(`Future Season seeded with id: ${futureSeason.id}`);

  const activeSeasonTeams = await fhlDb.transaction().execute(async (trx) => {
    const response = [];

    console.log("Adding Teams to Season");
    for (const team of teams) {
      console.log(
        `Inserting team id: ${team} into active season: ${activeSeason.id}`,
      );
      const result = await trx
        .insertInto("team_season")
        .values({
          team_id: team,
          season_id: activeSeason.id,
          // Force unwrap here is ok, there will always be more Users than Teams
          captain_id: users.pop()!,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      response.push(result);
    }

    return response;
  });

  const activeUserTeamSeason = await fhlDb
    .transaction()
    .execute(async (trx) => {
      const response = [];

      const half = Math.ceil(users.length / 2);
      const firstHalf = users.slice(0, half);
      const secondHalf = users.slice(half);
      let teamCount = 0;

      do {
        if (teamCount % 2) {
          for (const user of firstHalf) {
            const result = await trx
              .insertInto("user_team_season")
              .values({
                player_id: user,
                team_id: teams[teamCount],
                season_id: activeSeason.id,
              })
              .returningAll()
              .execute();

            response.push(result);
          }
        } else {
          for (const user of secondHalf) {
            const result = await trx
              .insertInto("user_team_season")
              .values({
                player_id: user,
                team_id: teams[teamCount],
                season_id: activeSeason.id,
              })
              .returningAll()
              .execute();

            response.push(result);
          }
        }
        teamCount++;
      } while (teamCount <= teams.length - 1);
    });

  return {
    activeSeason,
    activeSeasonTeams,
    activeUserTeamSeason,
    futureSeason,
  };
}

export async function rollbackSeasons() {
  await fhlDb.deleteFrom("seasons").execute();
  await fhlDb.deleteFrom("team_season").execute();
  await fhlDb.deleteFrom("user_team_season").execute();
}
