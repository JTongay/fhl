import {Kysely, Selectable, sql} from "kysely";
import {Database, Users} from "@fhl/core/src/sql.generated";
import {CreateUserParams, UpdateUserParams} from "@/domain/User";
import {Pagination} from "@/util";

export class UserRepository {
  constructor(private db: Kysely<Database>) {}
  async createUser(user: CreateUserParams): Promise<Selectable<Users>> {
    return this.db
        .insertInto("users")
        .values({
          first_name: user.firstName,
          last_name: user.lastName,
          gamertag: user.gamertag,
          email: user.email,
          idp_id: user.idpId,
          avatar_url: user.avatarUrl,
          last_sign_in_at: user.lastSignInAt,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
  }

  async getUsers(ids: number[]): Promise<Selectable<Users>[]> {
    return this.db.selectFrom("users").where("id", "in", ids).selectAll().execute();
  }

  async getUsersPaginated(pagination: Pagination): Promise<Selectable<Users>[]> {
    return this.db.selectFrom("users")
        .offset(pagination.offset)
        .limit(pagination.limit)
        .selectAll()
        .execute();
  }
  async updateUser(user: UpdateUserParams): Promise<Selectable<Users>> {
    return this.db.updateTable("users")
        .where("id", "=", +user.userId)
        .set({
          first_name: user.firstName,
          last_name: user.lastName,
          gamertag: user.gamertag,
          email: user.email,
          updated_at: sql`now()`,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
  }
}
