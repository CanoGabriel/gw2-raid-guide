import { useState } from "react";

const useTabs = (defaultTabId) => {
  const [activeTab, setActiveTab] = useState(defaultTabId);
  return { activeTab, setActiveTab };
};

export default useTabs;
