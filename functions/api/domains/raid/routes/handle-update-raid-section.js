const raidService = require("../service");

const handleUpdateRaidSectionById = async (req, res) => {
  const { raidId, sectionId } = req.params;
  const result = await raidService.updateSection(raidId, sectionId, req.body);
  res.send(result);
};

module.exports = { handleUpdateRaidSectionById };
