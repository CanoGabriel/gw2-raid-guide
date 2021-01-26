const router = require("express-promise-router")();
const { checkAuth } = require("../../infrastructure/auth");
const { handleGetRaid } = require("./routes/handle-get-raid");
const { handleDeleteRaidById } = require("./routes/handle-delete-raid-by-id");
const { handleCreateRaid } = require("./routes/handle-create-raid");
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
router.put("/:id", handleUpdateRaidById);
router.delete("/:id", handleDeleteRaidById);

router.put("/:raidId/boss/:bossId", handleUpdateRaidBossById);
router.delete("/:raidId/boss/:bossId", handleDeleteRaidBoss);
router.post("/:raidId/boss", handleCreateRaidBoss);

router.put("/:raidId/section/:sectionId", handleUpdateRaidSectionById);
router.delete("/:raidId/section/:sectionId", handleDeleteRaidSection);
router.post("/:raidId/section", handleCreateRaidSection);

router.put("/:raidId/link/:linkId", handleUpdateRaidLinkById);
router.delete("/:raidId/link/:linkId", handleDeleteRaidLink);
router.post("/:raidId/link", handleCreateRaidLink);

router.post("/", handleCreateRaid);

const injector = (app) => {
  app.use("/raid", checkAuth, router);
};

module.exports = injector;
