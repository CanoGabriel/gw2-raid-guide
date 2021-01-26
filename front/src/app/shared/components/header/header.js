import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/dedupe";
import { AuthContext } from "../auth-context/auth-context";

const Header = (props) => {
  const { className } = props;
  const { handleSignOut, isSignedIn } = useContext(AuthContext);
  return (
    <header className={classnames("header", className)}>
      {isSignedIn && <button type="button" onClick={handleSignOut}>Deconnexion</button>}
      <Link to="/">Liste des Raid</Link>
    </header>
  );
};

export default Header;
