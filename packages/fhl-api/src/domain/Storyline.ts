import { PaginatedResponse, Pagination } from "@/util";
import { Storylines } from "@fhl/core/src/sql.generated";
import { Selectable } from "kysely";
import { ApiError } from "./errors/FHLApiError";

export class Storyline {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    seasonId: string;
    userIds: string[];

    constructor(response: Selectable<Storylines>, userIds?: string[]) {
        this.id = response.id.toString();
        this.description = response.description;
        this.createdAt = response.created_at;
        this.updatedAt = response.updated_at;
        this.seasonId = response.season_id.toString();
        this.userIds = userIds || [];
    }
}

export class StorylinesList extends PaginatedResponse<Storyline> {
    constructor(paginationParams: Pagination, total: number, data: Storyline[]) {
        super(paginationParams, total, data)
    }
}

export type StorylineResponse = ApiError | Storyline
export type StorylinesResponse = ApiError | StorylinesList