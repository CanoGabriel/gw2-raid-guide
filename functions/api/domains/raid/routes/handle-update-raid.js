const raidService = require("../service");

const handleUpdateRaidById = async (req, res) => {
  const { id: raidId } = req.params;
  const raid = await raidService.updateRaid(raidId, req.body);
  res.send(raid);
};

module.exports = { handleUpdateRaidById };
