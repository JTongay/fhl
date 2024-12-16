import { FHL, FHLContext } from "@/context/FHLContext";
import { useContext } from "react";

export function useFhl(): FHL {
  const fhl = useContext(FHLContext);

  if (!fhl) {
    throw new Error("fhl not set in the context!");
  }

  return fhl;
}
