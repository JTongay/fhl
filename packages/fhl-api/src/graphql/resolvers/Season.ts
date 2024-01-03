import {resolverMap} from "@/resolvers/base/ResolverMap";
import {StorylineResolver} from "@/resolvers/season/storyline/Storyline.resolver";
import {StorylinesResolver} from "@/resolvers/season/storyline/Storylines.resolver";
import {StorylineUsersResolver} from "@/resolvers/season/storyline/user/StorylineUsers.resolver";
import {AwardsResolver} from "@/resolvers/season/award/Awards.resolver";

export const SeasonResolvers = resolverMap({
  Season: {
    storyline: new StorylineResolver(),
    storylines: new StorylinesResolver(),
    awards: new AwardsResolver(),
  },
  Storyline: {
    users: new StorylineUsersResolver(),
  },
});
