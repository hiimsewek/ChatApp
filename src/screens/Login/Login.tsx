import React from "react";
import { Center, Scrollable, Wrapper } from "components";
import { LoginForm } from "./components";

const Login = () => {
  return (
    <Wrapper>
      <Scrollable>
        <Center>
          <LoginForm />
        </Center>
      </Scrollable>
    </Wrapper>
  );
};

export default Login;
