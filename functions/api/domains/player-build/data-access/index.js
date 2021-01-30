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
module.exports = { createPlayerBuild, selectPlayerBuildById };
