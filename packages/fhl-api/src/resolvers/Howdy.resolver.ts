import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "./base/BaseResolver";

export class HowdyResolver extends BaseResolver {
    protected resolver(parent: any, args: { id: string }, context: FHLContext): string {
        return args.id
    }
}