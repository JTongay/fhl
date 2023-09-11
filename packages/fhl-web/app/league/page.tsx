"use client"

import { GET_BOOYAH } from "../../operations/queries/getBooyahQuery";
import { useQuery } from "@apollo/client";
import { PropsWithChildren } from "react";

export default function League(props: PropsWithChildren) {
    const { data, loading, error } = useQuery(GET_BOOYAH)

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        throw error
    }

    if (data) {
        return <h1>{data.booyah}</h1>
    }

    return (
        <section>
            <h1>This is the League page</h1>
        </section>
    )
}