import { View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";

type CenterProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
  style?: StyleProp<ViewStyle>;
};

const Center = ({ children, direction, style }: CenterProps) => {
  const directionValue = direction || "column";

  return (
    <View style={[styles.container, { flexDirection: directionValue }, style]}>
      {children}
    </View>
  );
};

export default Center;
