const raidService = require("../service");

const handleCreateRaidSection = async (req, res) => {
  const { raidId } = req.params;
  const { bossId, title } = req.body;
  const result = await raidService.createSection(raidId, bossId, { title });
  res.send(result);
};

module.exports = { handleCreateRaidSection };
