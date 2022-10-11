import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";
import type { AuthNextPage } from "../../types/appProps";

const Inbox: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>MicroRaptor - Inbox</title>
        <meta name="description" content="Inbox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </>
  );
};

export default Inbox;

Inbox.requireAuth = true;
