const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { logger, error } = require("./infrastructure");

const app = express();

app.use(morgan("combined", { stream: logger.stream }));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./domains/global-router-injector")(app);

app.get("/status", (req, res) => {
  res.send({
    status: "Online",
    version: process.env.npm_package_version,
  });
});

app.use(error.errorHandler);

module.exports = app;
