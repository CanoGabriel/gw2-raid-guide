const { body, matchedData } = require("express-validator");
const userService = require("../../service");

const validateSignup = [
  body("email").exists().isEmail(),
  body("password").exists().isString(),
];

const handleSignup = async (req, res) => {
  const { email, password } = matchedData(req, { locations: ["body"] });
  const result = await userService.signupEmailPassword(email, password);
  res.send(result);
};

module.exports = { validateSignup, handleSignup };
