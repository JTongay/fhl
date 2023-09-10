import { BaseContext } from "@/graphql/context";
import { BaseReferenceResolver, Reference } from "@/graphql/resolvers/BaseReferenceResolver";
import { LeagueApiErrorExtension, LeagueApiErrorReference } from "../../domain/League";

export class LeagueApiErrorResolver extends BaseReferenceResolver {
    protected resolveReference(reference: LeagueApiErrorReference, context: BaseContext): LeagueApiErrorExtension {
        return new LeagueApiErrorExtension(reference.code, null);
    }
}