const { body, param, matchedData } = require("express-validator");
const playerBuildService = require("../../service");

const validateUpdatePlayerBuildById = [
  body("mainClass").isString().optional(),
  body("image").notEmpty().optional(),
  body("image.key").isString().optional(),
  body("image.type").isString().optional(),
  body("role").isString().optional(),
  body("buildLink").isString().optional(),
  body("rotationLink").isString().optional(),
  body("description").optional().notEmpty(),
  param("id").isString().exists(),
];

const handleUpdatelayerBuildById = async (req, res) => {
  const playerBuildUpdate = matchedData(req, { includeOptionals: true, locations: ["body"] });
  const { id } = matchedData(req, { includeOptionals: true, locations: ["params"] });
  const result = await playerBuildService.updatePlayerBuildById(id, playerBuildUpdate);
  res.send(result);
};

module.exports = { handleUpdatelayerBuildById, validateUpdatePlayerBuildById };
