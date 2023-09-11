import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { PropsWithChildren } from "react";
import styles from "./styles";
import { useHeaderHeight } from "@react-navigation/elements";

type KeyboardAvoidanceProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const KeyboardAvoidance = ({ children, style }: KeyboardAvoidanceProps) => {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.stretch, style]}
      keyboardVerticalOffset={headerHeight}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidance;
