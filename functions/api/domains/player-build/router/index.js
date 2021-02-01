const expressPromiseRouter = require("express-promise-router");
const { validationCatcher, checkAuth, checkNotAnonymous } = require("../../../infrastructure");
const { handleAddPlayerBuild, validateAddPlayerBuild } = require("./routes/handle-add-player-build");
const { handleGetPlayerBuildById, validateGetPlayerBuildById } = require("./routes/handle-get-player-build-by-id");
const { handleDeletePlayerBuildById, validateDeletePlayerBuildById } = require("./routes/handle-delete-player-build-by-id");
const { handleUpdatelayerBuildById, validateUpdatePlayerBuildById } = require("./routes/handle-update-player-build-by-id");
const { handleGetAllPlayerBuild, validateGetAllPlayerBuild } = require("./routes/handle-get-all-player-build");

const router = expressPromiseRouter();

router.get("/:id", checkAuth, validateGetPlayerBuildById, validationCatcher, handleGetPlayerBuildById);

router.delete("/:id", checkAuth, checkNotAnonymous, validateDeletePlayerBuildById, validationCatcher, handleDeletePlayerBuildById);

router.put("/:id", checkAuth, checkNotAnonymous, validateUpdatePlayerBuildById, validationCatcher, handleUpdatelayerBuildById);

router.post("/", checkAuth, checkNotAnonymous, validateAddPlayerBuild, validationCatcher, handleAddPlayerBuild);

router.get("/", checkAuth, validateGetAllPlayerBuild, validationCatcher, handleGetAllPlayerBuild);

// TODO Search player build (by class, role)

const injector = (app) => {
  app.use("/build", router);
};

module.exports = injector;
