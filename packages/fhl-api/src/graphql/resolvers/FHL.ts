import {resolverMap} from "@/resolvers/base/ResolverMap";
import {ActiveSeasonResolver} from "@/resolvers/league/fhl/ActiveSeason.resolver";
import {TopFiveUserRecordsResolver} from "@/resolvers/league/fhl/TopFiveUserRecords.resolver";

export const FHLResolvers = resolverMap({
  FHL: {
    activeSeason: new ActiveSeasonResolver(),
    // currentChampion: {},
    // upcomingSeason: {},
    topFiveRecords: new TopFiveUserRecordsResolver(),
    // bottomFiveRecords: {},
  },
});
