import { Reference } from "@/graphql/resolvers/BaseReferenceResolver";

export interface UserReference extends Reference {
    id: string;
}

export interface UserExtension {
    id: string;
    wins: number;
    losses: number;
}