const exporessPromiseRouter = require("express-promise-router");
const { validationCatcher, checkAuth, checkNotAnonymous } = require("../../../infrastructure");
const { handleAddPlayerBuild, validateAddPlayerBuild } = require("./routes/handle-add-player-build");
const { handleGetPlayerBuildById, validateGetPlayerBuildById } = require("./routes/handle-get-player-build-by-id");

const router = exporessPromiseRouter();

router.post("/", checkAuth, checkNotAnonymous, validateAddPlayerBuild, validationCatcher, handleAddPlayerBuild);
// TODO Update player build
// TODO Read one player build
router.get("/:id", checkAuth, validateGetPlayerBuildById, validationCatcher, handleGetPlayerBuildById);
// TODO Search player build (by class, role)

const injector = (app) => {
  app.use("/build", router);
};

module.exports = injector;
