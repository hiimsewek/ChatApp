import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-paper";
import styles from "./styles";
import { ThemeContext } from "contexts";
import { UserWithoutUid } from "types";

const UserItem = ({ photoURL, username }: UserWithoutUid) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <View style={[styles.userItemContainer]}>
      <Avatar.Image source={{ uri: photoURL }} size={50} />
      <Text style={[styles.nameSpacing, { color: colors.onBackground }]}>
        {username}
      </Text>
    </View>
  );
};

export default UserItem;
