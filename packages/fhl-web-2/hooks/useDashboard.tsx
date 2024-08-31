import { GET_DASHBOARD } from "@/operations/queries/getDashboard";
import { useQuery } from "@apollo/client";

export const useDashboard = () => {
  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD);

  const refresh = () => refetch();

  return {
    dashboard: data?.fhl,
    loading,
    error,
    refresh,
  };
};
