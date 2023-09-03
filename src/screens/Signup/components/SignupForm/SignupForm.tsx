import { GestureResponderEvent } from "react-native";
import React from "react";
import {
  AuthLink,
  FormButton,
  FormTitle,
  ErrorMessage,
  FormInput,
  StretchAndCenter,
  Center,
  ImagePicker,
  KeyboardAvoidance,
} from "components";
import useSignupForm from "./useSignupForm";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamsProp } from "types";

const SignupForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsProp, "Login">>();

  const {
    errors,
    getCommonInputProps,
    handleImageSelected,
    handleSubmit,
    isSubmitting,
    isValid,
    selectedImageUri,
    touched,
    values,
  } = useSignupForm();

  const buttonDisabled =
    isSubmitting ||
    !isValid ||
    !values.username ||
    !values.email ||
    !values.password ||
    !values.confirmPassword;

  return (
    <KeyboardAvoidance>
      <StretchAndCenter>
        <FormTitle>Sign up</FormTitle>
        <Center style={{ marginBottom: 10 }}>
          <ImagePicker
            image={selectedImageUri}
            onImageSelected={handleImageSelected}
            size={100}
            disabled={isSubmitting}
          />
        </Center>
        <StretchAndCenter>
          <StretchAndCenter>
            <FormInput
              label="username"
              placeholder="Enter a username"
              {...getCommonInputProps("username", true)}
            />
            {errors.username && touched.username && (
              <ErrorMessage message={errors.username} />
            )}
          </StretchAndCenter>
          <StretchAndCenter>
            <FormInput
              label="email"
              placeholder="Enter your e-mail address"
              {...getCommonInputProps("email", true)}
            />
            {errors.email && touched.email && (
              <ErrorMessage message={errors.email} />
            )}
          </StretchAndCenter>
          <StretchAndCenter>
            <FormInput
              label="password"
              placeholder="Enter your password"
              secureTextEntry
              {...getCommonInputProps("password")}
            />
            {errors.password && touched.password && (
              <ErrorMessage message={errors.password} />
            )}
          </StretchAndCenter>
          <StretchAndCenter>
            <FormInput
              label="confirm password"
              placeholder="Confirm your password"
              secureTextEntry
              {...getCommonInputProps("confirmPassword")}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword} />
            )}
          </StretchAndCenter>

          <FormButton
            disabled={buttonDisabled}
            onPress={
              handleSubmit as unknown as (e: GestureResponderEvent) => void
            }
            loading={isSubmitting}
          >
            Sign up
          </FormButton>
        </StretchAndCenter>
        <AuthLink
          text="Already have an account?"
          link="Log in"
          onPress={() => {
            navigation.replace("Login");
          }}
        />
      </StretchAndCenter>
    </KeyboardAvoidance>
  );
};

export default SignupForm;
