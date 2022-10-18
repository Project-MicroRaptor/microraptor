import { MessageGroup } from "../../../types/messageGroup";
import ChatBox from "../ChatBox/ChatBox";

import styles from "./ChatBrowser.module.scss";

type Props = {
  messageGroups: Array<MessageGroup>;
};

export default function ChatBrowser(props: Props) {
  const { messageGroups = [] } = props;
  const chatBoxes = messageGroups?.map((mGroup) => {
    return (
      <div key={mGroup.id} className={styles.chatbox}>
        <ChatBox
          id={mGroup.id}
          messages={mGroup.messages}
          project={mGroup.project}
          users={mGroup.users}
        />
      </div>
    );
  });
  return (
    <div className={styles.flex}>
      <div className={styles.chatboxes}>{chatBoxes}</div>
    </div>
  );
}
