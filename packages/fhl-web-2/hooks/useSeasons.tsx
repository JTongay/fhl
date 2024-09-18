import { GetSeasonsQuery, SeasonsResponse } from "@/generated/gql/graphql";
import { GET_SEASONS } from "@/operations/queries/getSeasons";
import { useQuery } from "@apollo/client";

type SeasonsList = Extract<
  GetSeasonsQuery["seasons"],
  { __typename: "SeasonsList" }
>;

function isSeasonsList(data: SeasonsResponse): data is SeasonsList {
  return data.__typename === "SeasonsList";
}

export const useSeasons = () => {
  const { data, loading, error, refetch } = useQuery(GET_SEASONS);

  return {
    seasons: data?.seasons,
    loading,
    error,
    refetch,
  };
};
