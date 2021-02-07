import React from "react";
import classnames from "classnames";
import "./field-wrapper.scss";

const FieldWrapper = (props) => {
  const {
    field, className, title,
  } = props;

  return (
    <div className={classnames("field-wrapper", className)}>
      <span className="field-wrapper__title">{title}</span>
      {field}
    </div>
  );
};

export default FieldWrapper;
