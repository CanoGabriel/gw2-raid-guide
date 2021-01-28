import React from "react";
import classnames from "classnames/dedupe";
import * as bossImageRef from "../../assets/boss";

const BossImageLoader = (props) => {
  const { className, imageKey } = props;
  const imageSrc = bossImageRef[imageKey];

  if (imageSrc) {
    return <img className={classnames("boss-image-loader", className)} src={imageSrc} alt="" />;
  }
  return <span>not found</span>;
};

export default BossImageLoader;
