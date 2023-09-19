import { BaseContext } from "@/domain/Context";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { fhlDb } from "@fhl/core/src/db";
import { User } from "@/domain/User";

export class UserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<User> {
        try {
            const response = await fhlDb.selectFrom("users")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow();

            return new User(response);
        } catch (e: unknown) {
            throw e;
        }
    }
}