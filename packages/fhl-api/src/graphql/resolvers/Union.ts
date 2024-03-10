import { typeResolverMap } from "@/resolvers/base/ResolverMap";
import { GameResponseResolver } from "@/resolvers/game/GameResponse.resolver";
import { GamesResponseResolver } from "@/resolvers/game/GamesResponse.resolver";
import { LeagueResponseResolver } from "@/resolvers/league/LeagueResponse.resolver";
import { EventResponseResolver } from "@/resolvers/league/event/EventResponse.resolver";
import { EventsResponseResolver } from "@/resolvers/league/event/EventsResponse.resolver";
import { SeasonResponseResolver } from "@/resolvers/season/SeasonResponse.resolver";
import { SeasonsResponseResolver } from "@/resolvers/season/SeasonsResponse.resolver";
import { AwardResponseResolver } from "@/resolvers/season/award/AwardResponse.resolver";
import { AwardsResponseResolver } from "@/resolvers/season/award/AwardsResponse.resolver";
import { StorylineResponseResolver } from "@/resolvers/season/storyline/StorylineResponse.resolver";
import { StorylinesResponseResolver } from "@/resolvers/season/storyline/StorylinesResponse.resolver";
import { CreateTeamResponseResolver } from "@/resolvers/season/team/CreateTeamResponse.resolver";
import { SeasonTeamResponseResolver } from "@/resolvers/season/team/SeasonTeamResponse.resolver";
import { UpdateTeamResponseResolver } from "@/resolvers/season/team/UpdateTeamResponse.resolver";
import { UserResponseResolver } from "@/resolvers/user/UserResponse.resolver";
import { UsersResponseResolver } from "@/resolvers/user/UsersResponse.resolver";

export const Unions = typeResolverMap({
  UserResponse: new UserResponseResolver(),
  UsersResponse: new UsersResponseResolver(),
  GameResponse: new GameResponseResolver(),
  GamesResponse: new GamesResponseResolver(),
  LeagueResponse: new LeagueResponseResolver(),
  SeasonResponse: new SeasonResponseResolver(),
  SeasonsResponse: new SeasonsResponseResolver(),
  EventResponse: new EventResponseResolver(),
  EventsResponse: new EventsResponseResolver(),
  StorylinesResponse: new StorylinesResponseResolver(),
  StorylineResponse: new StorylineResponseResolver(),
  AwardsResponse: new AwardsResponseResolver(),
  AwardResponse: new AwardResponseResolver(),
  TeamResponse: new SeasonTeamResponseResolver(),
  CreateTeamResponse: new CreateTeamResponseResolver(),
  UpdateTeamResponse: new UpdateTeamResponseResolver()
});
