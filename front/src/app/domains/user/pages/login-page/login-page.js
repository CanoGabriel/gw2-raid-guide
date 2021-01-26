import React from "react";
import EmailLoginForm from "./components/email-login-form/email-login-form";
import GuestLoginButton from "./components/guest-login-button/guest-login-button";
import { Page } from "../../../../shared";
import "./login-page.scss";

const LoginPage = () => (
  <Page className="authentication-page">
    <EmailLoginForm className="authentication-page__signin" />
    <GuestLoginButton />
  </Page>
);

export default LoginPage;
