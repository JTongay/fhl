import { ApiHandler } from "sst/node/api";
import { seedSeasons } from "../seeds/season";

export const handler = ApiHandler(async (event) => {
  console.log(event, "event");

  seedSeasons();
});
