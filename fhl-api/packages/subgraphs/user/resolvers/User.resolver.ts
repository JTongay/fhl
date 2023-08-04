import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";

export class UserResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<any> {

    }

}