const userService = require("../../service");

const validateLogout = [];

const handleLogout = async (req, res) => {
  const result = await userService.logout(req.user);
  res.send(result);
};

module.exports = { handleLogout, validateLogout };
