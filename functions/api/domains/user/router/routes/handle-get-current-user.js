const userService = require("../../service");

const validateGetCurrentUser = [];

const handleGetCurrentUser = async (req, res) => {
  const result = await userService.getCurrentUser(req.user);
  res.send(result);
};

module.exports = { handleGetCurrentUser, validateGetCurrentUser };
