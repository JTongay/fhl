import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";
import { InputType } from "@/utils";
import { CreateUserParams, User, UserResponse } from "../domain/user";
import { ApiError } from "@/domain";
import { fhlDb } from "../../../../../core/src/db";

export class CreateUserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: InputType<CreateUserParams>,
        context: BaseContext
    ): Promise<UserResponse> {
        try {
            const response = await fhlDb
                .insertInto("users")
                .values({
                    first_name: args.input.firstName,
                    last_name: args.input.lastName,
                    gamertag: args.input.gamertag,
                    email: args.input.email
                })
                .returningAll()
                .executeTakeFirst()
            return new User(response);
        } catch (e: unknown) {
            return new ApiError(101, e.toString());
        }

    }
}