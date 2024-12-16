import { useDashboard } from "@/hooks/useDashboard";
import { Avatar, AvatarImage } from "../../ui/avatar";

export const CurrentChampion = () => {
  const { dashboard } = useDashboard();

  return (
    <div className="flex row justify-center items-center">
      <Avatar className="mx-2">
        <AvatarImage src="/title-belt.png" />
      </Avatar>
      <h2 className="text-lg text-center">
        Current Champion: {dashboard?.currentChampion?.gamertag || "Vacant"}
      </h2>
      <Avatar className="mx-2">
        <AvatarImage src="/title-belt.png" />
      </Avatar>
    </div>
  );
};
