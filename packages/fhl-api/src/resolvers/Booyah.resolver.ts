import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class BooyahResolver extends BaseResolver {
    protected resolver(parent: never, args: never, context: FHLContext): string {
        return "Booyah"
    }
}