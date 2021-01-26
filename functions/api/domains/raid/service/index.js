const raidDataAccess = require("../data-access");

const createRaid = async (raid) => raidDataAccess.createRaid(raid);

const getRaidList = async () => raidDataAccess.getAllRaid();

const getRaidById = async (raidId) => raidDataAccess.getRaidById(raidId);

const deleteRaidById = async (raidId) => raidDataAccess.deleteRaidById(raidId);

const updateRaid = async (raidId, raidUpdate) => raidDataAccess.updateRaid(raidId, raidUpdate);

const updateBoss = async (raidId, bossId, bossUpdate) => raidDataAccess.updateRaidBoss(raidId, bossId, bossUpdate);

const updateSection = async (raidId, sectionId, sectionUpdate) => raidDataAccess.updateRaidSection(raidId, sectionId, sectionUpdate);

const updateSectionLink = async (raidId, linkId, linkUpdate) => raidDataAccess.updateRaidSectionLink(raidId, linkId, linkUpdate);

const createBoss = async (raidId, bossInfo) => raidDataAccess.createRaidBoss(raidId, bossInfo);

const createSection = async (raidId, bossId, sectionInfo) => raidDataAccess.createRaidSection(raidId, bossId, sectionInfo);

const createSectionLink = async (raidId, sectionId, linkInfo) => raidDataAccess.createRaidLink(raidId, sectionId, linkInfo);

const deleteBossById = async (raidId, bossId) => raidDataAccess.deleteRaidBossById(raidId, bossId);

const deleteSectionById = async (raidId, sectionId) => raidDataAccess.deleteRaidSectionById(raidId, sectionId);

const deleteSectionLinkById = async (raidId, linkId) => raidDataAccess.deleteRaidLinkById(raidId, linkId);

module.exports = {
  getRaidList,
  createRaid,
  getRaidById,
  updateRaid,
  updateBoss,
  createBoss,
  updateSection,
  createSection,
  updateSectionLink,
  createSectionLink,
  deleteRaidById,
  deleteBossById,
  deleteSectionById,
  deleteSectionLinkById,
};
