import { Leagues } from "@/db/types";
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
    constructor(response: Selectable<Leagues>) {
        this.id = response.id.toString()
    }
}

export type LeagueResponse = League | LeagueApiErrorExtension