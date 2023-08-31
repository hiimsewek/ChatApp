import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup } from "screens";
import { AuthStackParamsProp } from "types";

const Stack = createNativeStackNavigator<AuthStackParamsProp>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
