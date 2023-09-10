import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph"
import { UserSchema } from "./graphql/schema";
import { resolverMap, typeResolverMap } from "@/graphql/resolvers/ResolverMap";
import { UserResolver } from "./resolvers/User.resolver";
import { UserResponseResolver } from "./resolvers/unions/UserResponse.resolver";
import { CreateUserResolver } from "./resolvers/CreateUser.resolver";
import { UsersResolver } from "./resolvers/Users.resolver";
import { UsersResponseResolver } from "./resolvers/unions/UsersResponse.resolver";
import { UpdateUserResolver } from "./resolvers/UpdateUser.resolver";

const dataResolvers = resolverMap({
    Query: {
        user: new UserResolver(),
        users: new UsersResolver()
    },
    Mutation: {
        createUser: new CreateUserResolver(),
        updateUser: new UpdateUserResolver()
    }
});

const unionResolvers = typeResolverMap({
    UserResponse: new UserResponseResolver(),
    UsersResponse: new UsersResponseResolver()
})

const resolvers = {
    ...dataResolvers,
    ...unionResolvers
};

export const userSubgraphServer = new ApolloServer({
    schema: buildSubgraphSchema([
        { typeDefs: UserSchema, resolvers },
    ]),
    introspection: true,
    includeStacktraceInErrorResponses: true
});
