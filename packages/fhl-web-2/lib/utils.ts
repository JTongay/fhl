import { FetchResult, MutationFunctionOptions } from "@apollo/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MutateFn<TData, TVariables> = (
  options?: MutationFunctionOptions<TData, TVariables>
) => Promise<FetchResult<TData>>;
