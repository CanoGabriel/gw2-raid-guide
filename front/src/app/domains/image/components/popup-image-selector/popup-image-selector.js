import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Popup } from "../../../../shared";
import ImageSelector from "../image-selector/image-selector";
import "./popup-image-selector.scss";

const PopupImageSelector = (props) => {
  const {
    className, initialValue, imageType, onConfirm, popupConfig,
  } = props;

  const handleConfirm = (image, event) => {
    onConfirm(image, event);
    popupConfig.hide();
  };

  return (
    <Popup title="Sélectioner votre image" className={classnames("popup-image-selector", className)} popupConfig={popupConfig}>
      <ImageSelector
        className="popup-image-selector__selector"
        imageType={imageType}
        onConfirm={handleConfirm}
        initialValue={initialValue}
      />
    </Popup>
  );
};

PopupImageSelector.propTypes = {
  className: PropTypes.string,
  initialValue: PropTypes.exact({
    type: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }),
  imageType: PropTypes.string,
  onConfirm: PropTypes.func,
  popupConfig: PropTypes.shape({ hide: PropTypes.func.isRequired }),
};

export default PopupImageSelector;
