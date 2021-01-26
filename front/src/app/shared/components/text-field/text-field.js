/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from "react";
import classnames from "classnames/dedupe";
import "./text-field.scss";

const TextField = (props) => {
  const {
    value = "", readOnly, handleFocus, handleBlur, inputClassName, children,
    label, onChange, name, placeholder, className, invalid, disabled, helperText,
  } = props;
  const inputRef = useRef();

  const handleLabelFocus = () => {
    inputRef.current.focus();
  };

  const initClassName = classnames("text-field", { "text-field--invalid": invalid, "text-field--disabled": disabled }, className);

  return (
    <div className={initClassName}>
      <input
        ref={inputRef}
        className={classnames("text-field__input", { "text-field__input--valid": value }, inputClassName)}
        type="text"
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label onClick={handleLabelFocus} className="text-field__label">{label}</label>
      {helperText && <span className="text-field__helper-text">{helperText}</span>}
      {children}
    </div>
  );
};

export default TextField;
