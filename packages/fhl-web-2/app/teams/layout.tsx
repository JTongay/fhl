import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function TeamsLayout({ children }: Props) {
  return <div className="flex flex-col">{children}</div>;
}
