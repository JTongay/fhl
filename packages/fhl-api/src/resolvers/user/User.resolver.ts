import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { fhlDb } from "@fhl/core/src/db";
import { User } from "@/domain/User";

export class UserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: FHLContext
    ): Promise<User> {
        try {
            const response = await context.datasources.userDatasource.getUser(+args.id);
            return new User(response);
        } catch (e: unknown) {
            throw e;
        }
    }
}