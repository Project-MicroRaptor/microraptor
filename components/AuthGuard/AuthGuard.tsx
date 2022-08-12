import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: JSX.Element }) {
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();

      if (!session) {
        signIn("auth0");
      }
    }

    fetchSession();
  });

  return children;
}
