import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { Season, SeasonResponse } from "../../domain/Season";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { Nullable } from "@/utils";
import { LeagueApiErrorExtension } from "../../domain/League";


export class SeasonResponseResolver extends BaseUnionResolver {
    resolveType(
        type: SeasonResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (type.constructor) {
            case Season:
                return "Season"
            case LeagueApiErrorExtension:
                return "ApiError"
            default:
                return null;
        }
    }
}