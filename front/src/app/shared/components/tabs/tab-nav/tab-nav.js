import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./tab-nav.scss";

const TabNav = (props) => {
  const {
    id, children, onClick, className, activeClassName, disabled,
    tabNavConfig,
  } = props;

  const { setActiveTab = () => {}, activeTab } = tabNavConfig;

  const handleNavClick = (event) => {
    if (!disabled) {
      setActiveTab(id);
      onClick(event);
    }
  };

  const finalClassName = classnames(
    "tab-nav",
    className,
    {
      "tab-nav--active": id === activeTab,
      [activeClassName]: id === activeTab,
      "tab-nav--disabled": disabled,
    },
  );

  return (
    <button type="button" className={finalClassName} onClick={handleNavClick} disabled={disabled}>
      {children}
    </button>
  );
};

TabNav.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  tabNavConfig: PropTypes.shape({
    activeTab: PropTypes.bool.isRequired,
    setActiveTab: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

TabNav.defaultProps = {
  className: "",
  activeClassName: "",
  onClick: () => {},
  disabled: false,
};

export default TabNav;
