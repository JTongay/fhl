import {FHLContext} from "@/domain/Context";
import {BaseResolver} from "../base/BaseResolver";
import {Input} from "@/util";
import {CreateSeasonParams, Season, SeasonResponse} from "@/domain/Season";
import {ApiError} from "@/domain/errors/FHLApiError";
import {fhlDb} from "@fhl/core/src/db";

export class CreateSeasonResolver extends BaseResolver {
  protected async resolver(
      parent: never,
      args: Input<CreateSeasonParams>,
      context: FHLContext
  ): Promise<SeasonResponse> {
    try {
      const league = await fhlDb.selectFrom("leagues")
          .where("id", "=", parseInt(args.input.leagueId))
          .select("id")
          .executeTakeFirstOrThrow();

      const response = await fhlDb.insertInto("seasons")
          .values({
            is_active: args.input.setActive,
            year: args.input.year,
            league_id: league.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

      return new Season(response);
    } catch (e: unknown) {
      return new ApiError(69, e.toString());
    }
  }
}
