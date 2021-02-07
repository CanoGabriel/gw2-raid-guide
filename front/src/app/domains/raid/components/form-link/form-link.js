import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Button, TextInput, FieldWrapper, checkFormError,
} from "../../../../shared";

const FormLink = (props) => {
  const {
    className, init, onSubmit, onValidate,
  } = props;

  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [formInit, setFormInit] = useState({});

  const handleFormChange = (name, value) => {
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const getFieldValue = (fieldName) => form?.[fieldName] || formInit?.[fieldName];

  const fields = [
    {
      name: "label",
      title: "Text du lien",
      field: (
        <TextInput
          onChange={(label) => handleFormChange("label", label)}
          className="form-section__label"
          name="label"
          value={getFieldValue("label")}
          hasError={formError?.label}
        />
      ),
    },
    {
      name: "target",
      title: "Cible du lien",
      field: (
        <TextInput
          onChange={(target) => handleFormChange("target", target)}
          className="form-section__target"
          name="target"
          value={getFieldValue("target")}
          hasError={formError?.target}
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
    const newFormError = onValidate({ ...formInit, ...form });
    if (!checkFormError(newFormError)) {
      onSubmit(form);
    }
  };

  // Handle form initialisation
  useEffect(() => setFormInit(init), [init]);

  // Handle continuous form validation
  useEffect(() => {
    const newFormError = onValidate({ ...formInit, ...form }) || {};
    setFormError(newFormError);
  }, [form, formInit]);

  return (
    <form className={classnames("form-link", className)}>
      {fields?.map(generateField)}
      <Button className="form-boss__confirm" onClick={handleSubmit}>Valider</Button>
    </form>
  );
};

FormLink.propTypes = {
  className: PropTypes.string,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  init: PropTypes.exact({
    title: PropTypes.string,
  }),
};

FormLink.defaultProps = {
  className: "",
  init: {},
};

export default FormLink;
