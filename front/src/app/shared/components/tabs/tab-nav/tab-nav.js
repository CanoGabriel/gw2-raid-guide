import React from "react";
import classnames from "classnames";
import "./tab-nav.scss";

const TabNav = (props) => {
  const {
    id, children, onClick = () => {}, className, disabled,
    tabNavConfig = {},
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
    { "tab-nav--active": id === activeTab, "tab-nav--disabled": disabled },
  );

  return (
    <button
      type="button"
      className={finalClassName}
      onClick={handleNavClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TabNav;
