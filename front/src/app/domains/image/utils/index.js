import {
  bossImages, buildBaseIcons, buildHOTIcons, buildPOFIcons,
} from "../assets";

const imageTypeList = ["boss", "buildBase", "buildHOT", "buildPOF"];
const bossImageKeys = Object.keys(bossImages);
const buildBaseIconKeys = Object.keys(buildBaseIcons);
const buildHOTIconKeys = Object.keys(buildHOTIcons);
const buildPOFIconKeys = Object.keys(buildPOFIcons);

const getImageKeyList = (type) => {
  if (type === "boss") return bossImageKeys;
  if (type === "buildBase") return buildBaseIconKeys;
  if (type === "buildHOT") return buildHOTIconKeys;
  if (type === "buildPOF") return buildPOFIconKeys;
  return [];
};

export { getImageKeyList, imageTypeList };
