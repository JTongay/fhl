import DataLoader from "dataloader";
import {fhlDb} from "@fhl/core/src/db";
import {Award, CreateAwardParams} from "@/domain/Award";
import {Transaction} from "kysely";
import {Nullable} from "@/util";
import {Database} from "@fhl/core/src/sql.generated";

export class AwardDatasource {
  private batchAwards = new DataLoader(async (ids: number[]) => {
    const awardsList = await fhlDb
        .selectFrom("awards")
        .where("id", "in", ids)
        .selectAll()
        .execute();
    // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
    // Since the database might return the results in a different order the following code sorts the results accordingly
    const awardIdsToAwardMap = awardsList.reduce((mapping, award) => {
      mapping[award.id] = award;
      return mapping;
    }, {} as any); // TODO fix the type here
    return ids.map((id) => awardIdsToAwardMap[id]);
  });

  async getAward(id: number) {
    return this.batchAwards.load(id);
  }

  async getAwards(ids: number[]) {
    return this.batchAwards.loadMany(ids);
  }

  async createAward(params: CreateAwardParams): Promise<Award> {
    try {
      const {winningUserIds, presentingUserIds} = params;
      return await fhlDb.transaction().execute(async (db) => {
        const award = await db
            .insertInto("awards")
            .values({
              name: params.name,
            })
            .returningAll()
            .executeTakeFirstOrThrow();
        return {
          id: award.id.toString(),
          name: award.name,
          createdAt: award.created_at,
          updatedAt: award.updated_at,
          seasonId: params.seasonId,
          winningUserIds: await this.createAwardWinners(db, +params.seasonId, award.id, winningUserIds),
          presentingUserIds: await this.createAwardPresenters(db, +params.seasonId, award.id, presentingUserIds),
        };
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private async createAwardPresenters(
      db: Transaction<Database>,
      seasonId: number,
      awardId: number,
      presenters?: string[]
  ): Promise<string[]> {
    if (presenters && presenters.length) {
      return await Promise.all(
          presenters.map(async (winner) => {
            return await db.insertInto("award_season_presenter")
                .values({
                  season_id: seasonId,
                  award_id: awardId,
                  presenter_id: +winner,
                })
                .returning("presenter_id")
                .executeTakeFirstOrThrow();
          }).toString()
      );
    }
    return [];
  }

  private async createAwardWinners(
      db: Transaction<Database>,
      seasonId: number,
      awardId: number,
      winners?: string[]
  ): Promise<string[]> {
    if (winners && winners.length) {
      return await Promise.all(
          winners.map(async (winner) => {
            return await db.insertInto("award_season_winner")
                .values({
                  season_id: seasonId,
                  award_id: awardId,
                  winning_user_id: +winner,
                })
                .returning("winning_user_id")
                .executeTakeFirstOrThrow();
          }).toString()
      );
    }
    return [];
  }
}
