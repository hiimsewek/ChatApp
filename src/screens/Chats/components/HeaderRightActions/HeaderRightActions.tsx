import { View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "contexts";
import { signOut } from "firebase/auth";
import { auth } from "services/firebaseConfig";
import { AuthenticatedStackParamsProp } from "types";
import { IconButton } from "react-native-paper";
import styles from "./styles";

type NavigationType = NativeStackNavigationProp<AuthenticatedStackParamsProp>;

const HeaderRightActions = () => {
  const navigation = useNavigation<NavigationType>();

  const {
    theme: { dark },
    toggleTheme,
  } = useContext(ThemeContext);

  return (
    <View style={styles.displayRow}>
      <IconButton
        icon="pencil-outline"
        onPress={() => {
          navigation.navigate("NewChat");
        }}
      />
      <IconButton
        icon={dark ? "weather-sunny" : "weather-night"}
        onPress={() => {
          toggleTheme();
        }}
      />
      <IconButton
        icon="logout"
        onPress={async () => {
          await signOut(auth);
        }}
      />
    </View>
  );
};

export default HeaderRightActions;
