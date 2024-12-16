import { resolverMap } from "@/resolvers/base/ResolverMap";
import { CreateLeagueResolver } from "@/resolvers/league/CreateLeague.resolver";
import { CreateSeasonResolver } from "@/resolvers/season/CreateSeason.resolver";
import { DeleteSeasonResolver } from "@/resolvers/season/DeleteSeason.resolver";
import { UpdateSeasonResolver } from "@/resolvers/season/UpdateSeason.resolver";
import { CreateStorylineResolver } from "@/resolvers/season/storyline/CreateStoryline.resolver";
import { CreateUserResolver } from "@/resolvers/user/CreateUser.resolver";
import { UpdateUserResolver } from "@/resolvers/user/UpdateUser.resolver";
import { UpdateStorylineResolver } from "@/resolvers/season/storyline/UpdateStoryline.resolver";
import { DeleteStorylineResolver } from "@/resolvers/season/storyline/DeleteStoryline.resolver";
import { CreateAwardResolver } from "@/resolvers/season/award/CreateAward.resolver";
import { CreateEventResolver } from "@/resolvers/league/event/CreateEvent.resolver";
import { UpdateEventResolver } from "@/resolvers/league/event/UpdateEvent.resolver";
import { DraftPlayerToTeamResolver } from "@/resolvers/season/team/DraftPlayerToTeam.resolver";
import { RemovePlayerFromTeamResolver } from "@/resolvers/season/team/RemovePlayerFromTeam.resolver";
import { CreateFullSeason } from "@/resolvers/season/CreateFullSeason.resolver";

export const MutationResolvers = resolverMap({
  Mutation: {
    createUser: new CreateUserResolver(),
    updateUser: new UpdateUserResolver(),
    createSeason: new CreateSeasonResolver(),
    updateSeason: new UpdateSeasonResolver(),
    deleteSeason: new DeleteSeasonResolver(),
    createLeague: new CreateLeagueResolver(),
    createStoryline: new CreateStorylineResolver(),
    updateStoryline: new UpdateStorylineResolver(),
    deleteStoryline: new DeleteStorylineResolver(),
    createAward: new CreateAwardResolver(),
    createEvent: new CreateEventResolver(),
    updateEvent: new UpdateEventResolver(),
    draftPlayerToTeam: new DraftPlayerToTeamResolver(),
    removePlayerFromTeam: new RemovePlayerFromTeamResolver(),
    createFullSeason: new CreateFullSeason(),
  },
});
