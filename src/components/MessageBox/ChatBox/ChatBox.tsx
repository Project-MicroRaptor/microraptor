import { Avatar, Box, Heading, HStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { MessageGroup } from "../../../types/messageGroup";
import styles from "./ChatBox.module.scss";

export default function ChatBox(props: MessageGroup) {
  const { data: session } = useSession();
  const otherUsers = props.users.filter((user) => user.id !== session?.user.id);
  return (
    <HStack h="150px" spacing="1" className={styles.container}>
      <Box>
        <Avatar
          className={styles.avatar}
          src={otherUsers[0]?.image}
          size="2xl"
          border="2px solid grey"
        />
      </Box>
      <Box h="100%" w="100%" className={styles.chatinfo}>
        <Heading size="l" className={styles.name}>
          {otherUsers[0]?.name}
        </Heading>
        <p className={styles.msg}>{props.messages[0]?.body}</p>
        <Heading size="l" className={styles.proj}>
          {props.project?.name}
        </Heading>
      </Box>
    </HStack>
  );
}
