import { BaseContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { Pagination } from "@/util";
import { fhlDb } from "@fhl/core/src/db";
import { User, UsersList, UsersResponse } from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";

export class UsersResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: Pagination,
        context: BaseContext): Promise<UsersResponse> {
        try {
            const total = await fhlDb.selectFrom('users')
                .select(
                    (users) => users.fn.sum('id').as('all_users')
                )
                .execute()
            const response = await fhlDb.selectFrom('users')
                .selectAll()
                .limit(args.limit)
                .offset(args.offset)
                .execute()

            const users = response.map((user) => new User(user))
            return new UsersList(args, total[0].all_users as number, users)
        } catch (e: unknown) {
            return new ApiError(1003, e.toString())
        }
    }
}