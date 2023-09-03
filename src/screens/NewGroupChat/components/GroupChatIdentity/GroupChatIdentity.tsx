import { View } from "react-native";
import React from "react";
import { ImagePicker } from "components";
import { TextInput } from "react-native-paper";
import styles from "./styles";

type GroupChatIdentityProps = {
  image: string | null;
  onImagePick: (uri: string) => void;
  groupName: string;
  onGroupNameChanged: (newName: string) => void;
  disabled: boolean;
};

const GroupChatIdentity = ({
  image,
  onImagePick,
  groupName,
  onGroupNameChanged,
  disabled,
}: GroupChatIdentityProps) => {
  return (
    <View style={styles.container}>
      <ImagePicker
        image={image}
        onImageSelected={onImagePick}
        size={50}
        disabled={disabled}
      />
      <TextInput
        mode="flat"
        style={styles.input}
        placeholder="Group name"
        value={groupName}
        onChangeText={onGroupNameChanged}
        disabled={disabled}
      />
    </View>
  );
};

export default GroupChatIdentity;
