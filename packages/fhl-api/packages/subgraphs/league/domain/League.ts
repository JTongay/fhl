import { Leagues } from "@fhl/core/src/sql.generated";
import { ApiError } from "@/domain";
import { Reference } from "@/graphql/resolvers/BaseReferenceResolver";
import { Nullable } from "@/utils";
import { Selectable } from "kysely";

export class LeagueApiErrorExtension extends ApiError {
    subgraph = "league"
    constructor(code: number, stack: Nullable<string>) {
        super(code, stack)
    }
}

export interface LeagueApiErrorReference extends Reference {
    code: number;
    subgraph: "league"
}

export class League {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<Leagues>) {
        this.id = response.id.toString()
        this.name = response.name;
        this.createdAt = response.created_at;
        this.updatedAt = response.updated_at;
    }
}

export type LeagueResponse = League | LeagueApiErrorExtension