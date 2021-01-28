import React from "react";
import classnames from "classnames/dedupe";
import ImageListLoader from "../image-list-loader/image-list-loader";
import BossImageLoader from "../boss-image-loader/boss-image-loader";
import "./boss-image-list.scss";

const assetBossImage = require("../../assets/boss");

console.log(assetBossImage);
const images = Object.keys(assetBossImage).map((key) => ({ key }));

const BossImageList = (props) => {
  const { className } = props;

  const renderItem = (itemProps) => {
    const { key } = itemProps;
    return (
      <button type="button" onClick={() => console.log(key)}>
        {/* <img className="boss-image-list__image " src={uri} alt="" /> */}
        <BossImageLoader className="boss-image-list__image" imageKey={key} />
      </button>
    );
  };

  return (
    <ImageListLoader images={images} itemRender={renderItem} className={classnames("boss-image-list", className)} />
  );
};

export default BossImageList;
