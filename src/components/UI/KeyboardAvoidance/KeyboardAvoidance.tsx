import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { PropsWithChildren } from "react";
import styles from "./styles";

type KeyboardAvoidanceProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const FormWrapper = ({ children, style }: KeyboardAvoidanceProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.stretch, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormWrapper;
