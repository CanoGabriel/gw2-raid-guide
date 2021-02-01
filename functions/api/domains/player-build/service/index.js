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

const updatePlayerBuildById = async (id, playerBuildUpdate) => {
  const result = await playerBuildDataAccess.updatePlayerBuildById(id, playerBuildUpdate);
  if (result) {
    return { success: true, result };
  }
  throw APIError("not_found", `Unable to update the player-build entity ${id}`);
};

const getPlayerBuildById = async (id) => {
  const result = await playerBuildDataAccess.selectPlayerBuildById(id);
  if (result) return { success: true, result };
  throw APIError("not_found");
};

const deletePlayerBuildById = async (id) => {
  const result = await playerBuildDataAccess.deletePlayerBuildById(id);
  return { success: true, deleted: result.id };
};

const getAllPlayerBuild = async () => {
  const result = await playerBuildDataAccess.selectAllPlayerBuild();
  return { success: true, result };
};

module.exports = {
  createPlayerBuild, getPlayerBuildById, deletePlayerBuildById, updatePlayerBuildById, getAllPlayerBuild,
};
