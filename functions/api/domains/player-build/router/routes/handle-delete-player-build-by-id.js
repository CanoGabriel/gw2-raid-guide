const { param, matchedData } = require("express-validator");
const playerBuildService = require("../../service");

const validateDeletePlayerBuildById = [
  param("id").isString().exists(),
];

const handleDeletePlayerBuildById = async (req, res) => {
  const { id } = matchedData(req, { locations: ["params"] });
  const result = await playerBuildService.getPlayerBuildById(id);
  res.send(result);
};

module.exports = { handleDeletePlayerBuildById, validateDeletePlayerBuildById };
