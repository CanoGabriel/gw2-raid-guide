import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./text-input.scss";

const TextInput = (props) => {
  const {
    value, name, className, hasError, onChange, placeholder, disabled,
  } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={classnames("text-input", { "text-input--error": hasError, "text-input--disabled": disabled }, className)}
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  hasError: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  value: "",
  className: "",
  hasError: false,
  placeholder: "",
  disabled: false,
};

export default TextInput;
