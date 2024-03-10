import type { ColumnType } from "kysely";

export type Console = "pc" | "ps4" | "ps5" | "switch" | "xbox";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Awards {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface AwardSeason {
  id: Generated<number>;
  award_id: number;
  winning_user_id: number | null;
  presenter_id: number | null;
  season_id: number;
}

export interface Consoles {
  id: Generated<number>;
  name: Console;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Events {
  id: Generated<number>;
  name: string;
  is_active: Generated<boolean>;
  league_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Games {
  id: Generated<number>;
  trailer: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Leagues {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Platforms {
  id: Generated<number>;
  store_link: string;
  console: Console;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Seasons {
  id: Generated<number>;
  year: number;
  is_active: Generated<boolean>;
  league_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Storylines {
  id: Generated<number>;
  description: string;
  season_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Teams {
  id: Generated<number>;
  name: string;
  wins: Generated<number>;
  losses: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  id: Generated<number>;
  gamertag: string;
  first_name: string;
  last_name: string;
  email: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  idp_id: string | null;
  avatar_url: string | null;
  last_sign_in_at: Generated<Timestamp | null>;
}

export interface UserStoryline {
  id: Generated<number>;
  user_id: number;
  storyline_id: number;
}

export interface Database {
  award_season: AwardSeason;
  awards: Awards;
  consoles: Consoles;
  events: Events;
  games: Games;
  leagues: Leagues;
  platforms: Platforms;
  seasons: Seasons;
  storylines: Storylines;
  teams: Teams;
  user_storyline: UserStoryline;
  users: Users;
}
