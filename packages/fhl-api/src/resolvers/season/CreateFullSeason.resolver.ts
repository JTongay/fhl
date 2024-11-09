import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { fhlDb } from "@fhl/core/src/db";
import { Input } from "@/util";

type CreateFullSeasonParams = {
  leagueId: string;
  teams: {
    id: string;
    captain: string;
  }[];
  startDate: string;
  endDate: string;
};

/**
 * We want to create a season with the team captains and teams already selected.
 */
export class CreateFullSeason extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: Input<CreateFullSeasonParams>,
    context: FHLContext,
  ): Promise<unknown> {
    return await fhlDb.transaction().execute(async (trans) => {
      const addedSeason = await trans
        .insertInto("seasons")
        .values({
          league_id: +args.input.leagueId,
          is_active: true,
          year: 2024,
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      for (const team of args.input.teams) {
        await trans.insertInto("team_season").values({
          team_id: +team.id,
          season_id: +addedSeason.id,
          captain_id: +team.captain
        }).executeTakeFirstOrThrow()

      }
    });
  }
}
