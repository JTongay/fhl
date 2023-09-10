import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { Pagination } from "@/utils";
import { Game, GameApiExtension, GamesList, GamesResponse } from "../domain/game";
import { fhlDb } from "../../../../../core/src/db";

export class GamesResolver extends BaseResolver {
    async resolver(
        parent: never,
        args: Pagination,
        context: BaseContext
    ): Promise<GamesResponse> {
        try {
            const total = await fhlDb.selectFrom("games")
                .select(
                    (games) => games.fn.sum('id').as("all_games")
                )
                .execute();

            const response = await fhlDb.selectFrom("games")
                .selectAll()
                .limit(args.limit)
                .offset(args.offset)
                .execute();

            const games = response.map((game) => new Game(game));
            return new GamesList(args, total.length, games);
        } catch (e: unknown) {
            return new GameApiExtension(2001, e.toString())
        }
    }
}