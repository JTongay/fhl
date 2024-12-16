import { ApiHandler } from "sst/node/api";
import { rollbackSeasons } from "../seeds/season";

export const handler = ApiHandler(async (event) => {
  console.log(event, "event");

  rollbackSeasons();
});
