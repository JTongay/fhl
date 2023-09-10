// import { db } from "@/db";
import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { Game, GameApiExtension, GameResponse } from "../domain/game";
import { ApiError } from "@/domain";
import { fhlDb } from "../../../../../core/src/db";

export class GameResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<GameResponse> {
        try {
            const response = await fhlDb.selectFrom("games")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow();
            return new Game(response);
        } catch (e: unknown) {
            return new GameApiExtension(200, e.toString());
        }
    }
}