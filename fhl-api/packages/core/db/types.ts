import type { ColumnType } from "kysely";

export type Console = "pc" | "ps4" | "ps5" | "switch" | "xbox";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Consoles {
  id: Generated<number>;
  name: Console;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Events {
  id: Generated<number>;
  name: string;
  isActive: Generated<boolean>;
  leagueId: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Games {
  id: Generated<number>;
  trailer: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Leagues {
  id: Generated<number>;
  name: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Platforms {
  id: Generated<number>;
  storeLink: string;
  console: Console;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Seasons {
  id: Generated<number>;
  year: number;
  isActive: Generated<boolean>;
  leagueId: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Teams {
  id: Generated<number>;
  name: string;
  wins: Generated<number>;
  losses: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Users {
  id: Generated<number>;
  gamertag: string;
  firstName: string;
  lastName: string;
  email: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface Database {
  consoles: Consoles;
  events: Events;
  games: Games;
  leagues: Leagues;
  platforms: Platforms;
  seasons: Seasons;
  teams: Teams;
  users: Users;
}
