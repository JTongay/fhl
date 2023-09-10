import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { User, UserResponse } from "../../domain/user";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { Nullable } from "@/utils";
import { ApiError } from "@/domain";

export class UserResponseResolver extends BaseUnionResolver {
    resolveType(
        value: UserResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (value.constructor) {
            case User:
                return "User"
            case ApiError:
                return "ApiError";
            default:
                return null;
        }
    }

}