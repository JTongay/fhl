import { resolverMap } from "@/resolvers/base/ResolverMap";
import { CreateUserResolver } from "@/resolvers/user/CreateUser.resolver";
import { UpdateUserResolver } from "@/resolvers/user/UpdateUser.resolver";

export const MutationResolvers = resolverMap({
    Mutation: {
        createUser: new CreateUserResolver(),
        updateUser: new UpdateUserResolver()
    }
});
