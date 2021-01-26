const { body, matchedData } = require("express-validator");
const userService = require("../../service");

const allowedAuthMethod = ["anonymous", "email", "upgradeEmail"];

const validateEmailLogin = [
  body("email").if(body("authMethod")
    .custom((authMethod) => authMethod === "email" || authMethod === "upgradeEmail")).exists().isEmail(),
  body("password").if(body("authMethod")
    .custom((authMethod) => authMethod === "email" || authMethod === "upgradeEmail")).exists().isString(),
];

const validateLogin = [
  body("authMethod")
    .exists()
    .custom((authMethod) => allowedAuthMethod.includes(authMethod))
    .withMessage(`The field authMethod must be one of : '${allowedAuthMethod.join("', '")}'`),
  ...validateEmailLogin,
];

const handleLogin = async (req, res) => {
  const { authMethod, email, password } = matchedData(req, { locations: ["body"] });

  if (authMethod === "anonymous") {
    const result = await userService.loginAnonymously();
    res.send(result);
  }
  if (authMethod === "email") {
    const result = await userService.loginWithEmailAndPassword(email, password);
    res.send(result);
  }
};

module.exports = { validateLogin, handleLogin };
