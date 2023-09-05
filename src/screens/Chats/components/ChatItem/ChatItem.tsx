import { View, Text, useWindowDimensions } from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-paper";
import { PressableItem } from "components";
import { MessageDetails } from "../MessageDetails";
import styles from "./styles";
import { AuthenticatedStackParamsProp, ChatInfo } from "types";
import { ThemeContext } from "contexts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type NavigationType = NativeStackNavigationProp<AuthenticatedStackParamsProp>;

export default function ChatItem({
  id,
  photoURL,
  name,
  message: { isRead, sentAt, text },
}: ChatInfo) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const navigation = useNavigation<NavigationType>();

  const { width } = useWindowDimensions();
  const containerWidth = width - 100;

  const fontWeight = isRead ? "400" : "bold";

  return (
    <PressableItem
      onPress={() => {
        navigation.navigate("ChatRoom", { chatId: id });
      }}
      style={styles.chatItemContainer}
    >
      <Avatar.Image
        source={{ uri: photoURL }}
        size={50}
        style={styles.avatarSpacing}
      />
      <View style={[{ width: containerWidth }, styles.chatInfoAlignment]}>
        <Text
          style={[
            styles.chatNameText,
            { color: colors.onBackground, fontWeight },
          ]}
        >
          {name}
        </Text>

        <MessageDetails isRead={isRead} sentAt={sentAt} text={text} />
      </View>
    </PressableItem>
  );
}
