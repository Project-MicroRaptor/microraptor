import { Spinner } from "@chakra-ui/react";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import styles from "./AuthGuard.module.scss";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();

      if (!session) {
        signIn("auth0");
        return false;
      }

      return true;
    };

    fetchSession().then((session) => setHasSession(session));
  }, [setHasSession]);

  if (!hasSession) {
    return (
      <div className={styles.spinner}>
        <Spinner
          margin="auto"
          width="200px"
          height="200px"
          thickness="12px"
          color="brand.primary"
          emptyColor="gray.200"
          speed="1s"
        />
      </div>
    );
  }

  return children;
}
