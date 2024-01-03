import {Selectable} from "kysely";
import {Users} from "@fhl/core/src/sql.generated";
import {PaginatedResponse, Pagination} from "@/util";
import {ApiError} from "./errors/FHLApiError";


export class User {
  id: string;
  firstName: string;
  lastName: string;
  gamertag: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(response: Selectable<Users>) {
    this.id = response.id.toString();
    this.firstName = response.first_name;
    this.lastName = response.last_name;
    this.gamertag = response.gamertag;
    this.email = response.email;
    this.createdAt = response.created_at;
    this.updatedAt = response.updated_at;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export type UserResponse = User | ApiError;

export class UsersList extends PaginatedResponse<User> {
  constructor(paginationParams: Pagination, total: number, data: User[]) {
    super(paginationParams, total, data);
  }
}

export type UsersResponse = UsersList | ApiError

export interface CreateUserParams {
    firstName: string;
    lastName: string;
    gamertag: string;
    email: string;
}

export interface UpdateUserParams extends CreateUserParams {
    userId: string;
}
