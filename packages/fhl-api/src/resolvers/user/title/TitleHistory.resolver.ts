import { FHLContext } from "@/domain/Context";
import { TitleChange } from "@/domain/League";
import { User } from "@/domain/User";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class TitleHistoryResolver extends BaseResolver {
    protected resolver(
        parent: User,
        args: never,
        context: FHLContext
    ): Promise<TitleChange[]> {
        
    }
}