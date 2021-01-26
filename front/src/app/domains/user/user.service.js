import { http } from "../../configuration";

const loginWithEmailAndPassword = async (email, password) => http.post("/user/login", { authMethod: "email", email, password });

const loginAnonymously = async () => http.post("/user/login", { authMethod: "anonymous" });

const logout = async () => http.post("/user/logout");

const getCurrentUser = async () => http.get("/user/current");

export {
  getCurrentUser, loginAnonymously, loginWithEmailAndPassword, logout,
};
