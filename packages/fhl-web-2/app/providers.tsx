"use client";

import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { GraphQLProvider } from "@/app/graphQLProvider";
import { FHLContextProvider } from "@/context/FHLContext";

export function Providers({ children }: PropsWithChildren) {
  /**
  Yes, it's completely fine to expose the NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
  This is by design and follows a common pattern used by many authentication
  and API services (like Stripe, which also has publishable and secret keys).
  Here's why it's safe:

  Publishable keys are specifically designed for client-side use
  They have limited capabilities and can only perform non-sensitive operations
  They can't be used to access protected resources or perform administrative
  actions. They often contain client-side specific features like
  initialization of UI components

  The publishable key is used for things like:

  - Initializing the Clerk provider
  - Loading the authentication UI
  - Managing client-side session state
  - Handling public authentication flows
  */
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <GraphQLProvider>
        <FHLContextProvider>{children}</FHLContextProvider>
      </GraphQLProvider>
    </ClerkProvider>
  );
}
