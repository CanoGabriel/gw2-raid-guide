const { param, matchedData } = require("express-validator");
const playerBuildService = require("../../service");

const validateGetPlayerBuildById = [
  param("id").isString().exists(),
];

const handleGetPlayerBuildById = async (req, res) => {
  const { id } = matchedData(req, { locations: ["body"] });
  const result = await playerBuildService.getPlayerBuildById(id);
  res.send(result);
};

module.exports = { handleGetPlayerBuildById, validateGetPlayerBuildById };
