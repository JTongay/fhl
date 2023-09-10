import { GraphQLResolveInfo } from "graphql";
import { BaseContext } from "../context";
import { Nullable } from "@/utils";

export abstract class BaseUnionResolver<
    Value = unknown,
    Context = BaseContext,
    Info = GraphQLResolveInfo
> {
    public _resolveType = (
        value: Value,
        context: Context,
        info: Info
    ): Nullable<string> => {
        return this.resolveType(value, context, info);
    }

    protected abstract resolveType(
        value: Value,
        context: Context,
        info: Info
    ): Nullable<string>
}