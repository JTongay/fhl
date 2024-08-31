import { GET_SEASONS } from "@/operations/queries/getSeasons";
import { useQuery } from "@apollo/client";

export const useSeasons = () => {
  const { data, loading, error, refetch } = useQuery(GET_SEASONS);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
