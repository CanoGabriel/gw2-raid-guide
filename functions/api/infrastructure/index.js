const validationCatcher = require("./validation-catcher");
const { checkAuth, checkNotAnonymous } = require("./auth");
const { db, firebaseAuth } = require("./firebase");
const logger = require("./logger");
const error = require("./error");

module.exports = {
  validationCatcher, checkAuth, checkNotAnonymous, logger, error, db, firebaseAuth,
};
