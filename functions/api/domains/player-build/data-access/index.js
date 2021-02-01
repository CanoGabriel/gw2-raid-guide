const admin = require("firebase-admin");

const db = admin.firestore();

const createPlayerBuild = async (player) => {
  const createdPlayerBuild = await db.collection("/player-build").add(player);
  return { ...player, id: createdPlayerBuild.id };
};

const selectPlayerBuildById = async (id) => {
  const buildRef = await db.collection("player-build").doc(id).get();
  if (buildRef.exists) return { ...buildRef.data(), id: buildRef.id };
  return null;
};

const deletePlayerBuildById = async (id) => {
  await db.collection("player-build").doc(id).delete();
  return { id };
};

const updatePlayerBuildById = async (id, playerBuildUpdate = {}) => {
  const playerBuildRef = db.collection("player-build").doc(id);
  const playerToUpdate = await playerBuildRef.get();
  const update = {};
  if (playerBuildUpdate.mainClass) update.mainClass = playerBuildUpdate.mainClass;
  if (playerBuildUpdate.image && playerBuildUpdate.image.key) update["image.key"] = playerBuildUpdate.image.key;
  if (playerBuildUpdate.image && playerBuildUpdate.image.type) update["image.type"] = playerBuildUpdate.image.type;
  if (playerBuildUpdate.role) update.role = playerBuildUpdate.role;
  if (playerBuildUpdate.buildLink) update.buildLink = playerBuildUpdate.buildLink;
  if (playerBuildUpdate.rotationLink) update.rotationLink = playerBuildUpdate.rotationLink;
  if (playerBuildUpdate.description) update.description = playerBuildUpdate.description;

  const isFieldToUpdate = Object.keys(update).length > 0;

  if (playerToUpdate.exists && isFieldToUpdate) return playerBuildRef.update(update);
  if (playerToUpdate.exists && !isFieldToUpdate) return {};
  return null;
};

const selectAllPlayerBuild = async () => {
  const raidRef = await db.collection("player-build").get();
  const result = raidRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return result;
};
module.exports = {
  createPlayerBuild, selectPlayerBuildById, deletePlayerBuildById, updatePlayerBuildById, selectAllPlayerBuild,
};
