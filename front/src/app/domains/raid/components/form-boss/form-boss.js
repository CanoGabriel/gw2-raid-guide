import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Button, TextInput, FieldWrapper, usePopup,
} from "../../../../shared";
import { PopupImageSelector, ImageLoader } from "../../../image";
import { checkFormError } from "../../../../shared/utils";
import "./form-boss.scss";

const FormBoss = (props) => {
  const {
    className, init, onSubmit, onValidate,
  } = props;

  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [formInit, setFormInit] = useState({});
  const { popupConfig: popupImageSelectConfig } = usePopup();

  const handleFormChange = (name, value) => {
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  const handleImageChange = (image) => {
    handleFormChange("image", image);
  };

  const getFieldValue = (fieldName) => (form?.[fieldName] !== undefined ? form?.[fieldName] : formInit?.[fieldName]);

  const fields = [
    {
      name: "name",
      title: "Nom du boss",
      field: (
        <TextInput
          onChange={(name) => handleFormChange("name", name)}
          className="form-boss__hitbox-size"
          name="name"
          value={getFieldValue("name")}
          hasError={formError?.name}
        />
      ),
    },
    {
      name: "hitboxSize",
      title: "Taille de la hitbox",
      field: (
        <TextInput
          onChange={(hitboxSize) => handleFormChange("hitboxSize", hitboxSize)}
          className="form-boss__hitbox-size"
          name="hitboxSize"
          value={getFieldValue("hitboxSize")}
          hasError={formError?.hitboxSize}
        />
      ),
    },
    {
      name: "health",
      title: "Santé",
      field: (
        <TextInput
          onChange={(health) => handleFormChange("health", health)}
          className="form-boss__hitbox-size"
          name="health"
          value={getFieldValue("health")}
          hasError={formError?.health}
        />
      ),
    },
    {
      name: "breakBar",
      title: "Barre de défiance",
      field: (
        <TextInput
          onChange={(breakBar) => handleFormChange("breakBar", breakBar)}
          className="form-boss__hitbox-size"
          name="breakBar"
          value={getFieldValue("breakBar")}
          hasError={formError?.breakBar}
        />
      ),
    },
    {
      name: "timer",
      title: "Timer",
      field: (
        <TextInput
          onChange={(timer) => handleFormChange("timer", timer)}
          className="form-boss__hitbox-size"
          name="timer"
          value={getFieldValue("timer")}
          hasError={formError?.timer}
        />
      ),
    },
    {
      name: "armor",
      title: "Armure",
      field: (
        <TextInput
          onChange={(armor) => handleFormChange("armor", armor)}
          className="form-boss__hitbox-size"
          name="armor"
          value={getFieldValue("armor")}
          hasError={formError?.armor}
        />
      ),
    },
    {
      name: "addBreakBar",
      title: "Bar de défiance des minions",
      field: (
        <TextInput
          onChange={(addBreakBar) => handleFormChange("addBreakBar", addBreakBar)}
          className="form-boss__hitbox-size"
          name="addBreakBar"
          value={getFieldValue("addBreakBar")}
          hasError={formError?.addBreakBar}
        />
      ),
    },
    {
      name: "image",
      title: "Image",
      field: (
        <div className={classnames("form-boss__image__field", { "form-boss__image__field--error": formError?.image })}>
          {(formInit?.image || form?.image) && (
            <ImageLoader
              className="form-boss__image__preview"
              type={form?.image?.type !== undefined ? form?.image?.type : formInit?.image?.type}
              imageKey={form?.image?.key !== undefined ? form?.image?.key : formInit?.image?.key}
            />
          )}
          <PopupImageSelector
            popupConfig={popupImageSelectConfig}
            imageType="boss"
            onConfirm={handleImageChange}
            initialValue={form?.image || formInit?.image}
          />
          <Button className="form-boss__image__choice" onClick={popupImageSelectConfig.show}>Choisir une image</Button>
        </div>
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
      onSubmit({ ...formInit, ...form });
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
    <form className={classnames("form-boss", className)}>
      {fields?.map(generateField)}
      <Button className="form-boss__confirm" onClick={handleSubmit}>Valider</Button>
    </form>
  );
};

FormBoss.propTypes = {
  className: PropTypes.string,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  init: PropTypes.exact({
    hitboxSize: PropTypes.string,
    health: PropTypes.string,
    breakBar: PropTypes.string,
    timer: PropTypes.string,
    armor: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.exact({
      key: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
    addBreakBar: PropTypes.string,
  }),
};

FormBoss.defaultProps = {
  className: "",
  init: {},
};

export default FormBoss;
