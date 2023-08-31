import React from "react";
import { Title as PaperTitle } from "react-native-paper";
import styles from "./styles";

type FormTitleProps = {
  children: React.ReactNode;
};
const FormTitle = ({ children }: FormTitleProps) => {
  return <PaperTitle style={styles.formTitle}>{children}</PaperTitle>;
};

export default FormTitle;
