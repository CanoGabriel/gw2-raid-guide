const exporessPromiseRouter = require("express-promise-router");
const { validationCatcher, checkAuth, checkNotAnonymous } = require("../../../infrastructure");
const { handleAddPlayerBuild, validateAddPlyerBuild } = require("./routes/handle-add-player-build");

const router = exporessPromiseRouter();

// TODO Create playerBuild
router.post("/", checkAuth, checkNotAnonymous, validateAddPlyerBuild, validationCatcher, handleAddPlayerBuild);
// TODO Update player build
// TODO Read one player build
// TODO Search player build (by class, role)

const injector = (app) => {
  app.use("/build", router);
};

module.exports = injector;
