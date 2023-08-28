"use client"

import { PropsWithChildren } from "react";

export default function Error(props: PropsWithChildren) {
    console.log(props, "error props")
    return (
        <>
            {console.log(props, "error props")}
            <h1>Error in the users</h1>
        </>
    )
}