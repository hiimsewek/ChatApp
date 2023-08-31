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
