import * as Yup from "yup";
import isEmailValidator from "validator/lib/isEmail";

const UsernameSchema = Yup.string()
  .min(4, "Username must be at least 4 characters long")
  .max(30, "Username must not be longer than 30 characters")
  .test("isUsernameValid", "Please enter a valid username", (value) => {
    const regex = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
    return regex.test(value);
  })
  .required("Field cannot be empty");

const EmailSchema = Yup.string()
  .email("Invalid e-mail")
  .required("Field cannot be empty")
  .test("isEmailValid", "invalid e-mail", (value) =>
    value
      ? isEmailValidator(value.trim())
      : new Yup.ValidationError("Invalid value")
  );

const PasswordSchema = Yup.string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must not be longer than 50 characters")
  .required("Field cannot be empty");

const ConfirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords don't match")
  .required("Field cannot be empty");

export const LoginSchema = Yup.object().shape({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignupSchema = Yup.object().shape({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: ConfirmPasswordSchema,
});
