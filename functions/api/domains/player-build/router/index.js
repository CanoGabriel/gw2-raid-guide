const exporessPromiseRouter = require("express-promise-router");
const { validationCatcher, checkAuth, checkNotAnonymous } = require("../../../infrastructure");
const { handleAddPlayerBuild, validateAddPlayerBuild } = require("./routes/handle-add-player-build");
const { handleGetPlayerBuildById, validateGetPlayerBuildById } = require("./routes/handle-get-player-build-by-id");
const { handleDeletePlayerBuildById, validateDeletePlayerBuildById } = require("./routes/handle-delete-player-build-by-id");
const { handleUpdatelayerBuildById, validateUpdatePlayerBuildById } = require("./routes/handle-update-player-build-by-id");

const router = exporessPromiseRouter();

router.post("/", checkAuth, checkNotAnonymous, validateAddPlayerBuild, validationCatcher, handleAddPlayerBuild);
router.get("/:id", checkAuth, validateGetPlayerBuildById, validationCatcher, handleGetPlayerBuildById);
router.delete("/:id", checkAuth, checkNotAnonymous, validateDeletePlayerBuildById, validationCatcher, handleDeletePlayerBuildById);
// TODO Search player build (by class, role)
router.put("/:id", checkAuth, checkNotAnonymous, validateUpdatePlayerBuildById, validationCatcher, handleUpdatelayerBuildById);

const injector = (app) => {
  app.use("/build", router);
};

module.exports = injector;
