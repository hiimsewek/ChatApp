import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/src/types";
import { Role } from "types";

type Colors = MD3Colors & {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
};

const getStyles = (role: Role, colors: Colors, messageSpacing: number) => {
  const sender = role === "sender";
  const receiver = role === "receiver";

  return StyleSheet.create({
    outerContainer: {
      marginTop: messageSpacing,
    },

    messageContainer: {
      maxWidth: "80%",
      flexDirection: "row",
      alignSelf: sender ? "flex-end" : receiver ? "flex-start" : "center",
    },

    messageText: {
      borderRadius: 20,
      overflow: "hidden",
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: sender
        ? colors.primary
        : receiver
        ? colors.inversePrimary
        : "transparent",

      fontSize: sender || receiver ? 16 : 12,
      textAlign: sender || receiver ? "left" : "center",
      color: sender || receiver ? colors.onPrimary : colors.onBackground,
    },

    senderPhotoContainer: {
      width: 36,
      justifyContent: "flex-end",
      marginRight: 5,
    },

    senderPhotoSpacing: {
      marginBottom: -10,
    },

    senderNameSpacing: { marginLeft: 10, marginBottom: 5 },

    sentAtText: { textAlign: "center", fontSize: 12 },
  });
};

export default getStyles;
