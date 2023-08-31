import { View, ViewStyle, StyleProp } from "react-native";
import React from "react";
import styles from "./styles";

type WrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Wrapper = ({ children, style }: WrapperProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Wrapper;
