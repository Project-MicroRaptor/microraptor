import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LogInOutButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        pos="absolute"
        right="20px"
        bottom="20px"
        onClick={() =>
          signOut({
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/auth/logout`,
          })
        }
      >
        Sign out, {session.user?.name}
      </Button>
    );
  }

  return (
    <Button
      pos="absolute"
      right="20px"
      bottom="20px"
      onClick={() => signIn("auth0")}
    >
      Log in
    </Button>
  );
}
