import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import { Button, Radio } from "../../../../shared";
import ImageLoader from "../image-loader/image-loader";
import { getImageKeyList, imageTypeList } from "../../utils";
import "./image-selector.scss";

const ImageSelector = (props) => {
  const {
    className, imageType, onConfirm = () => {}, initialValue,
  } = props;
  const [selectedType, setSelectedType] = useState(imageType || initialValue?.type);
  const [selectedKey, setSelectedKey] = useState(initialValue?.key);
  const [choice, setChoice] = useState();
  const imageKeyList = getImageKeyList(selectedType);

  const handleSelectType = (event) => {
    const { value } = event.target;
    setSelectedType(value);
    setSelectedKey("");
  };

  const handleChooseImage = (event, image) => {
    event.preventDefault();
    setSelectedKey(image.key);
  };

  const handleConfirm = (event) => {
    const newChoice = { type: imageType || selectedType, key: selectedKey };
    setChoice(newChoice);
    onConfirm(newChoice, event);
  };

  // const handleReset = () => {
  //   setChoice(false);
  // };

  // Handle initial value
  useEffect(() => {
    if (choice === undefined) {
      setChoice(initialValue);
    }
  }, [initialValue, choice]);

  return (
    <div className={classnames("image-selector", className)}>
      {!imageType && (
        <div className="image-selector__type">
          {imageTypeList.map((type) => (
            <Radio
              className={classnames("image-selector__radio", { "image-selector__radio--selected": selectedType === type })}
              name="type"
              value={type}
              key={type}
              checked={selectedType === type}
              onClick={handleSelectType}
            >
              {type}
            </Radio>
          ))}
        </div>
      )}
      <ul className="image-selector__image-list">
        {imageTypeList.includes(selectedType) ? (
          <>
            {imageKeyList.map((imageKey) => (
              <li
                key={imageKey}
                className={classnames("image-selector__list-item", { "image-selector__list-item--selected": selectedKey === imageKey })}
              >
                <button
                  className="image-selector__button"
                  type="button"
                  onClick={(event) => handleChooseImage(event, { key: imageKey, type: selectedType })}
                >
                  <ImageLoader className="image-selector__image" imageKey={imageKey} type={selectedType} />
                </button>
              </li>
            ))}
          </>
        ) : <span>Select type</span>}
      </ul>
      <Button onClick={handleConfirm} disabled={!(selectedKey && (imageType || selectedType))}>
        Valider
      </Button>
    </div>
  );
};

ImageSelector.propTypes = {
  className: PropTypes.string,
  imageType: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  initialValue: PropTypes.exact({
    type: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }),
};

export default ImageSelector;
