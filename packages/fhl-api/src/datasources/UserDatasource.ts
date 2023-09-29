import DataLoader from 'dataloader';
import { fhlDb } from "@fhl/core/src/db";

export class UserDatasource {
    private batchUsers = new DataLoader(async (ids: number[]) => {
        const usersList = await fhlDb.selectFrom("users").where("id", "in", ids).selectAll().execute();
        // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
        // Since the database might return the results in a different order the following code sorts the results accordingly
        const userIdsToUserMap = usersList.reduce((mapping, user) => {
            mapping[user.id] = user;
            return mapping;
        }, {});
        return ids.map((id) => userIdsToUserMap[id]);
    });

    async getUser(id: number) {
        return this.batchUsers.load(id);
    }
}