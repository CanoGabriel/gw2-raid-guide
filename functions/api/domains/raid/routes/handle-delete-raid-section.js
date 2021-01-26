const raidService = require("../service");

const handleDeleteRaidSection = async (req, res) => {
  const { raidId, sectionId } = req.params;
  const result = await raidService.deleteSectionById(raidId, sectionId);
  res.send(result);
};

module.exports = { handleDeleteRaidSection };
