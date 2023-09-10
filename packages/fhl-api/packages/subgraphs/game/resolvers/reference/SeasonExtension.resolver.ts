import { BaseContext } from "@/graphql/context";
import { BaseReferenceResolver, Reference } from "@/graphql/resolvers/BaseReferenceResolver";
import { GamesList, SeasonExtension, SeasonReference } from "../../domain/game";
import { GamesResolver } from "../Games.resolver";

export class SeasonExtensionResolver extends BaseReferenceResolver {
    protected resolveReference(
        reference: SeasonReference,
        context: BaseContext
    ): { id: string } {
        return {
            id: reference.id
        }
    }
}