import React from "react";
import classnames from "classnames/dedupe";
import ImageListLoader from "../image-list-loader/image-list-loader";
import * as assetBuildPOFIcon from "../../assets/build-hot-icon";

const images = Object.entries(assetBuildPOFIcon).map(([key, uri]) => ({ key, uri, label: key }));

const BuildIconPOFList = (props) => {
  const { className } = props;
  return (
    <ImageListLoader images={images} className={classnames("boss-image-list", className)} />
  );
};

export default BuildIconPOFList;
