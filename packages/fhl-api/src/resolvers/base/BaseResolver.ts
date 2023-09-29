import { FHLContext } from "@/domain/Context";
import { FHLApiError } from "@/domain/errors/FHLApiError";
import { NO_AUTH_HEADER } from "@/domain/errors/codes";

abstract class BaseResolver<
    ParentType = any,
    ArgsType = any,
    ReturnType = any
> {
    public resolve = (
        parent: ParentType,
        args: ArgsType,
        context: FHLContext
    ): ReturnType | Promise<ReturnType> => {
        return this.authCheck(parent, args, context);
    };

    private authCheck = (
        parent: ParentType,
        args: ArgsType,
        context: FHLContext
    ): ReturnType | Promise<ReturnType> => {
        // if (!context.authToken) {
        //   throw new FHLApiError({
        //     code: NO_AUTH_HEADER,
        //     message: "Missing Authorization Header",
        //   });
        // }

        return this.resolver(parent, args, context);
    };

    protected getAuthToken = (context: FHLContext): string => {
        if (!context.authToken) {
            throw new FHLApiError({
                code: NO_AUTH_HEADER,
                message: "Missing Authorization Header",
            });
        }

        return context.authToken;
    };

    protected abstract resolver(
        parent: ParentType,
        args: ArgsType,
        context: FHLContext
    ): ReturnType | Promise<ReturnType>
}

export { BaseResolver };