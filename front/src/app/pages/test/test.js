import React from "react";
import BossImageList from "../../domains/image/components/boss-image-list/boss-image-list";
import BuildBaseIconList from "../../domains/image/components/build-icon-base-list/build-icon-base-list";
import BuildHOTIconList from "../../domains/image/components/build-icon-hot-list/build-icon-hot-list";
import BuildPOFIconList from "../../domains/image/components/build-icon-pof-list/build-icon-pof-list";

const Test = () => {
  const l = "This is a test page";
  return (
    <main>
      <span>{l}</span>
      <BossImageList />
      <BuildBaseIconList />
      <BuildHOTIconList />
      <BuildPOFIconList />
    </main>
  );
};

export default Test;
