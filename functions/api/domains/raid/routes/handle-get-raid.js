const raidService = require("../service");

const handleGetRaid = async (req, res) => {
  const raid = await raidService.getRaidList();
  res.send(raid);
};

module.exports = { handleGetRaid };
