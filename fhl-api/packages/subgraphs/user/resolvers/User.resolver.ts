import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { db } from "@/db";
import { User, UserResponse } from "../domain/user";
import { NoResultError } from "kysely";
import { ApiError } from "@/domain";

export class UserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<UserResponse> {
        try {
            const response = await db.selectFrom("users")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow()
            return new User(response);
        } catch (e: unknown) {
            return new ApiError(100, e.toString());
        }
    }

}