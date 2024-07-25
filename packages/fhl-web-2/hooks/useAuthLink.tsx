import { useAuth } from "@clerk/nextjs";
import { setContext } from "@apollo/client/link/context";

export const useAuthLink = () => {
  const auth = useAuth();
  return setContext(async (_, { headers }) => {
    const token = await auth.getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    };
  });
};
