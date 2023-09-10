"use client"

import { GET_USERS_QUERY } from "@/operations/queries/getUsersQuery";
import { useQuery } from "@apollo/client";
import { PropsWithChildren } from "react";

export default function Page(props: PropsWithChildren) {
    const { data, loading, error } = useQuery(GET_USERS_QUERY);

    if (loading) {
        return <p>loading</p>
    }

    if (error) {
        throw error
    }

    if (data) {
        if (data.users.__typename === "UsersList") {
            const { users } = data;
            if (users.data.length) {
                users.data.map((user) => (
                    <h1>{user.firstName}</h1>
                ))
            }
        }
        if (data.users.__typename === "ApiError") {
            throw new Error(data.users.stacktrace || "wat");
        }
    }

    return (
        <section>
            <h1 className="text-3xl font-bold underline">Welcome to the Users Page</h1>
        </section>
    )
}