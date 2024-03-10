import {FHLContext} from "@/domain/Context";
import {FHLLeague} from "@/domain/League";
import {User} from "@/domain/User";
import {BaseResolver} from "@/resolvers/base/BaseResolver";

export class BottomFiveUserRecordsResolver extends BaseResolver {
  protected async resolver(
      parent: FHLLeague,
      args: never,
      context: FHLContext
  ): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
