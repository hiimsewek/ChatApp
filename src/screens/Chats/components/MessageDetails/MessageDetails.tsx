import { View } from "react-native";
import React from "react";
import { formatTime, isPastYear } from "utils/time";
import { Text } from "react-native-paper";
import styles from "./styles";
import { MessageInfo } from "types";

const MessageDetails = ({ isRead, sentAt, text }: MessageInfo) => {
  const messageWidth = isPastYear(sentAt) ? "65%" : "80%";
  const fontWeight = isRead ? "400" : "bold";

  return (
    <View style={styles.messageDetailsContainer}>
      <Text
        style={{
          width: messageWidth,
          fontWeight,
        }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {text}
      </Text>
      <Text
        style={[
          {
            fontWeight,
          },
          styles.timestampText,
        ]}
      >
        {formatTime(sentAt)}
      </Text>
    </View>
  );
};

export default MessageDetails;
