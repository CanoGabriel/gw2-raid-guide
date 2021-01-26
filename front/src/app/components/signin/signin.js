import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import classnames from "classnames/dedupe";
import { AuthContext } from "../../shared";
import "./signin.scss";

const SignIn = (props) => {
  const { className } = props;
  const { handleEmailSignIn, handleAnonymousSignIn } = useContext(AuthContext);
  const history = useHistory();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    const { email, password } = form;
    handleEmailSignIn(email, password).then(() => history.replace("/"));
  };

  const handleSkip = (event) => {
    event.preventDefault();
    handleAnonymousSignIn().then(() => history.replace("/"));
  };

  return (
    <div className={classnames(className, "signin")}>
      <form className="signin__form">
        <p>Connexion :</p>
        <input onChange={handleFormChange} name="email" value={form.email} type="text" />
        <input onChange={handleFormChange} name="password" value={form.password} type="password" />
        <button onClick={handleConfirm} type="submit">Valider</button>
        <button onClick={handleSkip} type="button">Ignorer</button>
      </form>
    </div>
  );
};

export default SignIn;
