import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  TextInput, FieldWrapper, Button, checkFormError,
} from "../../../../../../shared";
import { validateSignupForm } from "../../utils/validators";
import "./signup-form.scss";

const SignupForm = (props) => {
  const { className, onSubmit } = props;

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
          className="signup-form__email"
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
          className="signup-form__password"
          name="password"
          value={form?.password}
          hasError={formError?.password}
          password
        />
      ),
    },
    {
      name: "passwordConfirm",
      title: "Confirmer votre mot de passe",
      field: (
        <TextInput
          onChange={(passwordConfirm) => handleFormChange("passwordConfirm", passwordConfirm)}
          className="signup-form__password-confirm"
          name="password"
          value={form?.passwordConfirm}
          hasError={formError?.passwordConfirm}
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

    const newFormError = validateSignupForm(form);
    if (!checkFormError(newFormError)) {
      onSubmit(form);
    }
  };

  useEffect(() => {
    const newFormError = validateSignupForm(form);
    setFormError(newFormError);
  }, [form]);

  return (
    <form className={classnames("signup-form", className)}>
      {fields?.map(generateField)}
      <div className="signup-form__actions">
        <Button onClick={handleSubmit}>Valider</Button>
      </div>
    </form>
  );
};

SignupForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SignupForm;
