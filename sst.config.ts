import { SSTConfig } from "sst";
import { FHLDB } from "stacks/FHLDb.js";
import { FHLApi } from "stacks/FHLApi.js";
import { NextWeb } from "stacks/FHLWeb2.js";

export default {
    config(_input) {
        return {
            name: "fhl",
            region: "us-east-1",
        };
    },
    stacks(app) {
        app.stack(FHLDB)
            .stack(FHLApi)
            .stack(NextWeb);
    }
} satisfies SSTConfig;
