import { Events } from "@fhl/core/src/sql.generated";
import { Selectable } from "kysely";
import { ApiError } from "./errors/FHLApiError";
import { PaginatedResponse, Pagination } from "@/util";

export class Event {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    leagueId: string;

    constructor(response: Selectable<Events>) {
        this.id = response.id.toString()
        this.name = response.name;
        this.isActive = response.is_active;
        this.createdAt = response.created_at;
        this.updatedAt = response.updated_at;
        this.leagueId = response.league_id.toString();
    }
}

export type EventResponse = Event | ApiError

export class EventsList extends PaginatedResponse<Event> {
    constructor(paginationParams: Pagination, total: number, data: Event[]) {
        super(paginationParams, total, data);
    }
}

export type EventsResponse = EventsList | ApiError