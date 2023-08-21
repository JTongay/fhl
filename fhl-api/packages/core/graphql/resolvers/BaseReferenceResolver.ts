import { BaseContext } from "../context";

export interface Reference {
    __typename: string;
}

export abstract class BaseReferenceResolver<
    Ref = Reference,
    Context = BaseContext,
    ReturnType = unknown
> {
    resolve(
        reference: Ref,
        context: Context
    ): ReturnType | Promise<ReturnType> {
        return this.resolveReference(reference, context);
    }

    protected abstract resolveReference(
        reference: Ref,
        context: Context
    ): ReturnType | Promise<ReturnType>;
}
