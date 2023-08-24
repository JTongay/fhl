import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { Season, SeasonResponse } from "../domain/Season";
import { LeagueApiErrorExtension } from "../domain/League";
import { db } from "@/db";

export class SeasonResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<SeasonResponse> {
        try {
            const response = await db.selectFrom("seasons")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow();

            return new Season(response)
        } catch (e: unknown) {
            return new LeagueApiErrorExtension(3001, e.toString())
        }
    }
}