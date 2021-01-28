import React from "react";
import classnames from "classnames/dedupe";
import "./image-list-loader.scss";

const ImageListLoader = (props) => {
  const { className, images, itemRender } = props;

  const generateImageItem = (info) => {
    const {
      uri, key, label,
    } = info;
    return (
      <li className={classnames("image-list-loader__item", `image-list-loader__item--${key}`)} key={key}>
        {itemRender ? itemRender(info) : (
          <>
            <img src={uri} alt="" />
            <span>{label}</span>
          </>
        )}
      </li>
    );
  };
  return (
    <ul className={classnames("image-list-loader", className)}>
      {images.map(generateImageItem)}
    </ul>
  );
};

export default ImageListLoader;
