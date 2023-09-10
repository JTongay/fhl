// import { db } from "@/db";
import { ApiError } from "@/domain";
import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { League, LeagueApiErrorExtension, LeagueResponse } from "../domain/League";
import { fhlDb } from "../../../../../core/src/db";

export class LeagueResolver extends BaseResolver {
    protected async resolver(parent: never, args: { id: string }, context: BaseContext): Promise<LeagueResponse> {
        try {
            const response = await fhlDb.selectFrom("leagues")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow()
            return new League(response)
        } catch (e: unknown) {
            return new LeagueApiErrorExtension(300, e.toString());
        }
    }
}