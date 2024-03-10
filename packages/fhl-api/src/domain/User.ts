<<<<<<< HEAD
import {Selectable} from "kysely";
import {Users} from "@fhl/core/src/sql.generated";
import {Nullable, PaginatedResponse, Pagination} from "@/util";
import {ApiError} from "./errors/FHLApiError";
=======
import { Selectable } from "kysely";
import { Users } from "@fhl/core/src/sql.generated";
import { Nullable, PaginatedResponse, Pagination } from "@/util";
import { ApiError } from "./errors/FHLApiError";
>>>>>>> main


export class User {
  id: string;
  firstName: string;
  lastName: string;
  gamertag: string;
<<<<<<< HEAD
  email: string;
=======
  email: Nullable<string>;
>>>>>>> main
  createdAt: Date;
  updatedAt: Date;

  constructor(response: Selectable<Users>) {
    this.id = response.id.toString();
    this.firstName = response.first_name;
    this.lastName = response.last_name;
    this.gamertag = response.gamertag;
<<<<<<< HEAD
    this.email = response.email;
=======
    this.email = response.email || null;
>>>>>>> main
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
<<<<<<< HEAD
    firstName: string;
    lastName: string;
    gamertag: string;
    email: Nullable<string>;
    idpId: string;
    avatarUrl: Nullable<string>;
    lastSignInAt: Date;
=======
  firstName: string;
  lastName: string;
  gamertag: string;
  email: string;
>>>>>>> main
}


export interface UpdateUserParams extends CreateUserParams {
<<<<<<< HEAD
    userId: string;
=======
  userId: string;
>>>>>>> main
}
