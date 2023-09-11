import { StyleSheet } from "react-native";

export default StyleSheet.create({
  newMessageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
  },
  inputStyle: {
    width: "90%",
    maxHeight: 80,
    borderRadius: 25,
  },

  inputContentStyle: {
    textAlignVertical: "center",
  },

  sendIcon: {
    padding: 0,
    margin: 0,
    alignSelf: "center",
  },
});
