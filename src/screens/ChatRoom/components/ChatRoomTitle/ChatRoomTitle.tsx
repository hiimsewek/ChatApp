import { Platform, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { HeaderTitle } from "@react-navigation/elements";
import styles from "./styles";

type ChatRoomTitleProps = {
  name: string;
  photoURL: string;
};

const ChatRoomTitle = ({ name, photoURL }: ChatRoomTitleProps) => {
  return (
    <View style={styles.headerAlignment}>
      <Avatar.Image
        source={{
          uri: photoURL,
        }}
        size={Platform.OS === "ios" ? 40 : 46}
        style={styles.chatPhotoSpacing}
      />
      <HeaderTitle>{name}</HeaderTitle>
    </View>
  );
};

export default ChatRoomTitle;
