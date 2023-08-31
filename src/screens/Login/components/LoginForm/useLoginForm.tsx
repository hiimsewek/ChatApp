import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/firebaseConfig";
import { FormikProps, useFormik } from "formik";
import { LoginSchema } from "schemas";
import { LoginFormData } from "types";

const useLoginForm = () => {
  const [authError, setAuthError] = useState<string>("");

  const clearAuthError = () => {
    setAuthError("");
  };

  const formInitialValues: LoginFormData = {
    email: "",
    password: "",
  };

  const login = async (values: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setValues({ email: "", password: "" });
    } catch (e) {
      setAuthError("Incorrect e-mail or password");
    }
  };

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    isValid,
    setValues,
  }: FormikProps<LoginFormData> = useFormik<LoginFormData>({
    initialValues: formInitialValues,
    validationSchema: LoginSchema,
    onSubmit: login,
  });

  const getCommonInputProps = (fieldName: string, trimText?: boolean) => ({
    value: values[fieldName],
    onChangeText: (text: string) => {
      const value = trimText ? text.trim() : text;

      setFieldValue(fieldName, value);
      clearAuthError();
    },
  });

  return {
    authError,
    getCommonInputProps,
    handleSubmit,
    isSubmitting,
    isValid,
    values,
  };
};

export default useLoginForm;
