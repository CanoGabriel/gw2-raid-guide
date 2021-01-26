import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth-context/auth-context";

const AuthRoute = (props) => {
  const {
    component: Component, noAnonymous, path, ...rest
  } = props;
  const { isSignedIn, isAnonymous } = useContext(AuthContext);

  const allowDisplay = () => {
    if (isSignedIn) {
      return (noAnonymous && !isAnonymous) || !noAnonymous;
    }
    return false;
  };

  const render = (renderProps) => (allowDisplay() ? <Component {...renderProps} /> : <Redirect to="/login" />);

  return (
    <Route {...rest} path={path} render={render} />
  );
};

export default AuthRoute;
