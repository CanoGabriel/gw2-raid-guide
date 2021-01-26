const { v4: uuid } = require("uuid");
const logger = require("../logger");
const { httpMessageMap, errorCodeMap } = require("../../configuration").error;
const APIError = require("./api-error");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Generate an unique correlation id
  const id = uuid();
  // If the error is an instance of APIError
  if (err.name === APIError.name) {
    // Retrieve errorCode information from config
    const errorCode = errorCodeMap[err.code] ? err.code : "UNKNOWN";
    if (!errorCodeMap[err.code]) {
      logger.warn(`Unknown error code "${err.code}", default set to "UNKNOWN"`);
    }

    const errorInfo = errorCodeMap[errorCode];

    // Retrieve defined http code and associate message from config
    const httpCode = httpMessageMap[`${errorInfo.httpCode}`] ? errorInfo.httpCode : 500;
    if (!httpMessageMap[`${errorInfo.httpCode}`]) {
      logger.warn(`Unknown Http code "${errorInfo.httpCode}", default set to 500`);
    }

    // Log the error
    logger.error(`[${id}] - ${errorCode} : ${errorInfo.logMessage}`);
    if (err.message) {
      logger.error(`[${id}] - Extra information:  ${err.message}`);
    }
    logger.error(`[${id}]\n ${err.stack}`);

    // Send response
    res.status(httpCode);

    const result = { uid: id, message: httpMessageMap[`${httpCode}`] };
    if (err.frontErrorId) {
      result.error = err.frontErrorId;
    }

    res.send(result);
  } else {
    logger.error(`[${id}] - ${err.stack}`);
    const { httpCode } = errorCodeMap.UNKNOWN;
    res.status(httpCode).send({ uid: id, message: httpMessageMap[`${httpCode}`] });
  }
};

module.exports = errorHandler;
