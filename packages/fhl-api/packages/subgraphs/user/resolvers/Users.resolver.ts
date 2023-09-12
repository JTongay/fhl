import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { User, UsersList, UsersResponse } from "../domain/user";
import { InputType, Pagination } from "@/utils";
import { ApiError } from "@/domain";
import { fhlDb } from "@fhl/core/src/db";

export class UsersResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: Pagination,
        context: BaseContext
    ): Promise<UsersResponse> {
        try {
            const total = await fhlDb.selectFrom('users')
                .select(
                    (users) => users.fn.sum('id').as('all_users')
                )
                .execute()
            const response = await fhlDb.selectFrom("users")
                .selectAll()
                .limit(args.limit)
                .offset(args.offset)
                .execute()

            console.log(total);

            const users = response.map((user) => new User(user));
            console.log(users, "users")
            return new UsersList(args, total[0].all_users as number, users);
        } catch (e: unknown) {
            return new ApiError(1002, e.toString())
        }
    }
}