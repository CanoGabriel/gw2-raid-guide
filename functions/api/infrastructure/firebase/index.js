const { firebase } = require("../../configuration");

const db = firebase.firestore();
const firebaseAuth = firebase.auth;

module.exports = { db, firebaseAuth };
