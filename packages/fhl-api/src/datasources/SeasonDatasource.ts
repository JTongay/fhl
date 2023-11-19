import {fhlDb} from "@fhl/core/src/db";
import {Seasons} from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import {Selectable} from "kysely";

export class SeasonDatasource {
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
    }, {});
    return ids.map((id) => seasonIdsToSeasonMap[id]);
  });

  async getSeason(id: number) {
    return this.batchSeasons.load(id);
  }
}
