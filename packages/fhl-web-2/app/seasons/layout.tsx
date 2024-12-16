import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function SeasonsLayout({ children }: Props) {
  return <div className="space-y-4 mx-4">{children}</div>;
}
