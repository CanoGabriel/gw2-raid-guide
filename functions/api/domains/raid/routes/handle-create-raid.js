const { body, matchedData } = require("express-validator");
const raidService = require("../service");

const validateCreateRaid = [
  body("name").isString().exists(),
  body("color").isString().exists(),
  body("backgroundColor").isString().exists(),
  body("boss").isArray().optional(),
  body("boss.*.name").if(body("boss").exists()).isString().exists(),
  body("boss.*.image").if(body("boss").exists()).not().isEmpty(),
  body("boss.*.image.key").if(body("boss").exists()).isString().exists(),
  body("boss.*.image.type").if(body("boss").exists()).isString().exists(),
  body("boss.*.health").if(body("boss").exists()).isInt().exists(),
  body("boss.*.armor").if(body("boss").exists()).isInt().exists(),
  body("boss.*.breakBar").if(body("boss").exists()).isInt().exists(),
  body("boss.*.addBreakBar").if(body("boss").exists()).isInt().exists(),
  body("boss.*.hitboxSize").if(body("boss").exists()).isInt().exists(),
  body("boss.*.timer").if(body("boss").exists()).isInt().exists(),
  body("boss.*.section").if(body("boss").exists()).isArray().optional(),
  body("boss.*.section.*.title").if(body("boss.*.section").exists()).isString().exists(),
  body("boss.*.section.*.links").if(body("boss.*.section").exists()).isArray().optional(),
  body("boss.*.section.*.links.*.target").if(body("boss.*.section.*.links").exists()).isString().exists(),
  body("boss.*.section.*.links.*.label").if(body("boss.*.section.*.links").exists()).isString().exists(),
];

const handleCreateRaid = async (req, res) => {
  const {
    name, boss = [], color, backgroundColor, image,
  } = matchedData(req, { includeOptionals: true, locations: ["body"] });

  const raid = await raidService.createRaid({
    name, boss, color, backgroundColor, image,
  });
  res.send(raid);
};

module.exports = { handleCreateRaid, validateCreateRaid };
