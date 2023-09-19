import { BaseContext } from "@/domain/Context";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class BooyahResolver extends BaseResolver {
    protected resolver(parent: never, args: never, context: BaseContext): string {
        return "Booyah"
    }
}