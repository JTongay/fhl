import {resolverMap} from "@/resolvers/base/ResolverMap";
import { TitleLineageResolver } from "@/resolvers/league/champion/TitleLineage.resolver";
import { CurrentChampionResolver } from "@/resolvers/league/champion/CurrentChampion.resolver";
import {LeagueTeamResolver} from "@/resolvers/league/team/LeagueTeam.resolver";
import {LeagueTeamsResolver} from "@/resolvers/league/team/LeagueTeams.resolver";
import {UsersResolver} from "@/resolvers/user/Users.resolver";
import { EventResolver } from "@/resolvers/league/event/Event.resolver";
import { TitleChangeWinningUserResolver } from "@/resolvers/league/champion/TitleChangeWinningUser.resolver";
import { TitleChangeLosingUserResolver } from "@/resolvers/league/champion/TitleChangeLosingUser.resolver";

export const LeagueResolvers = resolverMap({
  League: {
    team: new LeagueTeamResolver(),
    teams: new LeagueTeamsResolver(),
    currentChampion: new CurrentChampionResolver(),
    titleLineage: new TitleLineageResolver(),
  },
  Storyline: {
    users: new UsersResolver(),
  },
  TitleChange: {
    winner: new TitleChangeWinningUserResolver(),
    loser: new TitleChangeLosingUserResolver(),
    event: new EventResolver(),
  }
});
