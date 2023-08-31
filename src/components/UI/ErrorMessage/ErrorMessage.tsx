import { ThemeContext } from "contexts";
import React, { useContext } from "react";
import { Text as PaperText } from "react-native-paper";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return <PaperText style={{ color: colors.error }}>{message}</PaperText>;
};

export default ErrorMessage;
