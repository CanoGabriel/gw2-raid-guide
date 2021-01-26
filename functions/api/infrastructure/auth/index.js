const { loginFromToken } = require("../../domains/user/service");
const { APIError } = require("../error");
// const logger = require("../logger");

const extractBearerToken = (req) => {
  const { authorization } = req.headers;
  if (authorization) {
    return authorization.split(" ")[1];
  }
  return false;
};

const checkAuth = async (req, _res, next) => {
  const token = extractBearerToken(req);
  if (token) {
    try {
      const user = await loginFromToken(token);
      req.user = user;
      if (user.provider_id === "anonymous") {
        next();
      // } else if (user.email && user.email_verified) {
      } else if (user.email) {
        next();
      } else if (user.email && !user.email_verified) {
        next(APIError("unauthorized", `Email ${user.email} not verified`, "EMAIL_NOT_VERIFIED"));
      } else {
        next(APIError("internal_server_error", "Unexpected auth error"));
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(APIError("unauthorized"));
  }
};

const checkNotAnonymous = async (req, res, next) => {
  const { firebase = {} } = req.user;
  if (firebase.sign_in_provider !== "anonymous") {
    next();
  } else {
    next(APIError("forbidden"));
  }
};

module.exports = { checkAuth, checkNotAnonymous };
