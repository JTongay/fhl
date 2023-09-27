import { BaseContext } from "@/domain/Context";
import { Season } from "@/domain/Season";
import { Storyline, StorylineResponse } from "@/domain/Storyline";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { fhlDb } from "@fhl/core/src/db";

export class StorylineResolver extends BaseResolver {
    protected async resolver(
        parent: Season,
        args: never,
        context: BaseContext
    ): Promise<StorylineResponse> {
        try {
            const response = await fhlDb.selectFrom("user_storyline")
                .innerJoin("users", "users.id", "user_id")
                .innerJoin("storylines", "storylines.id", "storyline_id")
                .where("storylines.id", "=", +parent.id)
                .selectAll()
                .executeTakeFirst()

            return new Storyline(response);
        } catch (e: unknown) {
            return new ApiError(6004, e.toString())
        }
    }
}