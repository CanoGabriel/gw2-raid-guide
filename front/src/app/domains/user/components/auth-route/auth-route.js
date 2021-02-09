import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth-context/auth-context";

const AuthRoute = (props) => {
  const {
    component: Component, noAnonymous, path, ...rest
  } = props;
  const { isSignedIn, isAnonymous, isAuthLoading } = useContext(AuthContext);

  const allowDisplay = () => {
    if (isSignedIn) {
      return (noAnonymous && !isAnonymous) || !noAnonymous;
    }
    return false;
  };

  if (isAuthLoading) return false;

  const render = (renderProps) => (allowDisplay() ? <Component {...renderProps} /> : <Redirect to="/login" />);

  return (
    <Route {...rest} path={path} render={render} />
  );
};

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
  noAnonymous: PropTypes.bool,

};

export default AuthRoute;
