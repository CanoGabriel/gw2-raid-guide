import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TabContent = (props) => {
  const {
    tabNavConfig, className, activeClassName, children, id,
  } = props;

  const active = tabNavConfig?.activeTab === id;

  const classes = classnames(
    "tab-content",
    className,
    { [activeClassName]: active, "tab-content--active": active },
  );

  return (
    <div className={classes}>
      {active && children}
    </div>
  );
};

TabContent.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  tabNavConfig: PropTypes.shape({
    activeTab: PropTypes.bool.isRequired,
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

TabContent.defaultProps = {
  className: "",
  activeClassName: "",
};

export default TabContent;
