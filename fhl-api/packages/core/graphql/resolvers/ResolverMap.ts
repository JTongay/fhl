import { GraphQLResolveInfo } from "graphql/type";
import { BaseContext } from "../context";
import { BaseResolver } from "./BaseResolver";
import { BaseUnionResolver } from "./BaseUnionResolver";
import { Nullable } from "@/utils";
import { BaseReferenceResolver, Reference } from "./BaseReferenceResolver";


type ResolverFn = (parent: any, args: any, context: BaseContext) => any;

type ReferenceFn = (args: any, context: BaseContext) => any;

type UnionResolverFn = (
    value: unknown, context: BaseContext, info: GraphQLResolveInfo
) => Nullable<string>;

type ReferenceResolverFn = (
    reference: Reference, context: BaseContext
) => unknown;

export interface FieldOutput {
    [field: string]: ResolverFn | ReferenceFn;
}

export interface ResolverMapOutput {
    [parent: string]: FieldOutput;
}

export interface ResolverMapInput {
    [parent: string]: {
        [field: string]: BaseResolver;
    };
}

interface TypeResolverInput {
    [field: string]: BaseUnionResolver
}

interface TypeResolverOutput {
    [field: string]: { [field: string]: UnionResolverFn }
}

interface ReferenceResolverInput {
    [field: string]: BaseReferenceResolver;
}

interface ReferenceResolverOutput {
    [field: string]: { [field: string]: ReferenceResolverFn }
}

/*
    Since we typed our resolvers as BaseResolver, we need to convert them to a resolver function that can be used by Apollo.
*/
const resolverMap = (resolverInput: ResolverMapInput): ResolverMapOutput => {
    let output: ResolverMapOutput = {};

    Object.keys(resolverInput).forEach((resolverParentName) => {
        let parentOutput: FieldOutput = {};

        const resolverParent = resolverInput[resolverParentName];

        Object.keys(resolverParent).forEach((resolverField) => {
            const value = resolverParent[resolverField];

            parentOutput[resolverField] = value.resolve;
        });

        output[resolverParentName] = parentOutput;
    });

    console.log(output);
    return output;
};

const typeResolverMap = (
    resolverInput: TypeResolverInput
): TypeResolverOutput => {
    const output: TypeResolverOutput = {};
    Object.keys(resolverInput).forEach((typeName) => {
        const value = resolverInput[typeName];
        output[typeName] = { __resolveType: value._resolveType }
    })

    return output;
}

const referenceResolverMap = (
    resolverInput: ReferenceResolverInput
): ReferenceResolverOutput => {
    return Object.keys(resolverInput).reduce((acc, currentValue) => {
        return acc[currentValue] = { __resolveReference: resolverInput[currentValue].resolve }
    }, {})
}

export { resolverMap, typeResolverMap, referenceResolverMap };