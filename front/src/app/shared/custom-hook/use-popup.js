import { useState, useCallback } from "react";

const usePopup = (defaultVisible = false) => {
  const [visible, setVisible] = useState(defaultVisible);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const popupConfig = { show, hide, visible };
  return {
    visible,
    show,
    hide,
    popupConfig,
  };
};

export default usePopup;
