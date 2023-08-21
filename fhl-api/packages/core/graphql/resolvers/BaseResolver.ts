import { BaseContext } from "../context";
import { FHLApiError } from "@/domain";
import { NO_AUTH_HEADER } from "@/domain/errorCodes";

abstract class BaseResolver<
  ParentType = any,
  ArgsType = any,
  ReturnType = any
> {
  public resolve = (
    parent: ParentType,
    args: ArgsType,
    context: BaseContext
  ): ReturnType | Promise<ReturnType> => {
    return this.authCheck(parent, args, context);
  };

  private authCheck = (
    parent: ParentType,
    args: ArgsType,
    context: BaseContext
  ): ReturnType | Promise<ReturnType> => {
    // if (!context.authToken) {
    //   throw new FHLApiError({
    //     code: NO_AUTH_HEADER,
    //     message: "Missing Authorization Header",
    //   });
    // }

    return this.resolver(parent, args, context);
  };

  protected getAuthToken = (context: BaseContext): string => {
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
    context: BaseContext
  ): ReturnType | Promise<ReturnType>
}

export { BaseResolver };
