import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { Pagination } from "@/utils";
import { Season, SeasonsList, SeasonsResponse } from "../domain/Season";
import { LeagueApiErrorExtension } from "../domain/League";
// import { db } from "@/db";
import { fhlDb } from "../../../../../core/src/db";

export class SeasonsResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: Pagination,
        context: BaseContext
    ): Promise<SeasonsResponse> {
        try {
            const total = await fhlDb.selectFrom("seasons")
                .select(
                    (season) => season.fn.sum("id").as("season_count")
                )
                .executeTakeFirstOrThrow()

            const response = await fhlDb.selectFrom("seasons")
                .selectAll()
                .limit(args.limit)
                .offset(args.offset)
                .execute()

            const seasons = response.map((season) => new Season(season))
            return new SeasonsList(args, total.season_count as number, seasons)
        } catch (e: unknown) {
            return new LeagueApiErrorExtension(3002, e.toString())
        }
    }
}