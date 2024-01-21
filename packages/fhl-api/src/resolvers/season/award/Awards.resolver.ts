import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { FHLContext } from "@/domain/Context";
import { Season } from "@/domain/Season";
import { Pagination } from "@/util";
import { fhlDb } from "@fhl/core/src/db";
import { ApiError } from "@/domain/errors/FHLApiError";
import { AwardsList, AwardsResponse } from "@/domain/Award";
import { jsonArrayFrom } from 'kysely/helpers/postgres'

export class AwardsResolver extends BaseResolver {
  protected async resolver(
    parent: Season,
    args: Pagination,
    context: FHLContext
  ): Promise<AwardsResponse> {
    try {
      const awardsList = await fhlDb.selectFrom("awards")
        // I think this not be a good idea, but it's the only way to tie a where clause?
        .leftJoin("award_season_presenter", "award_season_presenter.award_id", "awards.id")
        .where("award_season_presenter.season_id", "=", +parent.id)
        .select((eb) => [
          'awards.id',
          'awards.name',
          'awards.description',
          'awards.created_at',
          'awards.updated_at',
          "award_season_presenter.season_id",
          jsonArrayFrom(
            eb.selectFrom("award_season_presenter")
              .whereRef("award_season_presenter.award_id", "=", "awards.id")
              .select("award_season_presenter.presenter_id as presenter_id")
          ).as("presenters"),
          jsonArrayFrom(
            eb.selectFrom("award_season_winner")
              .whereRef("award_season_winner.award_id", "=", "awards.id")
              .select("award_season_winner.winning_user_id as winner_id")
          ).as("winners")
        ]).execute();
      const awards = awardsList.map((award) => {
        return {
          id: award.id.toString(),
          name: award.name,
          description: null,
          createdAt: award.created_at,
          updatedAt: award.updated_at,
          seasonId: award.season_id?.toString() || "0",
          winningUserIds: award.winners.flatMap((winner) => !!winner.winner_id ? [winner.winner_id.toString()] : []),
          presentingUserIds: award.presenters.flatMap((presenter) => !!presenter.presenter_id ? [presenter.presenter_id.toString()] : [])
        };
      });
      return new AwardsList(args, awards.length, awards);
    } catch (e) {
      console.log(e, "error fetching awards");
      return new ApiError(1, e.toString());
    }
  }
}
