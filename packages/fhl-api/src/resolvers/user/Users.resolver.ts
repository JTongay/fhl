import {FHLContext} from "@/domain/Context";
import {BaseResolver} from "../base/BaseResolver";
import {Nullable, Pagination} from "@/util";
import {UsersResponse} from "@/domain/User";
import {Storyline} from "@/domain/Storyline";
// import {Award} from "@/domain/Award";

// function isAward(params: Storyline | Award): params is Award {

// }


export class UsersResolver extends BaseResolver {
  protected async resolver(
      parent: Nullable<Storyline>,
      args: Pagination,
      context: FHLContext
  ): Promise<UsersResponse> {
    return await context.datasources.userDatasource.getUsersPaginated(args);
  }
}
