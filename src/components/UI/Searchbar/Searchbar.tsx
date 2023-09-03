import { GestureResponderEvent } from "react-native";
import React from "react";
import { IconButton, Searchbar as PaperSearchbar } from "react-native-paper";
import styles from "./styles";

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onClearIconPress: (e: GestureResponderEvent) => void;
  loading?: boolean;
};

const Searchbar = ({
  value,
  placeholder,
  onChangeText,
  onClearIconPress,
  loading,
}: SearchBarProps) => {
  return (
    <PaperSearchbar
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      clearIcon={value ? () => <IconButton icon="window-close" /> : undefined}
      onClearIconPress={onClearIconPress}
      loading={loading}
      style={styles.searchbar}
      inputStyle={styles.inputStyle}
    />
  );
};

export default Searchbar;
