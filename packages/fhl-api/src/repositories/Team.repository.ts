import {
  AddPlayerToTeamParams,
  AddTeamToSeasonParams,
  CreateTeamParams,
  LeagueTeam,
  RemovePlayerFromTeamParams,
  SeasonTeam,
  Team,
  UpdateTeamParams,
} from "@/domain/Team";
import { fhlDb } from "@fhl/core/src/db";
import { sql } from "kysely";

export interface TeamTable {
  id: number;
  player_ids: number[];
  captain_id: number;
  season_id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  wins: number;
  losses: number;
  league_id: number;
}

export class TeamRepository {
  public async getTeamsForSeason(seasonId: string): Promise<SeasonTeam[]> {
    const result = await fhlDb
      .selectFrom("user_team_season")
      .innerJoin("teams", "teams.id", "user_team_season.season_id")
      .innerJoin(
        "team_season",
        "team_season.season_id",
        "user_team_season.season_id",
      )
      .select([
        "player_id",
        "season_id",
        "teams.id",
        "teams.name",
        "teams.league_id",
        "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
        "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
        "team_season.wins",
        "team_season.losses",
        "team_season.captain_id",
      ])
      .where("season_id", "=", +seasonId)
      .execute();

    const playerIds = result.map((team) => team.player_id);
    return result.map((team) => {
      const teamData = { ...team, player_ids: playerIds };
      return new SeasonTeam(teamData);
    });
  }

  public async getTeamForSeason({
    seasonId,
    teamId,
  }: {
    seasonId: string;
    teamId: string;
  }): Promise<SeasonTeam> {
    const result = await fhlDb
      .selectFrom("user_team_season")
      .innerJoin("teams", "teams.id", "user_team_season.season_id")
      .innerJoin(
        "team_season",
        "team_season.season_id",
        "user_team_season.season_id",
      )
      .select([
        "player_id",
        "season_id",
        "teams.id",
        "teams.name",
        "teams.league_id",
        "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
        "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
        "team_season.wins",
        "team_season.losses",
        "team_season.captain_id",
      ])
      .where("season_id", "=", +seasonId)
      .where("team_id", "=", +teamId)
      .execute();

    const playerIds = result.map((team) => team.player_id);
    const teamData = { ...result[0], player_ids: playerIds };
    return new SeasonTeam(teamData);
  }

  public async getTeamsForLeague(leagueId: string): Promise<LeagueTeam[]> {
    const result = await fhlDb
      .selectFrom("user_team_season")
      .innerJoin("teams", "teams.id", "user_team_season.team_id")
      .innerJoin(
        "team_season",
        "team_season.season_id",
        "user_team_season.season_id",
      )
      .select([
        "player_id",
        "team_season.season_id",
        "teams.id",
        "teams.name",
        "teams.league_id",
        "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
        "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
        "team_season.wins",
        "team_season.losses",
        "team_season.captain_id",
      ])
      .where("teams.league_id", "=", +leagueId)
      .execute();

    const playerIds = result.map((team) => team.player_id);
    return result.map((team) => {
      const teamData = { ...team, player_ids: playerIds };
      return new LeagueTeam(teamData);
    });
  }

  public async getTeamForLeague({
    leagueId,
    teamId,
  }: {
    leagueId: string;
    teamId: string;
  }): Promise<LeagueTeam> {
    const result = await fhlDb
      .selectFrom("user_team_season")
      .innerJoin("teams", "teams.id", "user_team_season.team_id")
      .innerJoin(
        "team_season",
        "team_season.season_id",
        "user_team_season.season_id",
      )
      .select([
        "player_id",
        "season_id",
        "teams.id",
        "teams.name",
        "teams.league_id",
        "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
        "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
        "team_season.wins",
        "team_season.losses",
        "team_season.captain_id",
      ])
      .where("teams.league_id", "=", +leagueId)
      .where("teams.id", "=", +teamId)
      .execute();

    const playerIds = result.map((team) => team.player_id);
    const teamData = { ...result[0], player_ids: playerIds };

    return new LeagueTeam(teamData);
  }

  public async getUserTeamHistory(userId: string): Promise<LeagueTeam[]> {
    const result = await fhlDb
      .selectFrom("user_team_season")
      .innerJoin("teams", "teams.id", "user_team_season.team_id")
      .innerJoin(
        "team_season",
        "team_season.season_id",
        "user_team_season.season_id",
      )
      .select([
        "player_id",
        "season_id",
        "teams.id",
        "teams.name",
        "teams.league_id",
        "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
        "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
        "team_season.wins",
        "team_season.losses",
        "team_season.captain_id",
      ])
      .where("player_id", "=", +userId)
      .where("captain_id", "=", +userId)
      .execute();

    const playerIds = result.map((team) => team.player_id);

    return result.map((team) => {
      const teamData = { ...team, player_ids: playerIds };
      return new LeagueTeam(teamData);
    });
  }

  public async createTeam(params: CreateTeamParams): Promise<Team> {
    const result = await fhlDb
      .insertInto("teams")
      .values({
        name: params.name,
        league_id: +params.leagueId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Team(result);
  }

  public async addTeamToSeason(params: AddTeamToSeasonParams): Promise<string> {
    const result = await fhlDb
      .insertInto("team_season")
      .values({
        captain_id: +params.captainId,
        season_id: +params.seasonId,
        team_id: +params.teamId,
      })
      .returning(["id"])
      .executeTakeFirstOrThrow();

    return result.id.toString();
  }

  public async countTeamsToSeason(seasonId: number): Promise<number> {
    const { count } = fhlDb.fn;
    const result = await fhlDb
      .selectFrom("team_season")
      .where("season_id", "=", seasonId)
      .select(count<number>("id").as("teams"))
      .executeTakeFirst();
    return result?.teams || 0;
  }

  public async updateTeam(params: UpdateTeamParams): Promise<Team> {
    const result = await fhlDb
      .updateTable("teams")
      .where("id", "=", +params.teamId)
      .set({
        name: params.name,
        updated_at: sql`now()`,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Team(result);
  }

  public async addPlayerToTeam(params: AddPlayerToTeamParams): Promise<string> {
    const result = await fhlDb
      .insertInto("user_team_season")
      .values({
        season_id: +params.seasonId,
        team_id: +params.teamId,
        player_id: +params.playerId,
      })
      .returning(["id"])
      .executeTakeFirstOrThrow();

    return result.id.toString();
  }

  public async removePlayerFromTeam(
    params: RemovePlayerFromTeamParams,
  ): Promise<boolean> {
    await fhlDb
      .deleteFrom("user_team_season")
      .where("player_id", "=", +params.playerId)
      .where("season_id", "=", +params.seasonId)
      .where("team_id", "=", +params.teamId)
      .executeTakeFirst();

    return true;
  }
}
