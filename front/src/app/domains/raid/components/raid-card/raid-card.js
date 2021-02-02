import React from "react";
import classnames from "classnames";
import { ImageLoader } from "../../../image";
import "./raid-card.scss";

const RaidCard = (props) => {
  const { raid, className } = props;
  const generateBossItem = (bossDetail) => (
    <ImageLoader
      className="raid-card__boss-image"
      key={bossDetail?.image?.key}
      type={bossDetail?.image?.type}
      imageKey={bossDetail?.image?.key}
    />
  );

  return (
    <div className={classnames("raid-card", className)}>
      <span className="raid-card__name">{raid?.name}</span>
      <ul className="raid-card__list">
        {raid?.boss?.map(generateBossItem)}
      </ul>
    </div>
  );
};

export default RaidCard;
