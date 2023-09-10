import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { Nullable } from "@/utils";
import { League, LeagueApiErrorExtension, LeagueResponse } from "../../domain/League";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";

export class LeagueResponseResolver extends BaseUnionResolver {
    resolveType(
        type: LeagueResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (type.constructor) {
            case League:
                return "League"
            case LeagueApiErrorExtension:
                return "ApiError"
            default:
                return null
        }
    }
}