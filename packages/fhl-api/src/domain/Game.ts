import {Games} from "@fhl/core/src/sql.generated";
import {Selectable} from "kysely";
import {ApiError} from "./errors/FHLApiError";
import {PaginatedResponse, Pagination} from "@/util";

export class Game {
  id: string;
  trailer: string;
  availableOn: Platform[];
  createdAt: Date;
  updatedAt: Date;

  constructor(response: Selectable<Games>) {
    this.id = response.id.toString();
    this.trailer = response.trailer;
    this.createdAt = response.created_at;
    this.updatedAt = response.updated_at;
  }
}

export interface Platform {
    storeLink: string;
    console: Console;
}

export type GameResponse = Game | ApiError

export class GamesList extends PaginatedResponse<Game> {
  constructor(paginationParams: Pagination, total: number, data: Game[]) {
    super(paginationParams, total, data);
  }
}

export type GamesResponse = GamesList | ApiError
