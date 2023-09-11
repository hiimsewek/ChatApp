import { FlatList } from "react-native";
import React from "react";
import Message from "../Message/Message";
import { ChatType, MessageData, User } from "types";
import styles from "./styles";
import {
  getMessageDisplayOptions,
  getSenderDataById,
  mapReadByUidToItsData,
} from "./helpers";

type MessagesListProps = {
  messages: MessageData[];
  chatType: ChatType;
  membersInfo: User[];
};

const MessagesList = ({
  messages,
  chatType,
  membersInfo,
}: MessagesListProps) => {
  return (
    <FlatList
      inverted
      showsVerticalScrollIndicator={false}
      style={styles.listSpacing}
      contentContainerStyle={styles.listContentStyle}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({
        item: { id, readBy, role, sentBy, sentAt, text },
        index,
      }) => {
        const { showSenderName, showSenderPhoto, showReadBy, messageSpacing } =
          getMessageDisplayOptions(messages, index, chatType);

        const sender = getSenderDataById(sentBy, membersInfo);
        const mappedReadBy = mapReadByUidToItsData(readBy, membersInfo);

        return (
          <Message
            item={{
              id,
              text,
              sender,
              sentAt,
              readBy: mappedReadBy,
              role,
            }}
            displayOptions={{
              showSenderName,
              showSenderPhoto,
              showReadBy,
              messageSpacing,
            }}
          />
        );
      }}
    />
  );
};

export default MessagesList;
