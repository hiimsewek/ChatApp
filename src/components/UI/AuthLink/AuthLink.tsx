import { View } from "react-native";
import React from "react";
import { Button as FlatButton, Text } from "react-native-paper";
import styles from "./styles";

type Props = {
  text: string;
  link: string;
  onPress: () => void;
};

const AuthLink = ({ text, link, onPress }: Props) => {
  return (
    <View style={[styles.displayRow]}>
      <Text>{text}</Text>
      <FlatButton onPress={onPress} labelStyle={styles.buttonMargin}>
        {link}
      </FlatButton>
    </View>
  );
};

export default AuthLink;
