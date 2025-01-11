import { fhlDb } from "../src/db";

type DummyUser = {
  gamertag: string;
  firstName: string;
  lastName: string;
  email: string;
};

const dummyUsers: DummyUser[] = [
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

export async function seedUsers(fhlId: number) {
  return await fhlDb.transaction().execute(async (trx) => {
    const response = [];
    for (const user of dummyUsers) {
      const result = await trx
        .insertInto("users")
        .values({
          first_name: user.firstName,
          email: user.email,
          last_name: user.lastName,
          gamertag: user.gamertag,
          league_id: fhlId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      response.push(result);
    }

    return response;
  });
}

export async function rollbackUsers() {
  await fhlDb.deleteFrom("users").execute();
}
