import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import useChats from "./useChats";
import { Center, Wrapper } from "components";
import { ChatsList } from "./components";

const Chats = () => {
  const { chats } = useChats();

  if (!chats)
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );

  return chats.length > 0 ? (
    <Wrapper>
      <ChatsList data={chats} />
    </Wrapper>
  ) : (
    <Center>
      <Text>You currently do not have any active chats</Text>
    </Center>
  );
};

export default Chats;
