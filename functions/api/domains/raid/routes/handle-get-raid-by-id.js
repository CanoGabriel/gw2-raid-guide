const raidService = require("../service");

const handleGetRaidById = async (req, res) => {
  const { id: raidId } = req.params;
  const raid = await raidService.getRaidById(raidId);
  res.send(raid);
};

module.exports = { handleGetRaidById };
