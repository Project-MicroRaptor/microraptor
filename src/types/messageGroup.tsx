import { Message } from "./message";
import { User } from "./user";

export type MessageGroup = {
  id: string;
  users: Array<User>;
  messages: Array<Message>;
  project: {
    name: string;
  };
};
