import { BaseContext } from "@/graphql/context";
import { BaseReferenceResolver } from "@/graphql/resolvers/BaseReferenceResolver";
import { GameApiExtension, GameApiReference } from "../../domain/game";

export class GameApiErrorResolver extends BaseReferenceResolver {
    protected resolveReference(reference: GameApiReference, context: BaseContext): GameApiExtension {
        return new GameApiExtension(reference.code, null);
    }
}