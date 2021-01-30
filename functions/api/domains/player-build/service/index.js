const playerBuildDataAccess = require("../data-access");
const { APIError } = require("../../../infrastructure/error");

const createPlayerBuild = async (player) => {
  const {
    mainClass, image, role, buildLink = false, rotationLink = false, description = false,
  } = player;
  const result = await playerBuildDataAccess.createPlayerBuild({
    mainClass,
    image,
    role,
    buildLink,
    rotationLink,
    description,
  });
  return { success: true, result };
};

const getPlayerBuildById = async (id) => {
  const result = await playerBuildDataAccess.selectPlayerBuildById(id);
  if (result) return { success: true, result };
  throw APIError("not_found");
};

module.exports = { createPlayerBuild, getPlayerBuildById };
