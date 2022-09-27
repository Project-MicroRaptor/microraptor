import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AuthGuard } from "../components/AuthGuard/AuthGuard";
import theme from "../theme";

import type { AuthAppProps } from "../types/appProps";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AuthAppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
      </ChakraProvider>
    </SessionProvider>
  );
}
export default MyApp;
