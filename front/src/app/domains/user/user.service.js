import { http } from "../../configuration";

const loginWithEmailAndPassword = async (email, password) => http.post("/user/login", { authMethod: "email", email, password });

const loginAnonymously = async () => http.post("/user/login", { authMethod: "anonymous" });

const logout = async () => http.post("/user/logout");

const getCurrentUser = async () => http.get("/user/current");

const signupEmail = async (email, password) => http.post("/user/signup", { email, password });

export {
  getCurrentUser, loginAnonymously, loginWithEmailAndPassword, logout, signupEmail,
};
