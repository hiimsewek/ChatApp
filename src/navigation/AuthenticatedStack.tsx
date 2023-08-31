import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chats, ChatRoom, NewChat, NewGroupChat } from "screens";
import { ThemeContext } from "contexts";
import { AuthenticatedStackParamsProp } from "types";

const Stack = createNativeStackNavigator<AuthenticatedStackParamsProp>();

const AuthenticatedStack = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{ title: "New Chat" }}
      />
      <Stack.Screen
        name="NewGroupChat"
        component={NewGroupChat}
        options={{ title: "New Group Chat" }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
