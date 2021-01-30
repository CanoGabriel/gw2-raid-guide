import React from "react";
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

export default Radio;
