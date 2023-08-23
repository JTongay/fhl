import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { Nullable } from "@/utils";
import { UsersList, UsersResponse } from "../../domain/user";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { ApiError } from "@/domain";

export class UsersResponseResolver extends BaseUnionResolver {
    resolveType(
        value: UsersResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (value.constructor) {
            case UsersList:
                return "UsersList"
            case ApiError:
                return "ApiError"
            default:
                return null;
        }
    }
}