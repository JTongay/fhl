import { useFhlQuery } from "@/generated/gql/graphql";
import { PropsWithChildren, createContext } from "react";

export type FHL = {
  id: string;
  name: string;
};

export const FHLContext = createContext<FHL | null>(null);

export const FHLContextProvider = (props: PropsWithChildren) => {
  const { data, error } = useFhlQuery();

  if (error) {
    console.warn("error fetching FHL data: ", error);
  }

  if (data) {
    return (
      <FHLContext.Provider
        value={{
          id: data.fhl.league.id,
          name: data.fhl.league.name,
        }}
      >
        {props.children}
      </FHLContext.Provider>
    );
  }

  return <>{props.children}</>;
};
