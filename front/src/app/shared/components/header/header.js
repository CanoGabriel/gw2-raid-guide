import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames/dedupe";
import { AuthContext } from "../../../domains/user/components/auth-context/auth-context";

const Header = (props) => {
  const { className } = props;
  const { handleLogout, isSignedIn } = useContext(AuthContext);
  return (
    <header className={classnames("header", className)}>
      {isSignedIn && <button type="button" onClick={handleLogout}>Deconnexion</button>}
      <Link to="/">Liste des Raid</Link>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
