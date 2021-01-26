import React from "react";
import SignIn from "../../components/signin/signin";
import { Page } from "../../shared";
import "./authentication-page.scss";

const AuthenticationPage = () => (
  <Page className="authentication-page">
    <SignIn className="authentication-page__signin" />
  </Page>
);

export default AuthenticationPage;
