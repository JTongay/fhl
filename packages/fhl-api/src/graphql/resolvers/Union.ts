import { typeResolverMap } from "@/resolvers/base/ResolverMap";
import { GameResponseResolver } from "@/resolvers/game/GameResponse.resolver";
import { GamesResponseResolver } from "@/resolvers/game/GamesResponse.resolver";
import { LeagueResponseResolver } from "@/resolvers/league/LeagueResponse.resolver";
import { EventResponseResolver } from "@/resolvers/league/event/EventResponse.resolver";
import { EventsResponseResolver } from "@/resolvers/league/event/EventsResponse.resolver";
import { SeasonResponseResolver } from "@/resolvers/season/SeasonResponse.resolver";
import { SeasonsResponseResolver } from "@/resolvers/season/SeasonsResponse.resolver";
import { StorylineResponseResolver } from "@/resolvers/season/storyline/StorylineResponse.resolver";
import { StorylinesResponseResolver } from "@/resolvers/season/storyline/StorylinesResponse.resolver";
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
    StorylineResponse: new StorylineResponseResolver()
});