const admin = require("firebase-admin");

const db = admin.firestore();

const createRaid = async (raid) => {
  const {
    name = "", backgroundColor, color, boss = [],
  } = raid;
  // Create raid instance
  const createdRaid = await db.collection("raid").add({
    name, backgroundColor, color,
  });

  // Create subcollection ref boss, section, section-link
  const bossCollection = createdRaid.collection("boss");
  const sectionCollection = createdRaid.collection("section");
  const linkCollection = createdRaid.collection("section-link");

  // Add boss data
  const bossIds = await Promise.all(boss.map(async (bossInfo) => {
    const {
      name: bossName, health, armor, breakBar, addBreakBar, hitboxSize, timer, image,
    } = bossInfo;
    const bossRef = await bossCollection.add({
      name: bossName, health, armor, breakBar, addBreakBar, hitboxSize, timer, image,
    });
    return bossRef.id;
  }));

  // Add boss's section and link
  await Promise.all(boss.map(async (bossInfo = {}, bossIndex) => {
    const { section: sectionList = [] } = bossInfo;
    await Promise.all(sectionList.map(async (sectionInfo = {}) => {
      const { title = "", links = [] } = sectionInfo;
      const sectionRef = await sectionCollection.add({ title, boss: bossIds[bossIndex] });

      await Promise.all(links.map(async (linkInfo) => {
        const { target, label } = linkInfo;
        await linkCollection.add({ target, label, section: sectionRef.id });
      }));
    }));
  }));

  return { sucess: true, createdRaidId: createdRaid.id };
};

const getRaidById = async (raidId) => {
  const raidRef = db.collection("raid").doc(raidId);
  const bossRef = await raidRef.collection("boss").get();
  const sectionRef = await raidRef.collection("section").get();
  const sectionLinkRef = await raidRef.collection("section-link").get();

  const boss = bossRef.docs.map((bossInfo) => ({ ...bossInfo.data(), id: bossInfo.id }));
  const section = sectionRef.docs.map((sectionInfo) => ({ ...sectionInfo.data(), id: sectionInfo.id }));
  const sectionLink = sectionLinkRef.docs.map((linkInfo) => ({ ...linkInfo.data(), id: linkInfo.id }));

  const raid = await raidRef.get();
  const result = {
    ...raid.data(), boss, section, sectionLink,
  };
  return { sucess: true, result };
};

const getAllRaid = async () => {
  const raidRef = await db.collection("raid").get();
  const result = raidRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return { success: true, result };
};

const updateRaid = async (raidId, updateRaidInfo) => {
  const raidRef = db.collection("raid").doc(raidId);
  await raidRef.update(updateRaidInfo);
};

const updateRaidBoss = async (raidId, bossId, updateBoss) => {
  const bossRef = db.collection("raid").doc(raidId).collection("boss").doc(bossId);
  await bossRef.update(updateBoss);
};

const updateRaidSection = async (raidId, sectionId, updateSection) => {
  const bossRef = db.collection("raid").doc(raidId).collection("section").doc(sectionId);
  const { title } = updateSection;
  await bossRef.update({ title });
};
const updateRaidSectionLink = async (raidId, linkId, updateSectionLink) => {
  const bossRef = db.collection("raid").doc(raidId).collection("section-link").doc(linkId);
  await bossRef.update(updateSectionLink);
};

const createRaidBoss = async (raidId, bossInfo = {}) => {
  const bossCollection = db.collection("raid").doc(raidId).collection("boss");
  const {
    name, health, armor, breakBar, addBreakBar, hitboxSize, timer, image,
  } = bossInfo;
  await bossCollection.add({
    name, health, armor, breakBar, addBreakBar, hitboxSize, timer, image,
  });
};

const createRaidSection = async (raidId, bossId, sectionInfo = {}) => {
  const sectionCollection = db.collection("raid").doc(raidId).collection("section");
  const { title } = sectionInfo;
  await sectionCollection.add({ title, boss: bossId });
};

const createRaidLink = async (raidId, sectionId, linkInfo = {}) => {
  const linkCollection = db.collection("raid").doc(raidId).collection("section-link");
  const { target, label } = linkInfo;
  await linkCollection.add({ target, label, section: sectionId });
};

const deleteRaidById = async (raidId) => {
  const raidRef = db.collection("raid").doc(raidId);
  const batch = db.batch();
  const bossRef = await raidRef.collection("boss").get();
  const sectionRef = await raidRef.collection("section").get();
  const linkRef = await raidRef.collection("section-link").get();

  bossRef.docs.forEach((doc) => batch.delete(doc.ref));
  sectionRef.docs.forEach((doc) => batch.delete(doc.ref));
  linkRef.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  await db.collection("raid").doc(raidId).delete();
};

const deleteRaidSectionById = async (raidId, sectionId) => {
  const sectionRef = db.collection("raid").doc(raidId).collection("section").doc(sectionId);
  const linkColRef = await db.collection("raid").doc(raidId)
    .collection("section").where("section", "==", sectionId)
    .get();

  const batch = db.batch();
  linkColRef.docs.forEach((doc) => batch.delete(doc.ref));
  batch.delete(sectionRef);
  await batch.commit();
};

const deleteRaidBossById = async (raidId, bossId) => {
  const sectionColRef = await db.collection("raid").doc(raidId).collection("section").where("boss", "=", bossId)
    .get();
  // Delete boss section
  await Promise.all(sectionColRef.docs.map(async (doc) => deleteRaidSectionById(raidId, doc.id)));
  await db.collection(`/raid/${raidId}/boss`).doc(bossId).delete();
};

const deleteRaidLinkById = async (raidId, linkId) => {
  await db.collection("raid").doc(raidId).collection("section-link").doc(linkId)
    .delete();
};

module.exports = {
  createRaid,
  getRaidById,
  getAllRaid,
  updateRaid,
  updateRaidBoss,
  updateRaidSection,
  updateRaidSectionLink,
  createRaidBoss,
  createRaidSection,
  createRaidLink,
  deleteRaidById,
  deleteRaidSectionById,
  deleteRaidBossById,
  deleteRaidLinkById,
};
