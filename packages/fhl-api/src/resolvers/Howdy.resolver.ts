import { BaseContext } from "@/domain/Context";
import { BaseResolver } from "./base/BaseResolver";

export class HowdyResolver extends BaseResolver {
    protected resolver(parent: any, args: { id: string }, context: BaseContext): string {
        return args.id
    }
}