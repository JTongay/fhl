"use client"

import { GET_USERS } from "@/operations/queries/getUsers";
import { useQuery } from "@apollo/client";

export default function Users() {
    const { data, loading, error } = useQuery(GET_USERS);

    if (loading) {
        return <h1>loading</h1>
    }

    if (error) {
        console.error(error)
        throw error;
    }

    if (data) {
        if (data.users.__typename === "UsersList") {
            const { data: usersList } = data.users
            console.log(data.users)
            return usersList.map((user) => {
                <>
                    <h1>{user.gamertag}</h1>
                    <h1>{user.id}</h1>
                </>
            })
        }

        if (data.users.__typename === "ApiError") {
            throw new Error(data.users.stacktrace || "")
        }
    }

    return null;
}