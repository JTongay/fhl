import { Seasons } from "@/db/types";
import { Selectable } from "kysely"
import { LeagueApiErrorExtension } from "./League";
import { PaginatedResponse, Pagination } from "@/utils";

export class Season {
    id: string;
    year: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<Seasons>) {
        this.id = response.id.toString();
        this.year = response.year;
        this.isActive = response.isActive;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
    }
}

export type SeasonResponse = LeagueApiErrorExtension | Season;
export type SeasonsResponse = LeagueApiErrorExtension | SeasonsList;

export class SeasonsList extends PaginatedResponse<Season> {
    constructor(paginationParams: Pagination, total: number, data: Season[]) {
        super(paginationParams, total, data)
    }
}