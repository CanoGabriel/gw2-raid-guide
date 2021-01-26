const raidService = require("../service");

const handleCreateRaid = async (req, res) => {
  const {
    name = "", boss, color = "", backgroundColor = "", imageURL = "",
  } = req.body;

  const raid = await raidService.createRaid({
    name, boss, imageURL, color, backgroundColor,
  });
  res.send(raid);
};

module.exports = { handleCreateRaid };
