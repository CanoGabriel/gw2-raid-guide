import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import PopupPortal from "./components/popup-portal/popup-portal";
import IconWrapper from "../icon-wrapper/icon-wrapper";
import { ReactComponent as IconClose } from "../../assets/close.svg";
import "./popup.scss";

const Popup = (props) => {
  const {
    className = "", popupConfig, title, children,
  } = props;
  return (
    <PopupPortal visible={popupConfig?.visible}>
      <div className="popup">
        <div className="popup__header">
          <h1 className="popup__title">
            {title}
          </h1>
          <button className="popup__close" type="button" onClick={popupConfig.hide}>
            <IconWrapper className="popup__close__icon" Component={IconClose} />
          </button>
        </div>
        <div className={classnames("popup__content", className)}>
          {children}
        </div>
      </div>
    </PopupPortal>
  );
};

Popup.propTypes = {
  className: PropTypes.string,
  popupConfig: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    hide: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.node), PropTypes.node),
};

export default Popup;
