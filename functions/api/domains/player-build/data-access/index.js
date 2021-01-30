const admin = require("firebase-admin");

const db = admin.firestore();

const createPlayerBuild = async (player) => {
  const createdPlayerBuild = await db.collection("/player-build").add(player);
  return { ...player, id: createdPlayerBuild.id };
};

module.exports = { createPlayerBuild };
