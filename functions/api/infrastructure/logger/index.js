const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
