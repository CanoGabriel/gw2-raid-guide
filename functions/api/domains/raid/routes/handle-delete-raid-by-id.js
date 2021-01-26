const raidService = require("../service");

const handleDeleteRaidById = async (req, res) => {
  const { id: raidId } = req.params;
  const raid = await raidService.deleteRaidById(raidId);
  res.send(raid);
};

module.exports = { handleDeleteRaidById };
