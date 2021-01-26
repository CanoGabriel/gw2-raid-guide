import React from "react";
import { createPortal } from "react-dom";
import classnames from "classnames/dedupe";
import "./popup-portal.scss";

const modalRoot = document.getElementById("modal-root");

const PopupPortal = (props) => {
  const { children, visible, className } = props;

  return createPortal(visible ? <div className={classnames("popup-portal", className)}>{children}</div> : false, modalRoot);
};

export default PopupPortal;
