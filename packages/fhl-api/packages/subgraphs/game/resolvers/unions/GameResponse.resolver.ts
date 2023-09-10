import { BaseUnionResolver } from "@/graphql/resolvers/BaseUnionResolver";
import { Game, GameApiExtension, GameResponse } from "../../domain/game";
import { BaseContext } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { Nullable } from "@/utils";
import { ApiError } from "@/domain";

export class GameResponseResolver extends BaseUnionResolver {
    resolveType(
        type: GameResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (type.constructor) {
            case Game:
                return "Game"
            case GameApiExtension:
                return "ApiError"
            default:
                return null;
        }
    }
}