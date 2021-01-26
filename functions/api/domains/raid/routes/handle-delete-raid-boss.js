const raidService = require("../service");

const handleDeleteRaidBoss = async (req, res) => {
  const { raidId, bossId } = req.params;
  const result = await raidService.deleteBossById(raidId, bossId);
  res.send(result);
};

module.exports = { handleDeleteRaidBoss };
