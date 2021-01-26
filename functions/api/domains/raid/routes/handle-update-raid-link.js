const raidService = require("../service");

const handleUpdateRaidLinkById = async (req, res) => {
  const { raidId, linkId } = req.params;
  const result = await raidService.updateSectionLink(raidId, linkId, req.body);
  res.send(result);
};

module.exports = { handleUpdateRaidLinkById };
