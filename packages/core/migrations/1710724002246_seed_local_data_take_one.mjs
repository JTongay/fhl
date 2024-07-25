import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<Database>}
 */
export async function up(db) {
  // Create an active season
  const activeSeason = await createActiveSeason(db);
  const pastSeason = await createPastSeason(db);
  const users = await createUsers(db);
  const teams = await createTeams(db);
  const awards = await createAwards(db);
  const storylines = await createStorylines(db, pastSeason.id);

  console.log(activeSeason, "activeSeason");
  console.log(pastSeason, "pastSeason");
  console.log(users, "users");
  console.log(teams, "teams");
  console.log(awards, "awards");
  console.log("");
  console.log(storylines, "storylines");

  // await createAwardSeason(db, awards.mvpResult.id, pastSeason.id, [users[0].id, users[1].id], [users[0].id]);
  // await createAwardSeason(db, awards.pogResult.id, pastSeason.id, [users[0].id, users[1].id], [users[1].id]);
  // await createAwardSeason(db, awards.mikeGerudoResult.id, pastSeason.id, [users[0].id, users[1].id], [users[2].id]);
  // await createAwardSeason(db, awards.loreResult.id, pastSeason.id, [users[0].id, users[1].id], [users[3].id]);
  // await createAwardSeason(db, awards.rivalryResult.id, pastSeason.id, [users[0].id, users[1].id], [users[4].id]);
  // await createAwardSeason(db, awards.nuclearHeatResult.id, pastSeason.id, [users[0].id, users[1].id], [users[5].id]);
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.deleteFrom("seasons").execute();
  await db.deleteFrom("users").execute();
  await db.deleteFrom("teams").execute();
  await db.deleteFrom("awards").execute();
  await db.deleteFrom("storylines").execute();

  // await sql`ALTER SEQUENCE seasons_id_seq RESTART WITH 1`.execute();
  // await sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`.execute();
  // await sql`ALTER SEQUENCE teams_id_seq RESTART WITH 1`.execute();
  // await sql`ALTER SEQUENCE awards_id_seq RESTART WITH 1`.execute();
  // await sql`ALTER SEQUENCE storylines_id_seq RESTART WITH 1`.execute();
}

/**
 * @param db {Kysely<Database>}
 * @returns {Promise<Season>}
 */
