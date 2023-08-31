import { View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";

type StretchAndCenterProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
const StretchAndCenter = ({ children, style }: StretchAndCenterProps) => {
  return <View style={[styles.stretchAndCenter, style]}>{children}</View>;
};

export default StretchAndCenter;
