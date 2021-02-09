import React from "react";
import classnames from "classnames";
import LoginForm from "./components/login-form/login-form";
import SignupForm from "./components/signup-form/signup-form";
import {
  Page, TabNav, TabContent, useTab,
} from "../../../../shared";
import "./login-page.scss";

const LoginPage = () => {
  const tabNavConfig = useTab("login");

  return (
    <Page className="login-page">
      <div className="login-page__forms">
        <ul className="login-page__nav-link">
          <li className="nav-link__wrapper">
            <TabNav
              className="nav-link__cta"
              activeClassName="nav-link__cta--active"
              id="login"
              tabNavConfig={tabNavConfig}
            >
              Connexion
            </TabNav>
          </li>
          <li className="nav-link__wrapper">
            <TabNav
              className="nav-link__cta"
              activeClassName="nav-link__cta--active"
              id="signup"
              tabNavConfig={tabNavConfig}
            >
              Créer votre compte
            </TabNav>
          </li>
        </ul>
        <div className="login-page__form-content">
          <TabContent
            activeClassName={classnames({ "form-content__active-tab": tabNavConfig.activeTab === "login" })}
            id="login"
            tabNavConfig={tabNavConfig}
          >
            <LoginForm className="login-page__signin" />
          </TabContent>
          <TabContent
            activeClassName={classnames({ "form-content__active-tab": tabNavConfig.activeTab === "signup" })}
            id="signup"
            tabNavConfig={tabNavConfig}
          >
            <SignupForm className="login-page__signup" />
          </TabContent>
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
