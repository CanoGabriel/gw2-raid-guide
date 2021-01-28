import React from "react";
import classnames from "classnames/dedupe";
import ImageListLoader from "../image-list-loader/image-list-loader";
import * as assetBuildBaseIcon from "../../assets/build-base-icon";

const images = Object.entries(assetBuildBaseIcon).map(([key, uri]) => ({ key, uri, label: key }));

const BuildIconBaseList = (props) => {
  const { className } = props;
  return (
    <ImageListLoader images={images} className={classnames("boss-image-list", className)} />
  );
};

export default BuildIconBaseList;
