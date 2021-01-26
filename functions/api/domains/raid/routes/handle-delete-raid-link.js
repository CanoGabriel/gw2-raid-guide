const raidService = require("../service");

const handleDeleteRaidLink = async (req, res) => {
  const { raidId, linkId } = req.params;
  const result = await raidService.deleteSectionLinkById(raidId, linkId);
  res.send(result);
};

module.exports = { handleDeleteRaidLink };
