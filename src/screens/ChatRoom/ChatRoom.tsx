import React from "react";
import { Center, Wrapper } from "components";
import useChatRoom from "./useChatRoom";
import { ActivityIndicator } from "react-native-paper";
import { MessagesList, NewMessage } from "./components";

const ChatRoom = () => {
  const {
    messages,
    chatRoomInfo,
    newMessage,
    newMessageChangeHandler,
    sendMessage,
  } = useChatRoom();

  return (
    <Wrapper>
      {messages && chatRoomInfo ? (
        <MessagesList
          messages={messages}
          chatType={chatRoomInfo.chatType}
          membersInfo={chatRoomInfo.members}
        />
      ) : (
        <Center>
          <ActivityIndicator size="large" />
        </Center>
      )}
      <NewMessage
        newMessage={newMessage}
        newMessageChangeHandler={newMessageChangeHandler}
        sendMessage={sendMessage}
      />
    </Wrapper>
  );
};

export default ChatRoom;
