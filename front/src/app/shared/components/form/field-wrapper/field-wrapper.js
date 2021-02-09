import React from "react";
import PropTypes from "prop-types";
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

FieldWrapper.propTypes = {
  className: PropTypes.string,
  field: PropTypes.node,
  title: PropTypes.string,
};

export default FieldWrapper;
