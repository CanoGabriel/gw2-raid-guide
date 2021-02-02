import React from "react";
import classnames from "classnames";

const TabContent = (props) => {
  const {
    tabNavConfig, className, children, id,
  } = props;

  if (tabNavConfig?.activeTab === id) {
    return (
      <div className={classnames("tab-content", className)}>{children}</div>
    );
  }

  return false;
};

export default TabContent;
