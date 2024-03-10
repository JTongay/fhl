import {League} from "@/domain/League";
import {User} from "@/domain/User";
import {fhlDb} from "@fhl/core/src/db";
import {Leagues} from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import {Selectable} from "kysely";

export class LeagueDatasource {
  private batchLeagues = new DataLoader(async (ids: number[]) => {
    const leaguesList = await fhlDb.selectFrom("leagues").where("id", "in", ids)
        .selectAll()
        .execute();

    const leagueIdsToLeagueMap = leaguesList.reduce((mapping, league) => {
      mapping[league.id] = league;
      return mapping;
    }, {} as {[key: string]: Selectable<Leagues>});
    return ids.map((id) => leagueIdsToLeagueMap[id]);
  });

  public async getFHL(): Promise<League> {
    const result = await fhlDb.selectFrom("leagues")
        .where("name", "=", "FHL")
        .selectAll()
        .executeTakeFirstOrThrow();
    return new League(result);
  }
}
