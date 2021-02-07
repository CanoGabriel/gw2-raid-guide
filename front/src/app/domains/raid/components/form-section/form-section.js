import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Button, TextInput, FieldWrapper, checkFormError,
} from "../../../../shared";

const FormSection = (props) => {
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
      name: "title",
      title: "Titre de la section",
      field: (
        <TextInput
          onChange={(title) => handleFormChange("title", title)}
          className="form-section__title"
          name="title"
          value={getFieldValue("title")}
          hasError={formError?.title}
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
  }, [form, form]);

  return (
    <form className={classnames("form-section", className)}>
      {fields?.map(generateField)}
      <Button className="form-boss__confirm" onClick={handleSubmit}>Valider</Button>
    </form>
  );
};

FormSection.propTypes = {
  className: PropTypes.string,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  init: PropTypes.exact({
    title: PropTypes.string,
  }),
};

FormSection.defaultProps = {
  className: "",
  init: {},
};

export default FormSection;
