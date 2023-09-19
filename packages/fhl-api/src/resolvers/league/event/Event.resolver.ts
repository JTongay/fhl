import { BaseContext } from "@/domain/Context";
import { Event, EventResponse } from "@/domain/Event";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { fhlDb } from "@fhl/core/src/db";

export class EventResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<EventResponse> {
        try {
            const response = await fhlDb.selectFrom("events")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow()
            return new Event(response)
        } catch (e: unknown) {
            return new ApiError(5002, e.toString())
        }
    }
}