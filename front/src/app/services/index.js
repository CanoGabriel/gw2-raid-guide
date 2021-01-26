import { http } from "../configuration";

const fetchAllRaid = async () => http.get("/raid");

const createRaid = async (info) => http.post("/raid", info);
const updateRaidInfo = async (id, info) => http.put(`/raid/${id}`, info);
const fetchRaidById = async (id) => http.get(`/raid/${id}`);
const deleteRaidById = async (raidId) => http.delete(`/raid/${raidId}`);

const createBoss = async (raidId, info) => http.post(`/raid/${raidId}/boss`, info);
const updateBossInfo = async (raidId, bossId, info) => http.put(`/raid/${raidId}/boss/${bossId}`, info);
const deleteRaidBossById = async (raidId, bossId) => http.delete(`/raid/${raidId}/boss/${bossId}`);

const createSection = async (raidId, info) => http.post(`/raid/${raidId}/section`, info);
const updateSectionInfo = async (raidId, sectionId, info) => http.put(`/raid/${raidId}/section/${sectionId}`, info);
const deleteRaidSectionById = async (raidId, sectionId) => http.delete(`/raid/${raidId}/section/${sectionId}`);

const createLink = async (raidId, info) => http.post(`/raid/${raidId}/link`, info);
const updateLinkInfo = async (raidId, linkId, info) => http.put(`/raid/${raidId}/link/${linkId}`, info);
const deleteRaidLinkById = async (raidId, linkId) => http.delete(`/raid/${raidId}/link/${linkId}`);

export {
  fetchAllRaid,
  createRaid,
  updateRaidInfo,
  fetchRaidById,
  deleteRaidById,
  createBoss,
  updateBossInfo,
  deleteRaidBossById,
  createSection,
  updateSectionInfo,
  deleteRaidSectionById,
  createLink,
  updateLinkInfo,
  deleteRaidLinkById,
};
