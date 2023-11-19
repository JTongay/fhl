import {resolverMap} from "@/resolvers/base/ResolverMap";
import {CreateLeagueResolver} from "@/resolvers/league/CreateLeague.resolver";
import {CreateSeasonResolver} from "@/resolvers/season/CreateSeason.resolver";
import {DeleteSeasonResolver} from "@/resolvers/season/DeleteSeason.resolver";
import {UpdateSeasonResolver} from "@/resolvers/season/UpdateSeason.resolver";
import {CreateStorylineResolver} from "@/resolvers/season/storyline/CreateStoryline.resolver";
import {CreateUserResolver} from "@/resolvers/user/CreateUser.resolver";
import {UpdateUserResolver} from "@/resolvers/user/UpdateUser.resolver";
import {UpdateStorylineResolver} from "@/resolvers/season/storyline/UpdateStoryline.resolver";

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
  },
});
