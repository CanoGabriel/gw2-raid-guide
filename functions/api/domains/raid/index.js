const router = require("express-promise-router")();
const { checkAuth, checkNotAnonymous } = require("../../infrastructure/auth");
const { validationCatcher } = require("../../infrastructure");
const { handleGetRaid } = require("./routes/handle-get-raid");
const { handleDeleteRaidById } = require("./routes/handle-delete-raid-by-id");
const { handleCreateRaid, validateCreateRaid } = require("./routes/handle-create-raid");
const { handleGetRaidById } = require("./routes/handle-get-raid-by-id");
const { handleUpdateRaidById } = require("./routes/handle-update-raid");
const { handleUpdateRaidBossById } = require("./routes/handle-update-raid-boss");
const { handleUpdateRaidSectionById } = require("./routes/handle-update-raid-section");
const { handleUpdateRaidLinkById } = require("./routes/handle-update-raid-link");
const { handleCreateRaidBoss } = require("./routes/handle-create-raid-boss");
const { handleCreateRaidSection } = require("./routes/handle-create-raid-section");
const { handleCreateRaidLink } = require("./routes/handle-create-raid-link");
const { handleDeleteRaidBoss } = require("./routes/handle-delete-raid-boss");
const { handleDeleteRaidSection } = require("./routes/handle-delete-raid-section");
const { handleDeleteRaidLink } = require("./routes/handle-delete-raid-link");

router.get("/", handleGetRaid);

router.get("/:id", handleGetRaidById);
router.put("/:id", checkNotAnonymous, handleUpdateRaidById);
router.delete("/:id", checkNotAnonymous, handleDeleteRaidById);

router.put("/:raidId/boss/:bossId", checkNotAnonymous, handleUpdateRaidBossById);
router.delete("/:raidId/boss/:bossId", checkNotAnonymous, handleDeleteRaidBoss);
router.post("/:raidId/boss", checkNotAnonymous, handleCreateRaidBoss);

router.put("/:raidId/section/:sectionId", checkNotAnonymous, handleUpdateRaidSectionById);
router.delete("/:raidId/section/:sectionId", checkNotAnonymous, handleDeleteRaidSection);
router.post("/:raidId/section", checkNotAnonymous, handleCreateRaidSection);

router.put("/:raidId/link/:linkId", checkNotAnonymous, handleUpdateRaidLinkById);
router.delete("/:raidId/link/:linkId", checkNotAnonymous, handleDeleteRaidLink);
router.post("/:raidId/link", checkNotAnonymous, handleCreateRaidLink);

router.post("/", checkNotAnonymous, validateCreateRaid, validationCatcher, handleCreateRaid);

const injector = (app) => {
  app.use("/raid", checkAuth, router);
};

module.exports = injector;
