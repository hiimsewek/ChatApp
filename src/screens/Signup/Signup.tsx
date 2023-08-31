import React from "react";
import { Center, Scrollable, Wrapper } from "components";
import { SignupForm } from "./components";

const Signup = () => {
  return (
    <Wrapper>
      <Scrollable>
        <Center>
          <SignupForm />
        </Center>
      </Scrollable>
    </Wrapper>
  );
};

export default Signup;
