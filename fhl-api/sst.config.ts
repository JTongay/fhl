import { SSTConfig } from "sst";
import { FHLApiStack } from "./stacks/FHLApiStack";
// import { FHLUserDB } from "./packages/subgraphs/user/db/userDb";

export default {
  config(_input) {
    return {
      name: "fhl-api",
      region: "us-east-1",
    };
  },
  stacks(app) {
    // Remove all resources when non-prod stages are removed
    // if (app.stage !== "prod") {
    //   app.setDefaultRemovalPolicy("destroy");
    // }
    app.stack(FHLApiStack);
  }
} satisfies SSTConfig;