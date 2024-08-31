import { PropsWithChildren } from "react";

export const Page = ({ children }: PropsWithChildren) => (
  <div
    className="
  h-full p-0 flex flex-col content-between"
  >
    <div className="grow m-12">{children}</div>
  </div>
);
