"use client";

import { GET_USERS } from "../../operations/queries/getUsers";
import { useQuery } from "@apollo/client";
import { type GetUsersQuery } from "@/generated/gql/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UsersList = Extract<GetUsersQuery["users"], { __typename: "UsersList" }>;
type UsersError = Extract<GetUsersQuery["users"], { __typename: "ApiError" }>;

function isUsersList(users: UsersList | UsersError): users is UsersList {
  return users.__typename === "UsersList";
}

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    console.error(error);
    throw error;
  }

  if (data) {
    if (isUsersList(data.users)) {
      const { data: usersList } = data.users;
      if (!usersList.length) {
        return (
          <Card className="dark:bg-background">
            <CardContent>
              <CardTitle className="dark:text-primary">
                No users found
              </CardTitle>
            </CardContent>
          </Card>
        );
      }
      return usersList.map((user) => (
        <div key={`${user.gamertag}-${user.id}`}>
          <Card className="w-80">
            <CardHeader>
              <CardTitle>{user.gamertag}</CardTitle>
              <CardContent>Howdy Howdy</CardContent>
            </CardHeader>
          </Card>
        </div>
      ));
    }

    if (error) {
      throw new Error(error || "Unknown error");
    }
  }

  return null;
}
