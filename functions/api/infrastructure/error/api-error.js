/**
 * Create an Error
 * @param {string} code The code of the error (see [the config file]{@link /app/config/error/error-code-map.js}
 * @param {string} [message=""] Additionnal information relative to the error
 */
function APIError(code, message, frontErrorId = "") {
  Error.call(this, message);
  this.message = message;
  this.name = "APIError";
  this.code = code;
  this.frontErrorId = frontErrorId;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this);
  }

  return this;
}

module.exports = APIError;
