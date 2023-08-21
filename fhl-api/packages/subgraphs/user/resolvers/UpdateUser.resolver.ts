import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { InputType } from "@/utils";
import { ApiError, UpdateUserParams, User, UserResponse } from "../domain/user";
import { db } from "@/db";

export class UpdateUserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: InputType<UpdateUserParams>,
        context: BaseContext): Promise<UserResponse> {
        try {
            const response = await db.updateTable("users")
                .set({
                    first_name: args.input.firstName,
                    last_name: args.input.lastName,
                    email: args.input.email,
                    gamertag: args.input.gamertag
                })
                .where("id", "=", +args.input.userId)
                .returningAll()
                .executeTakeFirstOrThrow()
            return new User(response)
        } catch (e: unknown) {
            return new ApiError(1009, e.toString());
        }
    }
}