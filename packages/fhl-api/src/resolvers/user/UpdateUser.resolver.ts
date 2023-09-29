import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { UpdateUserParams, User, UserResponse } from "@/domain/User";
import { Input } from "@/util";
import { ApiError } from "@/domain/errors/FHLApiError";
import { fhlDb } from "@fhl/core/src/db";

export class UpdateUserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: Input<UpdateUserParams>,
        context: FHLContext
    ): Promise<UserResponse> {
        try {
            const response = await fhlDb.updateTable("users")
                .set({
                    first_name: args.input.firstName,
                    last_name: args.input.lastName,
                    email: args.input.email,
                    gamertag: args.input.gamertag,
                    updated_at: new Date()
                })
                .where("id", "=", +args.input.userId)
                .returningAll()
                .executeTakeFirstOrThrow()
            return new User(response)
        } catch (e: unknown) {
            return new ApiError(1009, e.toString())
        }
    }
}
