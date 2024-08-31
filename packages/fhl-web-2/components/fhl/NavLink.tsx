import Link from "next/link";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  to: string;
}

export const NavLink = ({ children, to }: Props) => {
  return (
    <Link
      className="bg-gray-900
                    text-white px-3 py-2 rounded-md text-sm font-medium"
      href={to}
    >
      {children}
    </Link>
  );
};
