const firebase = require("firebase/app");
const firebaseAdmin = require("firebase-admin");
const firebaseConfig = require("./firebase.config.json");

require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.auth().useEmulator("http://localhost:9099");

const serviceAccount = require("../../../gw2-raid-guide-firebase-adminsdk-lk8kr-91a9bec49a.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://gw2-raid-guide-default-rtdb.europe-west1.firebasedatabase.app",
});

module.exports = { firebase, firebaseAdmin };
