const expressPromiseRouter = require("express-promise-router");
const { validationCatcher, checkAuth } = require("../../../infrastructure");
const { handleLogin, validateLogin } = require("./routes/handle-login");
const { handleLogout, validateLogout } = require("./routes/handle-logout");
const { validateGetCurrentUser, handleGetCurrentUser } = require("./routes/handle-get-current-user");
const { validateSignup, handleSignup } = require("./routes/handle-signup");

const router = expressPromiseRouter();

router.post("/signup", validateSignup, validationCatcher, handleSignup);
router.post("/login", validateLogin, validationCatcher, handleLogin);
router.post("/logout", checkAuth, validateLogout, validationCatcher, handleLogout);
router.get("/current", checkAuth, validateGetCurrentUser, validationCatcher, handleGetCurrentUser);

const expressRouteInjector = (app) => {
  app.use("/user", router);
};

module.exports = expressRouteInjector;
