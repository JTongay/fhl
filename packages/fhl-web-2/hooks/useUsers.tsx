import { GetUsersQuery } from "@/generated/gql/graphql";
import { GET_USERS } from "@/operations/queries/getUsers";
import { useQuery } from "@apollo/client";

type UsersList = Extract<GetUsersQuery["users"], { __typename: "UsersList" }>;
type UsersError = Extract<GetUsersQuery["users"], { __typename: "ApiError" }>;

function isUsersList(users: UsersList | UsersError): users is UsersList {
  return users.__typename === "UsersList";
}

export const useUsers = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  const refresh = () => refetch();

  return {
    users: data?.users,
    loading,
    error,
    refresh,
  };
};
