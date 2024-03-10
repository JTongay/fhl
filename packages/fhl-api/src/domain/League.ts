import {Leagues} from "@fhl/core/src/sql.generated";
import {Selectable} from "kysely";
import {ApiError} from "./errors/FHLApiError";

export class League {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(response: Selectable<Leagues>) {
    this.id = response.id.toString();
    this.name = response.name;
    this.createdAt = response.created_at;
    this.updatedAt = response.updated_at;
  }
}

export type LeagueResponse = League | ApiError

export interface CreateLeagueParams {
    name: string;
}

export type FHLLeague = {
  league: League;
}
