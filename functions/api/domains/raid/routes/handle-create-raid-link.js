const raidService = require("../service");

const handleCreateRaidLink = async (req, res) => {
  const { raidId } = req.params;
  const { sectionId, label = "", target = "" } = req.body;
  const result = await raidService.createSectionLink(raidId, sectionId, { label, target });
  res.send(result);
};

module.exports = { handleCreateRaidLink };
