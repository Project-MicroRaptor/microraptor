import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";
import ChatBrowser from "../../components/MessageBox/ChatBrowser/ChatBrowser";
import NavBar from "../../components/NavBar/NavBar";
import type { AuthNextPage } from "../../types/appProps";
import { MessageGroup } from "../../types/messageGroup";
import { fetcher } from "../../utils/swr";

import styles from "./inbox.module.scss";

type MessageGroupRes = {
  messageGroupInfo: Array<MessageGroup>;
};

const Inbox: AuthNextPage = () => {
  const { data, error } = useSWR<MessageGroupRes>(
    "/api/message-group",
    fetcher
  );
  console.log(data);
  if (!data || error) {
    return (
      <>
        <Head>
          <title>MicroRaptor - Inbox</title>
          <meta name="description" content="Inbox" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <div className={styles.container}>
          <Heading as="h3" size="l" className={styles.heading}>
            500 Error
          </Heading>
        </div>
      </>
    );
  } else
    return (
      <>
        <Head>
          <title>MicroRaptor - Inbox</title>
          <meta name="description" content="Inbox" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <div className={styles.container}>
          <Heading as="h1" size="3xl" className={styles.heading}>
            Inbox
          </Heading>
          <ChatBrowser messageGroups={data.messageGroupInfo}></ChatBrowser>
        </div>
      </>
    );
};
export default Inbox;

Inbox.requireAuth = true;
