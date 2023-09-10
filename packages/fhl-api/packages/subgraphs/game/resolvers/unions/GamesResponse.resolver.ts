import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { GameApiExtension, GamesList, GamesResponse } from "../../domain/game";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { Nullable } from "@/utils";


export class GamesResponseResolver extends BaseUnionResolver {
    resolveType(
        type: GamesResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (type.constructor) {
            case GamesList:
                return "GamesList"
            case GameApiExtension:
                return "ApiError"
            default:
                return null;
        }
    }
}