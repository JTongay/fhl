import { Nullable, PaginatedResponse, Pagination } from "@/utils";
import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface UserTable {
    id: Generated<number>;
    gamertag: string;
    first_name: string;
    last_name: string;
    email: Nullable<string>;
    created_at: ColumnType<Date, string | undefined, never>;
    updated_at: ColumnType<Date, string | undefined, never>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    gamertag: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<UserTable>) {
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

export class ApiError {
    code: number;
    stacktrace: Nullable<string>;

    constructor(code: number, stack: Nullable<string>) {
        this.code = code;
        this.stacktrace = stack;
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
        super(paginationParams.limit, paginationParams.offset, total, response)
    }
}

export type UsersResponse = UsersList | ApiError;

