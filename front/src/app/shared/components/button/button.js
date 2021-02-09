import React from "react";
import PropTypes from "prop-types";
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

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  children: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.node), PropTypes.node),
};

export default Button;
