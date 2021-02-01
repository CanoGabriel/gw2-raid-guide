const playerBuildService = require("../../service");

const validateGetAllPlayerBuild = [];

const handleGetAllPlayerBuild = async (req, res) => {
  const result = await playerBuildService.getAllPlayerBuild();
  res.send(result);
};

module.exports = { handleGetAllPlayerBuild, validateGetAllPlayerBuild };
