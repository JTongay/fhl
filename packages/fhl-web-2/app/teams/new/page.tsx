"use client";

import { useCreateTeamMutation } from "@/generated/gql/graphql";

export default function NewTeamPage() {
  // const { data, loading, error } = useGetFhlTeamsQuery();
  const test = useCreateTeamMutation({
    variables: {
      input: {
        name: "",
        leagueId: "",
      },
    },
  });
  return (
    <form action="">
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
