import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./icon-wrapper.scss";

const IconWrapper = ({
  className, Component, tooltip, ...rest
}) => (
  <span className={classnames("icon-wrapper", className)} {...rest}>
    <Component fill="currentColor" role="img" aria-hidden="true" focusable="false" />
    {tooltip && <span className="icon-wrapper__tooltip__wrapper"><span className="icon-wrapper__tooltip__text">{tooltip}</span></span>}
  </span>
);

IconWrapper.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
};

export default IconWrapper;
