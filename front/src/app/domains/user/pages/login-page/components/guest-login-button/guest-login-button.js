import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import { AuthContext } from "../../../../components/auth-context/auth-context";
import { Button } from "../../../../../../shared";

const GuestLoginButton = (props) => {
  const { className } = props;
  const { handleAnonymously } = useContext(AuthContext);

  const handleClick = () => {
    handleAnonymously();
  };
  const label = "Continuer en tant qu'invité";

  return <Button className={classnames("guest-login-button", className)} onClick={handleClick} outline>{label}</Button>;
};

GuestLoginButton.propTypes = {
  className: PropTypes.string,
};

export default GuestLoginButton;
