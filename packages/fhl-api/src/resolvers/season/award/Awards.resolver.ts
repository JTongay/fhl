import {BaseResolver} from "@/resolvers/base/BaseResolver";
import {FHLContext} from "@/domain/Context";
import {Season} from "@/domain/Season";
import {Pagination} from "@/util";
import {fhlDb} from "@fhl/core/src/db";
import {ApiError} from "@/domain/errors/FHLApiError";
import {AwardsList, AwardsResponse} from "@/domain/Award";

export class AwardsResolver extends BaseResolver {
  protected async resolver(
      parent: Season,
      args: Pagination,
      context: FHLContext
  ): Promise<AwardsResponse> {
    try {
      const response = await fhlDb.selectFrom("award_season")
          .where("season_id", "=", +parent.id)
          .limit(args.limit)
          .offset(args.offset)
          .innerJoin("awards", "awards.id", "award_season.award_id")
          .select([
            "awards.id",
            "awards.name",
            "awards.created_at",
            "awards.updated_at",
            "award_season.season_id",
            "award_season.presenter_id",
            "award_season.winning_user_id",
          ])
          .execute();
      const awards = response.map((award) => {
        return {
          id: award.id.toString(),
          name: award.name,
          createdAt: award.created_at,
          updatedAt: award.updated_at,
          seasonId: award.season_id.toString(),
          winningUserIds: award.winning_user_id ? [award.winning_user_id?.toString()] : null,
          presentingUserIds: award.presenter_id ? [award.presenter_id?.toString()] : null,
        };
      });
      return new AwardsList(args, awards.length, awards);
    } catch (e) {
      console.log(e, "error fetching awards");
      return new ApiError(1, e.toString());
    }
  }
}
