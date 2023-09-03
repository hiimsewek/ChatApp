import { FormikHelpers, FormikProps, useFormik } from "formik";
import { useState } from "react";
import { SignupSchema } from "schemas";
import { SignupFormData } from "types";
import { checkUsernameAvailability, createUser } from "./helpers";

const useSignupForm = () => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const formInitialValues: SignupFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleImageSelected = (img: string) => setSelectedImageUri(img);

  const signup = async (
    values: SignupFormData,
    formikBag: FormikHelpers<SignupFormData>
  ) => {
    try {
      const usernameAvailable = await checkUsernameAvailability(
        values.username
      );

      if (!usernameAvailable) {
        formikBag.setErrors({
          username: "This username has already been taken",
        });
        return;
      }
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        image: selectedImageUri,
      };

      await createUser(userData, formikBag.setErrors);
    } catch (e) {
      throw new Error(e);
    }
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
    handleSubmit,
    handleBlur,
    isSubmitting,
    isValid,
  }: FormikProps<SignupFormData> = useFormik<SignupFormData>({
    initialValues: formInitialValues,
    validationSchema: SignupSchema,
    onSubmit: signup,
    validateOnChange: false,
  });

  const getCommonInputProps = (fieldName: string, trimText?: boolean) => ({
    value: values[fieldName],
    error: touched[fieldName] ? !!errors[fieldName] : undefined,
    onChangeText: (text: string) => {
      const value = trimText ? text.trim() : text;

      setFieldValue(fieldName, value);
      setErrors({ ...errors, [fieldName]: "" });
    },
    onBlur: handleBlur(fieldName),
    disabled: isSubmitting,
  });

  return {
    errors,
    selectedImageUri,
    handleImageSelected,
    handleSubmit,
    isSubmitting,
    isValid,
    getCommonInputProps,
    touched,
    values,
  };
};

export default useSignupForm;
