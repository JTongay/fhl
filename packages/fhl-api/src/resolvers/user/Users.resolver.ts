import { BaseContext, FHLContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { Nullable, Pagination } from "@/util";
import { fhlDb } from "@fhl/core/src/db";
import { User, UsersList, UsersResponse } from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";
import { Storyline } from "@/domain/Storyline";
import { Award } from "@/domain/Award";

function isAward(params: Storyline | Award): params is Award {

}

export class UsersResolver extends BaseResolver {
  protected async resolver(
    parent: Nullable<Storyline>,
    args: Pagination,
    context: FHLContext
  ): Promise<UsersResponse> {
    try {
      const { count } = fhlDb.fn;
      const total = await fhlDb.selectFrom("users")
        .select(
          count<number>("id").as("all_users")
        )
        .executeTakeFirstOrThrow();
      const response = await fhlDb.selectFrom("users")
        .selectAll()
        .limit(args.limit)
        .offset(args.offset)
        .execute();

      const users = response.map((user) => new User(user));
      return new UsersList(args, total.all_users || 0, users);
    } catch (e: unknown) {
      console.error(e);
      return new ApiError(1003, e.toString());
    }
  }
}
