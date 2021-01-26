const { firebaseAdmin } = require("../../../configuration/firebase");
const { APIError } = require("../../../infrastructure/error");
const { firebaseAuth } = require("../../../infrastructure/firebase");

// Firebase token expire after 1h

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const firebaseAuthUser = await firebaseAuth().signInWithEmailAndPassword(email, password);
    const token = await firebaseAuthUser.user.getIdToken();
    return { success: true, token };
  } catch (error) {
    throw APIError("unauthorized");
  }
};

const loginAnonymously = async () => {
  try {
    const userCredential = await firebaseAuth().signInAnonymously();
    const token = await userCredential.user.getIdToken();
    return { success: true, token };
  } catch (error) {
    throw APIError("unauthorized", "Login failed");
  }
};

const loginFromToken = async (token) => {
  try {
    const user = await firebaseAdmin.auth().verifyIdToken(token);
    return user;
  } catch (error) {
    if (error.code === "auth/user-token-expired") {
      throw APIError("unauthorized", JSON.stringify(error.message, null, 2), "ERROR_TOKEN_REVOKED");
    } else if (typeof error.code === "string" && error.code.startsWith("auth/")) {
      throw APIError("unauthorized", JSON.stringify(error.message, null, 2));
    }
    throw APIError("internal_server_error");
  }
};

const upgradeAnonymousWithEmailAndPassword = async () => {};

const getCurrentUser = (user) => user;

const logout = async () => ({ success: true });

module.exports = {
  loginAnonymously, loginWithEmailAndPassword, loginFromToken, logout, upgradeAnonymousWithEmailAndPassword, getCurrentUser,
};
