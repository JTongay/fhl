import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { SeasonsList, SeasonsResponse } from "../../domain/Season";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { Nullable } from "@/utils";
import { LeagueApiErrorExtension } from "../../domain/League";


export class SeasonsResponseResolver extends BaseUnionResolver {
    resolveType(
        type: SeasonsResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (type.constructor) {
            case SeasonsList:
                return "SeasonsList"
            case LeagueApiErrorExtension:
                return "ApiError"
            default:
                return null;
        }
    }
}