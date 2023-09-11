import { Timestamp } from "firebase/firestore";
import { MD3Theme } from "react-native-paper";
import { NavigationTheme } from "react-native-paper/lib/typescript/src/types";

export type Theme = MD3Theme & NavigationTheme;
export type ThemeMode = "light" | "dark";

export type AuthStackParamsProp = {
  Login: undefined;
  Signup: undefined;
};
export type AuthenticatedStackParamsProp = {
  Chats: undefined;
  NewChat: undefined;
  NewGroupChat: undefined;
  ChatRoom: { chatId: string };
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = LoginFormData & {
  username: string;
  confirmPassword: string;
};

export type User = {
  uid: string;
  username: string;
  photoURL: string;
};

export type UserWithoutUid = Omit<User, "uid">;

export enum ChatType {
  Private = 1,
  Group = 2,
}

export type MessageInfo = {
  text: string;
  sentAt: Date;
  isRead: boolean;
};

export type ChatInfo = {
  id: string;
  photoURL: string;
  name: string;
  message: MessageInfo;
};

export type MessageDocData = {
  text: string;
  sentBy: string;
  sentAt: Timestamp;
  readBy: string[];
};

export type ChatsDocData = {
  chatType: ChatType;
  name: string;
  members: string[];
  owner: string;
  photoURL: string;
  recentMessage: MessageDocData;
};

export type ChatRoomInfo = Omit<ChatsDocData, "members"> & {
  members: User[];
};

export type Role = "sender" | "receiver" | "action";

export type MessageData = Omit<MessageDocData, "sentAt"> & {
  id: string;
  sentAt: Date;
  role: Role;
};
