import { fhlDb } from "@fhl/core/src/db";
import { Seasons } from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import { Selectable } from "kysely";

export class SeasonDatasource {
    private batchSeasons = new DataLoader<number, Selectable<Seasons>>(async (ids: number[]) => {
        const seasonsList = await fhlDb.selectFrom("seasons")
            .where("id", "in", ids)
            .selectAll()
            .execute();

        const seasonIdsToSeasonMap = seasonsList.reduce((mapping, season) => {
            mapping[season.id] = season;
            return mapping;
        }, {});
        const returnValue: Selectable<Seasons>[] = ids.map((id) => seasonIdsToSeasonMap[id]);
        return returnValue;
    });

    async getSeason(id: number) {
        return this.batchSeasons.load(id);
    }
}