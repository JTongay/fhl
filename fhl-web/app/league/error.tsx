"use client"

import { PropsWithChildren } from "react";

export default function Error(props: PropsWithChildren) {
    console.log(props)

    return <h1>Error boundary in League</h1>
}