import { Users } from "@/db/types";
import { ApiError } from "@/domain";
import { Nullable, PaginatedResponse, Pagination } from "@/utils";
import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

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
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.gamertag = response.gamertag;
        this.email = response.email;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

export type UserResponse = User | ApiError

export interface CreateUserParams {
    firstName: string;
    lastName: string;
    gamertag: string;
    email: string;
}

export interface UpdateUserParams extends CreateUserParams {
    userId: string;
}

export class UsersList extends PaginatedResponse<User> {
    constructor(
        paginationParams: Pagination,
        total: number,
        response: User[]
    ) {
        super(paginationParams, total, response)
    }
}

export type UsersResponse = UsersList | ApiError;

