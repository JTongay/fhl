export type Nullable<T> = T | null;

export type InputType<T> = {
    input: T;
}

export interface Pagination {
    limit: number;
    offset: number;
}

export class PaginatedResponse<T> {
    limit: number;
    offset: number;
    total: number;
    data: T[];

    constructor(
        limit: number,
        offset: number,
        total: number,
        data: T[]
    ) {
        this.limit = limit
        this.offset = offset
        this.total = total
        this.data = data;
    }
}