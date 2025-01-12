import { ApiHandler } from "sst/node/api";
import { rollbackSeasons } from "../seeds/season";
import { rollbackUsers } from "../seeds/users";
import { rollbackTeams } from "../seeds/teams";
import { rollbackAwards } from "../seeds/award";

export const handler = ApiHandler(async (event) => {
  console.log(event, "event");

  rollbackUsers();
  rollbackSeasons();
  rollbackTeams();
  rollbackAwards();
});
