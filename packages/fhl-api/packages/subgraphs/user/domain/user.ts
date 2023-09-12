import { Users } from "@fhl/core/src/sql.generated";
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

