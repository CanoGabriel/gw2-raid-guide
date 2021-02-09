import React from "react";
import SignupForm from "../../domains/user/pages/login-page/components/signup-form/signup-form";
import LoginForm from "../../domains/user/pages/login-page/components/login-form/login-form";

const Test = () => (
  <main>
    <SignupForm onSubmit={(signupData) => console.log(signupData)} />
    <LoginForm />
  </main>
);
export default Test;
