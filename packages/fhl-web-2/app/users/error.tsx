"use client"

import { PropsWithChildren } from "react";

export default function UsersError(props: PropsWithChildren) {
    console.error(props)
    return (
        <h1>Error fetching users</h1>
    )
}