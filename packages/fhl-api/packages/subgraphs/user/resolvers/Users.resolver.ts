import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { User, UsersList, UsersResponse } from "../domain/user";
import { InputType, Pagination } from "@/utils";
import { ApiError } from "@/domain";
import { fhlDb } from "../../../../../core/src/db";

export class UsersResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: InputType<Pagination>,
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
                .limit(args.input.limit)
                .offset(args.input.offset)
                .execute()

            const users = response.map((user) => new User(user));
            return new UsersList(args.input, total.length, users);
        } catch (e: unknown) {
            return new ApiError(1002, e.toString())
        }
    }
}