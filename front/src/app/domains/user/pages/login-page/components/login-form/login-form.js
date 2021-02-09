import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Button, TextInput, FieldWrapper, checkFormError,
} from "../../../../../../shared";
import GuestLoginButton from "../guest-login-button/guest-login-button";
import { AuthContext } from "../../../../components/auth-context/auth-context";
import { validateLoginForm } from "../../utils/validators";
import "./login-form.scss";

const EmailLoginForm = (props) => {
  const { className } = props;
  const { handleLoginWithEmail } = useContext(AuthContext);
  const [errorKey, setErrorKey] = useState("");

  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const handleFormChange = (name, value) => {
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const fields = [
    {
      name: "email",
      title: "Email",
      field: (
        <TextInput
          onChange={(email) => handleFormChange("email", email)}
          className="login-form__email"
          name="email"
          value={form?.email}
          hasError={formError?.email}
        />
      ),
    },
    {
      name: "password",
      title: "Mot de passe",
      field: (
        <TextInput
          onChange={(password) => handleFormChange("password", password)}
          className="login-form__password"
          name="password"
          value={form?.password}
          hasError={formError?.password}
          password
        />
      ),
    },
  ];

  const generateField = (fieldConfig) => {
    const { field, title, name } = fieldConfig;
    return (
      <FieldWrapper
        key={name}
        field={field}
        title={title}
        className={`form-boss__field form-boss__${name}`}
      />
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFormError = validateLoginForm(form);
    if (!checkFormError(newFormError)) {
      const { email, password } = form;
      handleLoginWithEmail(email, password).catch((error) => {
        if (error?.response?.status === 401) {
          setErrorKey(error?.response?.error);
        }
      });
    }
  };

  useEffect(() => {
    const newFormError = validateLoginForm(form);
    setFormError(newFormError);
  }, [form]);

  return (
    <form className={classnames("login-form", className)}>
      {fields?.map(generateField)}
      {errorKey && <span>{errorKey}</span>}
      <div className="login-form__actions">
        <Button onClick={handleSubmit}>Valider</Button>
        <span className="actions__or">ou</span>
        <GuestLoginButton />
      </div>
    </form>
  );
};

EmailLoginForm.propTypes = {
  className: PropTypes.string,
};

export default EmailLoginForm;
