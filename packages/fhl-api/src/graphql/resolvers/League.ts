import {resolverMap} from "@/resolvers/base/ResolverMap";
import {LeagueTeamResolver} from "@/resolvers/league/team/LeagueTeam.resolver";
import {LeagueTeamsResolver} from "@/resolvers/league/team/LeagueTeams.resolver";
import {UsersResolver} from "@/resolvers/user/Users.resolver";

export const LeagueResolvers = resolverMap({
  League: {
    team: new LeagueTeamResolver(),
    teams: new LeagueTeamsResolver(),
  },
  Storyline: {
    users: new UsersResolver(),
  },
});
