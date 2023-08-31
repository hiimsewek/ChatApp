import React from "react";
import { GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AuthLink,
  FormButton,
  FormInput,
  FormTitle,
  StretchAndCenter,
  ErrorMessage,
  KeyboardAvoidance,
} from "components";
import { AuthStackParamsProp } from "types";
import useLoginForm from "./useLoginForm";

const LoginForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsProp, "Signup">>();

  const {
    authError,
    getCommonInputProps,
    handleSubmit,
    isSubmitting,
    isValid,
    values,
  } = useLoginForm();

  const buttonDisabled =
    !isValid || isSubmitting || !values.email || !values.password;

  return (
    <KeyboardAvoidance>
      <StretchAndCenter>
        <FormTitle>Log in</FormTitle>

        <FormInput
          label="e-mail"
          placeholder="Enter your e-mail address"
          {...getCommonInputProps("email", true)}
        />
        <FormInput
          label="password"
          placeholder="Enter your password"
          secureTextEntry
          {...getCommonInputProps("password")}
        />
        {authError && <ErrorMessage message={authError} />}
        <FormButton
          onPress={
            handleSubmit as unknown as (e: GestureResponderEvent) => void
          }
          disabled={buttonDisabled}
          loading={isSubmitting}
        >
          Log in
        </FormButton>
        <AuthLink
          text={`Don't have an account?`}
          link="Sign up"
          onPress={() => {
            navigation.replace("Signup");
          }}
        />
      </StretchAndCenter>
    </KeyboardAvoidance>
  );
};

export default LoginForm;
