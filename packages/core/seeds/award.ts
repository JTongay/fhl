import { fhlDb } from "../src/db";

const mockAwards: {
  name: string;
  description: string;
}[] = [
  {
    name: "MVP",
    description: "Most Valuable Player",
  },
  {
    name: "Nuclear Heat",
    description: "Biggest heel that no ene likes",
  },
  {
    name: "Best Rivalry",
    description: "Which players hated each other the most??",
  },
  {
    name: "Mike Gerudo Life of the Party",
    description: "Who keeps everything the most fun",
  },
  {
    name: "Lore",
    description: "Most memorable moment/storyline in the chat",
  },
];

export async function seedAwards(
  leagueId: number,
  seasonId: number,
  users: number[],
) {
  const awards = await fhlDb
    .insertInto("awards")
    .values(mockAwards)
    .returning("id")
    .execute();

  const presenters = await fhlDb.transaction().execute(async (trx) => {
    const response = [];
    for (const award of awards) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const result = await trx
        .insertInto("award_season_presenter")
        .values({
          award_id: award.id,
          presenter_id: randomUser,
          season_id: seasonId,
        })
        .returningAll()
        .execute();

      response.push(result);
    }
    return response;
  });

  const winners = await fhlDb.transaction().execute(async (trx) => {
    const response = [];
    for (const award of awards) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const multipleUsers = Math.round(Math.random());
      if (multipleUsers) {
        console.log("Inserting a multi user award win");
        const awardWinners: number[] = [randomUser, generateRandomUser(users)];
        for (const awardWinner of awardWinners) {
          const result = await trx
            .insertInto("award_season_winner")
            .values({
              award_id: award.id,
              winning_user_id: awardWinner,
              season_id: seasonId,
            })
            .returningAll()
            .execute();

          response.push(result);
        }
      } else {
        console.log("Inserting a single user award win");
        const result = await trx
          .insertInto("award_season_winner")
          .values({
            award_id: award.id,
            winning_user_id: randomUser,
            season_id: seasonId,
          })
          .returningAll()
          .execute();

        response.push(result);
      }
    }
    return [...response];
  });

  return {
    awards,
    presenters,
    winners,
  };
}

function generateRandomUser(users: number[]) {
  return users[Math.floor(Math.random() * users.length)];
}
