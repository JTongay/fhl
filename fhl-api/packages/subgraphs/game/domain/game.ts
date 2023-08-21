import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface GameTable {
    id: Generated<number>;
    trailer: string;
    created_at: ColumnType<Date, string | undefined, never>;
    updated_at: ColumnType<Date, string | undefined, never>;
}

export class Game {
    id: string;
    trailer: string;
    availableOn: Platform[];
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<GameTable>) {
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

export enum Console {
    PC = "pc",
    XBOX = "xbox",
    PS5 = "ps5",
    PS4 = "ps4",
    SWITCH = "switch"
}