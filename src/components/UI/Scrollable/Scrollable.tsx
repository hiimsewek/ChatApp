import React, { PropsWithChildren } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

type ScrollableProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;
const Scrollable = ({ children, style }: ScrollableProps) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export default Scrollable;
