import { SSTConfig } from "sst";
import { FHLDB } from "./stacks/FHLDb";
import { FHLWeb } from "./stacks/FHLWeb";
import { FHLApi } from "./stacks/FHLApi";

export default {
    config(_input) {
        return {
            name: "fhl",
            region: "us-east-1",
        };
    },
    stacks(app) {
        app
            .stack(FHLDB)
            .stack(FHLApi)
            .stack(FHLWeb);
    }
} satisfies SSTConfig;
