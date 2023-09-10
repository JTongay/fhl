import { Games } from '@/db/types';
import { ApiError } from '@/domain';
import { Reference } from '@/graphql/resolvers/BaseReferenceResolver';
import { Nullable, PaginatedResponse, Pagination } from '@/utils';
import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export class Game {
    id: string;
    trailer: string;
    availableOn: Platform[];
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<Games>) {
        this.id = response.id.toString();
        this.trailer = response.trailer;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
    }
}

export interface GameApiReference extends Reference {
    code: number;
    subgraph: string;
}

export class GameApiExtension extends ApiError {
    subgraph = "Game";
    constructor(code: number, stack: Nullable<string>) {
        super(code, stack);
    }
}

export interface SeasonReference extends Reference {
    id: string;
}

export interface SeasonExtension {
    id: string;
    games: GamesResponse;
}

export type GameResponse = Game | GameApiExtension;

export interface Platform {
    storeLink: string;
    console: Console;
}

export enum Console {
    PC = "pc",
    XBOX = "xbox",
    PS5 = "ps5",
    PS4 = "ps4",
    SWITCH = "switch"
}

export class GamesList extends PaginatedResponse<Game> {
    constructor(
        paginationParams: Pagination,
        total: number,
        response: Game[]
    ) {
        super(paginationParams, total, response)
    }
}

export type GamesResponse = GamesList | GameApiExtension