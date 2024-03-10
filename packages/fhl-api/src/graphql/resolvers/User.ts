import {resolverMap} from "@/resolvers/base/ResolverMap";
import {UserAwardsResolver} from "@/resolvers/user/award/UserAwards.resolver";
import {UserTeamHistoryResolver} from "@/resolvers/user/team/UserTeamHistory.resolver";

export const UserResolvers = resolverMap({
  User: {
    awards: new UserAwardsResolver(),
    teamHistory: new UserTeamHistoryResolver(),
  },
});
