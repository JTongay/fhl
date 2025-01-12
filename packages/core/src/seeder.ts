import { ApiHandler } from "sst/node/api";
import { seedSeasons } from "../seeds/season";
import { seedFHL } from "../seeds/league";
import { seedUsers } from "../seeds/users";
import { seedTeams } from "../seeds/teams";
import { seedCheck } from "../seeds/seedCheck";
import { seedAwards } from "../seeds/award";

export const handler = ApiHandler(async (event) => {
  console.log("Logging the Event: ", event);
  const fhlExists = await seedCheck();
  console.log("Does FHL already exist?: ", fhlExists);
  try {
    console.info("Starting Seed Data");
    const fhl = await seedFHL();
    console.info("Seeding FHL Complete with ID: ", fhl.id);
    const teams = await seedTeams(fhl.id);
    console.info("Seeding Teams Complete");
    const users = await seedUsers(fhl.id);
    console.info("Seeding Users Complete");
    const { activeSeason, futureSeason } = await seedSeasons(
      fhl.id,
      teams.map((team) => team.id),
      users.map((user) => user.id),
    );

    console.info(`Active Season seeded with id: ${activeSeason.id}`);
    console.info(`Future Season seeded with id: ${futureSeason.id}`);
    console.info("Seeding Seasons Complete");

    console.info("Seeding Awards");
    await seedAwards(
      fhl.id,
      activeSeason.id,
      users.map((user) => user.id),
    );
    console.info(`Seeding Awards Complete`);

    console.log("Success!!");
  } catch (e) {
    console.error(e, "Error Running Seeds. Fix it you silly goose");
  }
});
