import React from "react";
import { PressableItem, UserItem } from "components";
import { UserWithoutUid } from "types";

type PressableUserProps = {
  onUserPress: () => void;
} & UserWithoutUid;

const PressableUser = ({
  onUserPress,
  username,
  photoURL,
}: PressableUserProps) => {
  return (
    <PressableItem onPress={onUserPress}>
      <UserItem username={username} photoURL={photoURL} />
    </PressableItem>
  );
};

export default PressableUser;
