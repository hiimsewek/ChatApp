import { FlatList } from "react-native";
import React from "react";
import { ChatItem } from "../ChatItem";
import styles from "./styles";
import { ChatInfo } from "types";

type ChatsListProps = {
  data: ChatInfo[];
};

const ChatsList = ({ data }: ChatsListProps) => {
  return (
    <FlatList
      style={styles.listSpacing}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <ChatItem
            id={item.id}
            name={item.name}
            photoURL={item.photoURL}
            message={item.message}
          />
        );
      }}
    />
  );
};

export default ChatsList;
