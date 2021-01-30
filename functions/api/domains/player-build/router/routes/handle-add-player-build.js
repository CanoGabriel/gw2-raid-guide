const { body, matchedData } = require("express-validator");
const playerBuildService = require("../../service");

const validateAddPlyerBuild = [
  body("mainClass").isString().exists(),
  body("image").notEmpty().exists(),
  body("image.key").isString().exists(),
  body("image.type").isString().exists(),
  body("role").isString().exists(),
  body("buildLink").isString().optional(),
  body("rotationLink").isString().optional(),
  body("description").exists().notEmpty(),
];

const handleAddPlayerBuild = async (req, res) => {
  const player = matchedData(req, { includeOptionals: true, locations: ["body"] });
  const result = await playerBuildService.createPlayerBuild(player);
  res.send(result);
};

module.exports = { handleAddPlayerBuild, validateAddPlyerBuild };
