import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Avatar, Chip as PaperChip } from "react-native-paper";
import styles from "./styles";
import { UserWithoutUid } from "types";

type UserChipProps = UserWithoutUid & {
  onChipRemove: () => void;
  style?: StyleProp<ViewStyle>;
};

const UserChip = ({
  photoURL,
  username,
  onChipRemove,
  style,
}: UserChipProps) => {
  return (
    <PaperChip
      ellipsizeMode="tail"
      style={style}
      textStyle={styles.chipTextContainer}
      avatar={<Avatar.Image source={{ uri: photoURL }} size={24} />}
      closeIcon="close"
      onClose={onChipRemove}
    >
      {username}
    </PaperChip>
  );
};

export default UserChip;
