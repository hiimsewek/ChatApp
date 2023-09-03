import React from "react";
import { PressableItem, UserItem } from "components";
import { IconButton } from "react-native-paper";
import { User } from "types";
import styles from "./styles";

type SelectableUserProps = {
  item: User;
  onUserPress: () => void;
  isSelected: (id: string) => boolean;
};

const SelectableUser = ({
  item,
  onUserPress,
  isSelected,
}: SelectableUserProps) => {
  const selectionIcon = !isSelected(item.uid)
    ? "checkbox-blank-circle-outline"
    : "checkbox-marked-circle";

  return (
    <PressableItem style={styles.itemDisplayStyle} onPress={onUserPress}>
      <UserItem username={item.username} photoURL={item.photoURL} />
      <IconButton icon={selectionIcon} />
    </PressableItem>
  );
};

export default SelectableUser;
