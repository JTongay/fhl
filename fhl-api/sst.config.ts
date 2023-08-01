import { SSTConfig } from "sst";
import { FHLApiStack } from "./stacks/FHLApiStack";
import { FHLUserDB } from "./packages/subgraphs/user/db/userDb";

export default {
  config(_input) {
    return {
      name: "fhl-api",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(FHLUserDB).stack(FHLApiStack);
  }
} satisfies SSTConfig;