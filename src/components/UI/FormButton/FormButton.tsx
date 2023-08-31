import React, { useContext } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";
import { ThemeContext } from "contexts";
import { Button } from "react-native-paper";
import styles from "./styles";

type FormButtonProps = React.ComponentProps<typeof Button> & {
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

const FormButton = ({ children, ...props }: FormButtonProps) => {
  const {
    theme: { roundness },
  } = useContext(ThemeContext);

  return (
    <Button
      mode="contained"
      contentStyle={styles.buttonSize}
      uppercase
      labelStyle={{
        fontWeight: "bold",
      }}
      {...props}
      style={[
        styles.buttonPosition,
        styles.buttonSize,
        { borderRadius: roundness },
        props.style,
      ]}
    >
      {children}
    </Button>
  );
};

export default FormButton;
