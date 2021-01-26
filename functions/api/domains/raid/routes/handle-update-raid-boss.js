const raidService = require("../service");

const handleUpdateRaidBossById = async (req, res) => {
  const { raidId, bossId } = req.params;
  const result = await raidService.updateBoss(raidId, bossId, req.body);
  res.send(result);
};

module.exports = { handleUpdateRaidBossById };
