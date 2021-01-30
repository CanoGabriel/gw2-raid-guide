const playerBuildDataAccess = require("../data-access");

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

module.exports = { createPlayerBuild };
