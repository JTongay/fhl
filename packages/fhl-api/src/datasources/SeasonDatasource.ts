import {Season} from "@/domain/Season";
import {AddTeamToSeasonParams} from "@/domain/Team";
import {TeamRepository} from "@/repositories/Team.repository";
import {Nullable} from "@/util";
import {fhlDb} from "@fhl/core/src/db";
import {Seasons} from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import {Selectable} from "kysely";

export class SeasonDatasource {
  private teamRepository: TeamRepository;
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  private batchSeasons = new DataLoader<number, Selectable<Seasons>>(async (ids: number[]) => {
    const seasonsList = await fhlDb.selectFrom("seasons")
        .where("id", "in", ids)
        .selectAll()
        .execute();
    if (!seasonsList.length) {
      // TODO: Might be better to throw a typed error here
      throw new Error("Seasons not found");
    }

    const seasonIdsToSeasonMap = seasonsList.reduce((mapping, season) => {
      mapping[season.id] = season;
      return mapping;
    }, {} as Record<string, Selectable<Seasons>>);
    return ids.map((id) => seasonIdsToSeasonMap[id]);
  });

  async getSeason(id: number) {
    const season = await this.batchSeasons.load(id);
    return new Season(season);
  }

  async getSeasons(ids: number[]) {
    return this.batchSeasons.loadMany(ids);
  }

  async addTeamToSeason(params: AddTeamToSeasonParams): Promise<string> {
    const teams = await this.teamRepository.countTeamsToSeason(+params.seasonId);
    if (teams >= 2) {
      throw new Error();
    }

    return await this.teamRepository.addTeamToSeason(params);
  }

  async getActiveSeason(leagueId: string): Promise<Nullable<Season>> {
    const result = await fhlDb.selectFrom("seasons")
        .where("is_active", "=", true)
        .where("league_id", "=", +leagueId)
        .selectAll()
        .executeTakeFirst();

    if (!result) {
      return null;
    }

    return new Season(result);
  }
}
