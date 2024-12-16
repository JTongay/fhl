"use client";

import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { GraphQLProvider } from "@/app/graphQLProvider";
import { FHLContextProvider } from "@/context/FHLContext";

export function Providers({ children }: PropsWithChildren) {
  const clerkKey = process.env.CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <GraphQLProvider>
        <FHLContextProvider>{children}</FHLContextProvider>
      </GraphQLProvider>
    </ClerkProvider>
  );
}
