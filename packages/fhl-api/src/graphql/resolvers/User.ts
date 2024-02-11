import { resolverMap } from "@/resolvers/base/ResolverMap";
import { UserAwardsResolver } from "@/resolvers/user/UserAwards.resolver";

export const UserResolvers = resolverMap({
    User: {
        awards: new UserAwardsResolver()
    }
})