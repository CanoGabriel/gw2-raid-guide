import React from "react";
import classnames from "classnames/dedupe";
import "./button.scss";

const Button = (props) => {
  const {
    className, onClick = () => {}, disabled, children, outline,
  } = props;

  return (
    <button type="button" className={classnames("button", className, { "button--outline": outline })} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
