import { View, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "contexts";
import { Avatar, Text } from "react-native-paper";
import { MessageData, User } from "types";
import getStyles from "./styles";
import { formatTimeExtended } from "utils/time";
import { ReadByList } from "../ReadByList";

type MessageItem = Omit<MessageData, "sentBy" | "readBy"> & {
  sender: User;
  readBy: User[];
};

type MessageProps = {
  item: MessageItem;
  displayOptions: {
    showSenderName: boolean;
    showSenderPhoto: boolean;
    showReadBy: boolean;
    messageSpacing: number;
  };
};

const Message = ({
  item: { text, role, sentAt, readBy, sender },
  displayOptions: {
    showSenderName,
    showSenderPhoto,
    showReadBy,
    messageSpacing,
  },
}: MessageProps) => {
  const [msgToggled, setMsgToggled] = useState(false);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = getStyles(role, colors, messageSpacing);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.messageContainer}>
        {role === "receiver" && (
          <View style={styles.senderPhotoContainer}>
            {showSenderPhoto && (
              <Avatar.Image
                source={{ uri: sender.photoURL }}
                size={36}
                style={styles.senderPhotoSpacing}
              />
            )}
          </View>
        )}
        <Pressable
          onPress={() => {
            setMsgToggled(!msgToggled);
          }}
        >
          <View>
            {showSenderName && (
              <Text style={styles.senderNameSpacing}>{sender.username}</Text>
            )}
            <Text style={styles.messageText}>{text}</Text>
            {msgToggled && (
              <Text style={styles.sentAtText}>
                {formatTimeExtended(sentAt)}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      {(showReadBy || msgToggled) && <ReadByList readBy={readBy} />}
    </View>
  );
};

export default Message;
