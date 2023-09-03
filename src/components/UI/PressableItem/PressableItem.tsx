import React, { useContext } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { ThemeContext } from "contexts";
import styles from "./styles";

type PressableItemProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const PressableItem = ({ children, onPress, style }: PressableItemProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.itemContainer,
        {
          backgroundColor: pressed ? colors.surfaceVariant : "transparent",
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export default PressableItem;
