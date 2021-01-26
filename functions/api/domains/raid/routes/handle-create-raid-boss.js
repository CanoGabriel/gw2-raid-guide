const raidService = require("../service");

const handleCreateRaidBoss = async (req, res) => {
  const { raidId } = req.params;
  const result = await raidService.createBoss(raidId, req.body);
  res.send(result);
};

module.exports = { handleCreateRaidBoss };
