import React from "react";
import classnames from "classnames/dedupe";
import ImageListLoader from "../image-list-loader/image-list-loader";
import * as assetBuildHOTIcon from "../../assets/build-hot-icon";

const images = Object.entries(assetBuildHOTIcon).map(([key, uri]) => ({ key, uri, label: key }));

const BuildIconHOTList = (props) => {
  const { className } = props;
  return (
    <ImageListLoader images={images} className={classnames("boss-image-list", className)} />
  );
};

export default BuildIconHOTList;
