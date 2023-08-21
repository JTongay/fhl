import { BaseContext } from "@/graphql/context";
import { BaseResolver } from "@/graphql/resolvers/BaseResolver";

export class GameResolver extends BaseResolver {
    protected resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ) {

    }
}