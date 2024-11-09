import { usePlayersQuery, PlayersQueryResult } from "@/generated/gql/graphql";

function isUsersList(value: PlayersQueryResult) {}

export default function NewSeasonsPage() {
  const { data, error } = usePlayersQuery({
    variables: {
      limit: 15,
      offset: 0,
    },
  });

  if (error) {
    throw error;
  }

  return (
    <>
      <h1>New Season Form</h1>
    </>
  );
}
