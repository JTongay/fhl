import { BaseContext } from "@/graphql/context";
import { BaseReferenceResolver, Reference } from "@/graphql/resolvers/BaseReferenceResolver";
import { UserExtension, UserReference } from "../../domain/User";

export class UserExtensionResolver extends BaseReferenceResolver {
    protected resolveReference(
        reference: UserReference,
        context: BaseContext
    ): UserExtension {
        return {
            id: reference.id,
            wins: 1,
            losses: 12
        }
    }
}