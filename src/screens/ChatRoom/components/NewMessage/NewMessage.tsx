import { View } from "react-native";
import React, { useContext } from "react";
import { IconButton, TextInput } from "react-native-paper";
import { ThemeContext } from "contexts";
import styles from "./styles";
import { KeyboardAvoidance } from "components";

type NewMessageProps = {
  newMessage: string;
  newMessageChangeHandler: (text: string) => void;
  sendMessage: () => void;
};

const NewMessage = ({
  newMessage,
  newMessageChangeHandler,
  sendMessage,
}: NewMessageProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <KeyboardAvoidance>
      <View style={styles.newMessageContainer}>
        <TextInput
          value={newMessage}
          onChangeText={newMessageChangeHandler}
          placeholder="Type a message"
          multiline
          theme={{ roundness: 25 }}
          dense
          style={styles.inputStyle}
          contentStyle={styles.inputContentStyle}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor={colors.primary}
        />
        <IconButton
          icon="send"
          onPress={sendMessage}
          disabled={!newMessage}
          iconColor={colors.primary}
          style={styles.sendIcon}
        />
      </View>
    </KeyboardAvoidance>
  );
};

export default NewMessage;
