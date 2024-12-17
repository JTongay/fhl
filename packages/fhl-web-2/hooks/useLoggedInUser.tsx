import { useUser } from "@clerk/nextjs";

export const useLoggedInUser = () => {
  const user = useUser();
  if (!user.isSignedIn) {
    return {
      signedIn: false,
      user: null,
    };
  }
  return {
    signedIn: true,
    user,
  };
};
