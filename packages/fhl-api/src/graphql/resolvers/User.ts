import {resolverMap} from "@/resolvers/base/ResolverMap";
import {UserAwardsResolver} from "@/resolvers/user/award/UserAwards.resolver";
import {UserTeamHistoryResolver} from "@/resolvers/user/team/UserTeamHistory.resolver";
import { TitleHistoryResolver } from "@/resolvers/user/title/TitleHistory.resolver";

export const UserResolvers = resolverMap({
  User: {
    awards: new UserAwardsResolver(),
    teamHistory: new UserTeamHistoryResolver(),
    titleHistory: new TitleHistoryResolver()
  },
});
