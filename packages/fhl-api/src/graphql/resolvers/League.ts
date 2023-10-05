import { resolverMap } from "@/resolvers/base/ResolverMap";
import { UsersResolver } from "@/resolvers/user/Users.resolver";

export const LeagueResolvers = resolverMap({
    Storyline: {
        users: new UsersResolver(),
    }
})