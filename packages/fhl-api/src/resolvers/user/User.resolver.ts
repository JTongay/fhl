import {FHLContext} from "@/domain/Context";
import {BaseResolver} from "@/resolvers/base/BaseResolver";
import {UserResponse} from "@/domain/User";

export class UserResolver extends BaseResolver {
  protected async resolver(
      parent: never,
      args: { id: string },
      context: FHLContext
  ): Promise<UserResponse> {
    return await context.datasources.userDatasource.getUser(+args.id);
  }
}
