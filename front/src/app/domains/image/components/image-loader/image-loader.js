import React from "react";
import classnames from "classnames/dedupe";
import {
  bossImages, buildBaseIcons, buildHOTIcons, buildPOFIcons,
} from "../../assets";

const getImageList = (type) => {
  if (type === "boss") return bossImages;
  if (type === "buildBase") return buildBaseIcons;
  if (type === "buildHOT") return buildHOTIcons;
  if (type === "buildPOF") return buildPOFIcons;
  return {};
};

const ImageLoader = (props) => {
  const { className, imageKey, type } = props;
  const imageSrc = getImageList(type)[imageKey];

  if (imageSrc) {
    return <img className={classnames("image-loader", `image-loader--${type}`, className)} src={imageSrc} alt="" />;
  }
  return false;
};

export default ImageLoader;
