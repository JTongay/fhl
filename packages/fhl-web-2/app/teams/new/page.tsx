"use client";

import { useCreateTeamMutation } from "@/generated/gql/graphql";
import { NewTeamForm } from "./NewTeamForm";

export default function NewTeamPage() {
  // const { data, loading, error } = useGetFhlTeamsQuery();
  const [createTeamMutation, status] = useCreateTeamMutation();
  return <NewTeamForm submit={createTeamMutation} submitStatus={status} />;
}
