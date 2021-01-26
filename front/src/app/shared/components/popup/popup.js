import React from "react";
import PopupPortal from "./components/popup-portal/popup-portal";
import Button from "../button/button";
import "./popup.scss";

const Popup = (props) => {
  const { popupConfig, children } = props;
  return (
    <PopupPortal visible={popupConfig?.visible}>
      <div className="popup">
        <Button onClick={popupConfig.hide}>Fermer</Button>
        {children}
      </div>
    </PopupPortal>
  );
};

export default Popup;
