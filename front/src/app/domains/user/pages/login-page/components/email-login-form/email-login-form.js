import React, { useContext, useState } from "react";
import classnames from "classnames/dedupe";
import { Button } from "../../../../../../shared";
import { AuthContext } from "../../../../components/auth-context/auth-context";
import "./email-login-form.scss";

const EmailLoginForm = (props) => {
  const { className } = props;
  const { handleLoginWithEmail } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorKey, setErrorKey] = useState("");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    const { email, password } = form;
    handleLoginWithEmail(email, password).catch((error) => {
      if (error?.response?.status === 401) {
        setErrorKey(error?.response?.error);
      }
    });
  };

  return (
    <form className={classnames(className, "email-login-form")}>
      <input onChange={handleFormChange} name="email" value={form.email} type="text" />
      <input onChange={handleFormChange} name="password" value={form.password} type="password" />
      <Button onClick={handleConfirm} type="submit">Valider</Button>
      { errorKey && <span>{errorKey}</span> }
    </form>
  );
};

export default EmailLoginForm;
