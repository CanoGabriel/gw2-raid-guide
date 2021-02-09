import React from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import classnames from "classnames/dedupe";

// TODO aria radio button
const Radio = (props) => {
  const {
    className, name, value, onClick, children, checked, id = uuid(),
  } = props;

  return (
    <label htmlFor={id} className={classnames("radio", className)}>
      <input id={id} type="radio" value={value} onChange={onClick} name={name} checked={checked} />
      {children}
    </label>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.node), PropTypes.node),
  checked: PropTypes.bool,
  id: PropTypes.bool,
};

export default Radio;
