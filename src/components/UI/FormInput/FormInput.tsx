import { Animated, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import styles from "./styles";

type FormInputProps = React.ComponentProps<typeof TextInput> & {
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

const FormInput = ({ ...props }: FormInputProps) => (
  <TextInput {...props} style={[styles.inputContainer, props.style]} />
);

export default FormInput;
