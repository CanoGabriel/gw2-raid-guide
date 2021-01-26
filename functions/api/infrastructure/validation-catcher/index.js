const { validationResult } = require("express-validator");
const { APIError } = require("../error");

const validationCatcher = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw APIError("bad_request", JSON.stringify(errors.array()));
  } else {
    next();
  }
};

module.exports = validationCatcher;