async function createActiveSeason(db) {
  return await db
    .insertInto("seasons")
    .values(({ selectFrom }) => ({
      is_active: true,
      year: 2024,
      league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
    }))
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 *
 * @param db {Kysely<Database>}
 * @returns {Promise<Season>}
 */
async function createPastSeason(db) {
  return await db
    .insertInto("seasons")
    .values(({ selectFrom }) => ({
      is_active: false,
      year: 2023,
      league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
    }))
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 *
 * @param db {Kysely<Database>}
 * @returns {Promise<Object<string, User>>}
 */
async function createUsers(db) {
  const users = [
    {
      gamertag: "VeggieMedley",
      firstName: "Joey",
      lastName: "Tongay",
      email: "something@example.com",
    },
    {
      gamertag: "Cyb",
      firstName: "Ryan",
      lastName: "Lewis",
      email: "something@example2.com",
    },
    {
      gamertag: "Admiral Fun",
      firstName: "Austin",
      lastName: "Norman",
      email: "something@example3.com",
    },
    {
      gamertag: "Crushinator",
      firstName: "Kelly",
      lastName: "Belly",
      email: "something@example4.com",
    },
    {
      gamertag: "egglliott",
      firstName: "Elliott",
      lastName: "Egg",
      email: "something@example5.com",
    },
    {
      gamertag: "Kal-El",
      firstName: "Kale",
      lastName: "Roberts",
      email: "something@example6.com",
    },
    {
      gamertag: "Goldenboy",
      firstName: "Sean",
      lastName: "Dusang",
      email: "something@example7.com",
    },
    {
      gamertag: "supermegakitty",
      firstName: "Drew",
      lastName: "Dusang",
      email: "something@example8.com",
    },
    {
      gamertag: "Phomier",
      firstName: "Phil",
      lastName: "Bill",
      email: "something@example9.com",
    },
    {
      gamertag: "Slamford",
      firstName: "Charles",
      lastName: "Barkley",
      email: "something@example10.com",
    },
  ];
  const response = {};
  for (const user of users) {
    const result = await db
      .insertInto("users")
      .values(({ selectFrom }) => ({
        gamertag: user.gamertag,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
      }))
      .returningAll()
      .executeTakeFirstOrThrow();
    response[user.gamertag] = result;
  }
  return response;
}

async function createTeams(db) {
  const cheddarMafia = await db
    .insertInto("teams")
    .values(({ selectFrom }) => ({
      name: "Cheddar Mafia",
      league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
    }))
    .returningAll()
    .executeTakeFirstOrThrow();
  const texasBangers = await db
    .insertInto("teams")
    .values(({ selectFrom }) => ({
      name: "Texas Bangers",
      league_id: selectFrom("leagues").where("name", "=", "FHL").select("id"),
    }))
    .returningAll()
    .executeTakeFirstOrThrow();
  return { cheddarMafia, texasBangers };
}

async function createAwards(db) {
  const mvp = { name: "MVP", description: "Most Valuable Player" };
  const pog = { name: "Pog", description: "Most Outstanding Play" };
  const mikeGerudo = {
    name: "Mike Gerudo",
    description: "The life of the party. The one who kept it the most fun",
  };
  const lore = { name: "Lore", description: "Best storyline in the Discord" };
  const rivalry = {
    name: "Rivalry",
    description: "The players with the best rivalry",
  };
  const nuclearHeat = {
    name: "Nuclear Heat",
    description: "Biggest Heel in the League",
  };

  const mvpResult = await db
    .insertInto("awards")
    .values(mvp)
    .returningAll()
    .executeTakeFirstOrThrow();
  const pogResult = await db
    .insertInto("awards")
    .values(pog)
    .returningAll()
    .executeTakeFirstOrThrow();
  const mikeGerudoResult = await db
    .insertInto("awards")
    .values(mikeGerudo)
    .returningAll()
    .executeTakeFirstOrThrow();
  const loreResult = await db
    .insertInto("awards")
    .values(lore)
    .returningAll()
    .executeTakeFirstOrThrow();
  const rivalryResult = await db
    .insertInto("awards")
    .values(rivalry)
    .returningAll()
    .executeTakeFirstOrThrow();
  const nuclearHeatResult = await db
    .insertInto("awards")
    .values(nuclearHeat)
    .returningAll()
    .executeTakeFirstOrThrow();
  return {
    mvpResult,
    pogResult,
    mikeGerudoResult,
    loreResult,
    rivalryResult,
    nuclearHeatResult,
  };
}

/**
 *
 * @param db {Kysely<Database>}
 * @param seasonId {number}
 * @returns {Promise<Object<string, Storyline>>}
 */
async function createStorylines(db, seasonId) {
  const panckage = {
    name: "The Great Pancake Nuke",
    description:
      "Austin kept dropping nukes on the discord when things got out of hand, thus creating a nuclear wasteland",
  };
  const sloppyJoey = {
    name: "The Many Faces of Sloppy Joey",
    description:
      "Joey seemed to have multiple personalities like Erin's boyfriend, Zoomer Joey, and Sloppy Joey.",
  };
  const kellysBox = {
    name: "Kelly's Lonely Box",
    description:
      "Kelly stayed connected in a voice channel for days listening to sad music, and Ryan moved him into his lonely box channel",
  };

  const pancakeResult = await db
    .insertInto("storylines")
    .values({
      description: panckage.description,
      season_id: seasonId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const sloppyJoeyResult = await db
    .insertInto("storylines")
    .values({
      description: sloppyJoey.description,
      season_id: seasonId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const kellysBoxResult = await db
    .insertInto("storylines")
    .values({
      description: kellysBox.description,
      season_id: seasonId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return { pancakeResult, sloppyJoeyResult, kellysBoxResult };
}

async function createAwardSeason(
  db,
  awardId,
  seasonId,
  presenterIds,
  winnerIds,
) {
  for (const presenter of presenterIds) {
    await db
      .insertInto("award_season_presenters")
      .values({
        award_id: awardId,
        season_id: seasonId,
        presenter_id: presenter,
      })
      .returningAll()
      .execute();
  }

  for (const winner of winnerIds) {
    await db
      .insertInto("award_season_winners")
      .values({
        award_id: awardId,
        season_id: seasonId,
        winner_id: winner,
      })
      .returningAll()
      .execute();
  }
}
