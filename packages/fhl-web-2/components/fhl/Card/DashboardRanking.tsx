import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DashboardUserRanks } from "@/models/Dashboard";

interface Props {
  type: "bottom" | "top";
  userRankings: DashboardUserRanks;
}

export const DashboardRanking = ({ type, userRankings }: Props) => {
  const title = type === "bottom" ? "Bottom 5" : "Top 5";
  return (
    <Card>
      <CardTitle className="text-center pt-6">{title}</CardTitle>
      <CardContent>
        <section>
          {userRankings?.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between
        py-2 border-b border-gray-300"
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-4">{index + 1}</span>
                <span
                  className="text-gray-800 font-semibold
                overflow-hidden truncate w-64"
                >
                  {user.gamertag}
                </span>
              </div>
              <span className="text-green-500 font-semibold">
                {user.wins}W/{user.losses}L
              </span>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};
