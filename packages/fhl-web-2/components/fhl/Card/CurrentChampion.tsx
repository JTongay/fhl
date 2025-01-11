import { Avatar, AvatarImage } from "../../ui/avatar";
import { useDashboardQuery } from "@/generated/gql/graphql";

export const CurrentChampion = () => {
  const { data } = useDashboardQuery();

  return (
    <div className="flex row justify-center items-center">
      <Avatar className="mx-2">
        <AvatarImage src="/title-belt.png" />
      </Avatar>
      <h2 className="text-lg text-center">
        Current Champion: {data?.fhl.currentChampion?.gamertag || "Vacant"}
      </h2>
      <Avatar className="mx-2">
        <AvatarImage src="/title-belt.png" />
      </Avatar>
    </div>
  );
};
