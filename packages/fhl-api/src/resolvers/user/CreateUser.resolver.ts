import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { Input } from "@/util";
import { CreateUserParams, User, UserResponse } from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";
import { fhlDb } from "@fhl/core/src/db";

export class CreateUserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: Input<CreateUserParams>,
        context: FHLContext
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
                .executeTakeFirstOrThrow()
            return new User(response);
        } catch (e: unknown) {
            return new ApiError(101, e.toString())
        }
    }
}