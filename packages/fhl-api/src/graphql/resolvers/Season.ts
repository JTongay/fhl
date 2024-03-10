import {resolverMap} from "@/resolvers/base/ResolverMap";
import {StorylineResolver} from "@/resolvers/season/storyline/Storyline.resolver";
import {StorylinesResolver} from "@/resolvers/season/storyline/Storylines.resolver";
import {StorylineUsersResolver} from "@/resolvers/season/storyline/user/StorylineUsers.resolver";
import {AwardsResolver} from "@/resolvers/season/award/Awards.resolver";
import {SeasonTeamsResolver} from "@/resolvers/season/team/SeasonTeams.resolver";
import {SeasonTeamResolver} from "@/resolvers/season/team/SeasonTeam.resolver";

export const SeasonResolvers = resolverMap({
  Season: {
    storyline: new StorylineResolver(),
    storylines: new StorylinesResolver(),
    awards: new AwardsResolver(),
    // award: new AwardResolver(), // TODO this resolver is borked. Fix the datasource
    teams: new SeasonTeamsResolver(),
    team: new SeasonTeamResolver(),
  },
  Storyline: {
    users: new StorylineUsersResolver(),
  },
});
